import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, RotateCcw, X } from 'lucide-react'
type Props={lang:'en'|'zh';onClose:()=>void;onStart:()=>void;onWin:()=>void}
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
export default function SharkMaze({lang,onClose,onStart,onWin}:Props){
 const zh=lang==='zh'
 const [state,setState]=useState<'ready'|'running'|'won'|'lost'>('ready')
 const [player,setPlayer]=useState<Point>(START)
 const [shark,setShark]=useState<Point>(SHARK)
 const [collected,setCollected]=useState<number[]>([])
 const [hearts,setHearts]=useState(3)
 const steps=useRef(0),latest=useRef({state,player,shark,collected,hearts})
 const callbacks=useRef({onStart,onWin});callbacks.current={onStart,onWin}
 latest.current={state,player,shark,collected,hearts}
 const start=()=>{steps.current=0;setPlayer(START);setShark(SHARK);setCollected([]);setHearts(3);setState('running');callbacks.current.onStart()}
 const move=useCallback((dr:number,dc:number)=>{
   const v=latest.current;if(v.state!=='running')return
   const next={r:v.player.r+dr,c:v.player.c+dc}
   if(MAP[next.r]?.[next.c]!=='.')return
   steps.current++
   const nextCollected=TREASURES.reduce<number[]>((arr,t,i)=>same(t,next)&&!v.collected.includes(i)?[...arr,i]:arr,[...v.collected])
   setCollected(nextCollected)
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
   <p>{zh?'在迷宮中收集 3 顆珍珠，避開巡游的鯊魚！你每走兩步，鯊魚就會靠近一步。':'Collect 3 pearls while avoiding a shark. The shark advances one tile every two moves you make.'}</p>
   <div className="space-stats"><span>HP {'♥'.repeat(hearts)}{'♡'.repeat(3-hearts)}</span><span>🫧 {collected.length}/3</span></div>
   <div className="maze-board" role="img" aria-label={zh?'海底迷宮，使用方向鍵移動 Yun 收集三顆珍珠':'Ocean maze. Move Yun to collect three pearls.'} style={{gridTemplateColumns:`repeat(${MAP[0].length}, 1fr)`}}>
    {MAP.flatMap((row,r)=>row.split('').map((tile,c)=>{
      const t=TREASURES.findIndex(p=>p.r===r&&p.c===c),atPlayer=player.r===r&&player.c===c,atShark=shark.r===r&&shark.c===c
      return <div key={r+'-'+c} className={'maze-tile '+(tile==='#'?'maze-wall':'maze-water')}>
       {atPlayer?<span className="maze-player">🧑🏻</span>:atShark?<span className="maze-shark">🦈</span>:t>=0&&!collected.includes(t)?<span className="maze-pearl">🫧</span>:null}
      </div>
    }))}
    {state!=='running'&&<div className="maze-message"><strong>{state==='ready'?(zh?'準備下潛？':'READY TO DIVE?'):state==='won'?(zh?'成功收集珍珠！':'PEARLS COLLECTED!'):(zh?'被鯊魚追上了！':'CAUGHT BY THE SHARK!')}</strong></div>}
   </div>
   <div className="maze-controls"><div/><button disabled={state!=='running'} onClick={()=>move(-1,0)} aria-label={zh?'上':'Up'}><ArrowUp/></button><div/><button disabled={state!=='running'} onClick={()=>move(0,-1)} aria-label={zh?'左':'Left'}><ArrowLeft/></button><button disabled={state!=='running'} onClick={()=>move(1,0)} aria-label={zh?'下':'Down'}><ArrowDown/></button><button disabled={state!=='running'} onClick={()=>move(0,1)} aria-label={zh?'右':'Right'}><ArrowRight/></button></div>
   {state!=='running'&&<button className="space-start" onClick={start}>{state==='ready'?(zh?'開始探險':'START EXPLORING'):<><RotateCcw size={16}/>{zh?'再試一次':'RETRY'}</>}</button>}
   <button className="space-skip" onClick={onClose}>{zh?'返回冒險原野':'BACK TO QUEST FIELD'}</button>
   <p className="space-tip">{zh?'方向鍵 / WASD / 觸控按鈕移動。三張故事卡在開始遊戲後開放，也能選擇直接閱讀。':'Move with arrow keys, WASD or touch. Stories unlock on starting, or you can choose to read directly.'}</p>
  </section>
 </div>
}
