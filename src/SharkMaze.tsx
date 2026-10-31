import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, RotateCcw, X } from 'lucide-react'
type Props={lang:'en'|'zh';onClose:()=>void;onStart:()=>void;onWin:()=>void;onCollect:(item:number)=>void;owned:number[]}
type Point={r:number;c:number}
const MAP=[
'###########',
'#...#.....#',
'#.#.#.###.#',
'#.#.......#',
'#.###.###.#',
'#.....#...#',
'###.#.#.#.#',
'#...#.....#',
'###########'
]
const START={r:1,c:1}, SHARK={r:7,c:9}, TREASURES=[{r:1,c:9},{r:3,c:5},{r:7,c:1}]
const ITEMS=[{icon:'🤿',en:'Dive mask',zh:'潛水鏡',style:'diver'},{icon:'🥊',en:'Boxing gloves',zh:'拳套',style:'boxer'},{icon:'🥾',en:'Explorer shoes',zh:'探險鞋',style:'explorer'}]
const same=(a:Point,b:Point)=>a.r===b.r&&a.c===b.c
const dirs=[[-1,0],[1,0],[0,-1],[0,1]]
function approach(from:Point,to:Point):Point{
 const visited=new Set([`${from.r},${from.c}`]);const queue:[Point,Point[]][]=[[from,[]]]
 while(queue.length){const [p,path]=queue.shift()!;if(same(p,to))return path[0]||from
 for(const [dr,dc] of dirs){const r=p.r+dr,c=p.c+dc,k=`${r},${c}`
 if(MAP[r]?.[c]!=='.'||visited.has(k))continue
 visited.add(k);queue.push([{r,c},[...path,{r,c}]])}}
 return from
}
function YunSprite({outfit}:{outfit:number|null}){return <span className={'pixel-avatar maze-yun '+(outfit===null?'':`outfit-${ITEMS[outfit].style}`)} role="img" aria-label="Yun"><span className="hair"/><span className="face"/><span className="eyes"/><span className="shirt"/><span className="legs"/><span className="accessory"/></span>}
export default function SharkMaze({lang,onClose,onStart,onWin,onCollect,owned}:Props){
 const zh=lang==='zh'
 const [state,setState]=useState<'ready'|'running'|'won'|'lost'>('ready')
 const [player,setPlayer]=useState<Point>(START)
 const [shark,setShark]=useState<Point>(SHARK)
 const [collected,setCollected]=useState<number[]>([])
 const [outfit,setOutfit]=useState<number|null>(null)
 const [hearts,setHearts]=useState(3)
 const steps=useRef(0),latest=useRef({state,player,shark,collected,hearts})
 const callbacks=useRef({onStart,onWin,onCollect});callbacks.current={onStart,onWin,onCollect}
 latest.current={state,player,shark,collected,hearts}
 const start=()=>{steps.current=0;setPlayer(START);setShark(SHARK);setCollected([]);setOutfit(null);setHearts(3);setState('running');callbacks.current.onStart()}
 const move=useCallback((dr:number,dc:number)=>{
   const v=latest.current;if(v.state!=='running')return
   const next={r:v.player.r+dr,c:v.player.c+dc}
   if(MAP[next.r]?.[next.c]!=='.')return
   steps.current++
   const nextCollected=TREASURES.reduce<number[]>((arr,t,i)=>same(t,next)&&!v.collected.includes(i)?[...arr,i]:arr,[...v.collected])
   setCollected(nextCollected)
   const picked=TREASURES.findIndex((t,i)=>same(t,next)&&!v.collected.includes(i))
   if(picked>=0){setOutfit(picked);callbacks.current.onCollect(picked)}
   const nextShark=steps.current%2===0?approach(v.shark,next):v.shark
   if(same(next,nextShark)){
     const remaining=v.hearts-1
     setHearts(remaining);setPlayer(START);setShark(SHARK);steps.current=0
     if(remaining<=0)setState('lost')
   }else {setPlayer(next);setShark(nextShark)}
   if(nextCollected.length===TREASURES.length){setState('won');callbacks.current.onWin()}
 },[])
 useEffect(()=>{if(state!=='running')return
  const key=(e:KeyboardEvent)=>{const k=e.key.toLowerCase(),d=k==='arrowup'||k==='w'?[-1,0]:k==='arrowdown'||k==='s'?[1,0]:k==='arrowleft'||k==='a'?[0,-1]:k==='arrowright'||k==='d'?[0,1]:null
   if(d){e.preventDefault();move(d[0],d[1])}}
  window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)
 },[move,state])
 return <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
  <section className="shark-quest space-quest" role="dialog" aria-modal="true" aria-labelledby="maze-title">
   <header className="space-titlebar"><span>🌊 MINI QUEST / 002</span><button onClick={onClose} aria-label={zh?'關閉':'Close'}><X size={18}/></button></header>
   <h2 id="maze-title">{zh?'YUN 的海底大冒險':'YUN’S OCEAN MAZE'}</h2>
   <p>{zh?'在迷宮中收集潛水鏡、拳套與探險鞋，變身不同的 Yun！每走兩步，鯊魚靠近一步。':'Collect a dive mask, boxing gloves and explorer shoes while avoiding the shark. Yun changes outfit with each pickup.'}</p>
   <div className="space-stats"><span>HP {'♥'.repeat(hearts)}{'♡'.repeat(3-hearts)}</span><span>🎒 {collected.length}/3</span></div>
   <div className="maze-board" role="img" aria-label={zh?'海底迷宮，使用方向鍵移動 Yun 收集三顆珍珠':'Ocean maze. Move Yun to collect three pearls.'} style={{gridTemplateColumns:`repeat(${MAP[0].length}, 1fr)`}}>
    {MAP.flatMap((row,r)=>row.split('').map((tile,c)=>{
      const t=TREASURES.findIndex(p=>p.r===r&&p.c===c),atPlayer=player.r===r&&player.c===c,atShark=shark.r===r&&shark.c===c
      return <div key={r+'-'+c} className={'maze-tile '+(tile==='#'?'maze-wall':'maze-water')}>
       {atPlayer?<YunSprite outfit={outfit}/>:atShark?<span className="maze-shark">🦈</span>:t>=0&&!collected.includes(t)?<span className="maze-pearl">{ITEMS[t].icon}</span>:null}
      </div>
    }))}
    {state!=='running'&&<div className="maze-message"><strong>{state==='ready'?(zh?'準備下潛？':'READY TO DIVE?'):state==='won'?(zh?'三種 Yun 造型解鎖！':'THREE OUTFITS UNLOCKED!'):(zh?'被鯊魚追上了！':'CAUGHT BY THE SHARK!')}</strong></div>}
   </div>
   <div className="maze-controls"><div/><button disabled={state!=='running'} onClick={()=>move(-1,0)} aria-label={zh?'上':'Up'}><ArrowUp/></button><div/><button disabled={state!=='running'} onClick={()=>move(0,-1)} aria-label={zh?'左':'Left'}><ArrowLeft/></button><button disabled={state!=='running'} onClick={()=>move(1,0)} aria-label={zh?'下':'Down'}><ArrowDown/></button><button disabled={state!=='running'} onClick={()=>move(0,1)} aria-label={zh?'右':'Right'}><ArrowRight/></button></div>
   {state==='won'&&<button className="space-start" onClick={onClose}>{zh?'成功！查看角色圖鑑':'SUCCESS! VIEW ACHIEVEMENTS'}</button>}
   {state!=='running'&&state!=='won'&&<button className="space-start" onClick={start}>{state==='ready'?(zh?'開始探險':'START EXPLORING'):<><RotateCcw size={16}/>{zh?'再試一次':'RETRY'}</>}</button>}
   <div className="maze-items" aria-label={zh?'角色造型收集進度':'Outfit collection'}>{ITEMS.map((item,i)=><span key={item.style} className={owned.includes(i)||collected.includes(i)?'collected':''}>{owned.includes(i)||collected.includes(i)?item.icon:'❔'} {zh?item.zh:item.en}</span>)}</div>
   <button className="space-skip" onClick={onClose}>{zh?'返回冒險原野':'BACK TO QUEST FIELD'}</button>
   <p className="space-tip">{zh?'方向鍵 / WASD / 觸控按鈕移動。收集道具可永久解鎖角色造型；三張故事卡在開始遊戲後開放。':'Arrow keys, WASD or touch to move. Pickups unlock persistent outfits; stories appear when you start.'}</p>
  </section>
 </div>
}
