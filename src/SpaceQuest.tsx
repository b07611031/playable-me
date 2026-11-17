import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, RotateCcw, X } from 'lucide-react'

type Props = { lang:'en'|'zh'; onClose:()=>void; onStart:()=>void; onWin:()=>void; onMilestone:(tier:number)=>void; onViewAchievements:()=>void }
type Meteor = { id:number; lane:number; progress:number; checked:boolean }
const TOTAL = 10
const SPAWN_MS = 1150
const FALL_MS = 2100

export default function SpaceQuest({lang,onClose,onStart,onWin,onMilestone,onViewAchievements}:Props) {
  const zh=lang==='zh'
  const [ship,setShip]=useState(1)
  const lane=useRef(1)
  const [meteors,setMeteors]=useState<Meteor[]>([])
  const live=useRef<Meteor[]>([])
  const [waves,setWaves]=useState(0)
  const [health,setHealth]=useState(3)
  const hp=useRef(3)
  const [result,setResult]=useState<'ready'|'running'|'won'|'lost'>('ready')
  const game=useRef<'ready'|'running'|'won'|'lost'>('ready')
  const [hit,setHit]=useState(false)
  const [dodged,setDodged]=useState(0)
  const [gameTier,setGameTier]=useState(0)
  const [round,setRound]=useState(0)
  const callbacks=useRef({onStart,onWin,onMilestone})
  callbacks.current={onStart,onWin,onMilestone}
  const move=(dir:-1|1)=>{
    if(game.current!=='running')return
    lane.current=Math.min(2,Math.max(0,lane.current+dir))
    setShip(lane.current)
  }
  const start=()=>{
    lane.current=1;setShip(1);live.current=[];setMeteors([])
    hp.current=3;setHealth(3);setWaves(0);setDodged(0);setGameTier(0);setHit(false)
    game.current='running';setResult('running');setRound(r=>r+1)
    callbacks.current.onStart()
  }
  useEffect(()=>{
    if(result!=='running')return
    const key=(e:KeyboardEvent)=>{if(e.key==='ArrowLeft'||e.key.toLowerCase()==='a'){e.preventDefault();move(-1)}else if(e.key==='ArrowRight'||e.key.toLowerCase()==='d'){e.preventDefault();move(1)}}
    window.addEventListener('keydown',key)
    let elapsed=0,previous=performance.now(),spawned=0,avoided=0,awarded=0
    const timer=window.setInterval(()=>{
      if(document.hidden)return
      const now=performance.now()
      const dt=Math.min(now-previous,100)
      previous=now
      elapsed+=dt
      while(elapsed>=SPAWN_MS&&spawned<TOTAL){
        elapsed-=SPAWN_MS
        spawned+=1
        live.current.push({id:spawned,lane:Math.floor(Math.random()*3),progress:0,checked:false})
        setWaves(spawned)
      }
      let collisions=0
      live.current=live.current.map(m=>{
        const progress=m.progress+dt/FALL_MS
        if(!m.checked&&progress>=.85){
          if(m.lane===lane.current)collisions++
          else avoided++
          return {...m,progress,checked:true}
        }
        return {...m,progress}
      }).filter(m=>m.progress<1.13)
      setMeteors([...live.current])
      if(collisions){
        hp.current=Math.max(0,hp.current-collisions)
        setHealth(hp.current);setHit(true)
        window.setTimeout(()=>setHit(false),220)
      }
      setDodged(avoided)
      const tier=avoided>=5?2:avoided>=2?1:0
      if(tier>awarded){awarded=tier;setGameTier(tier);callbacks.current.onMilestone(tier)}
      if(hp.current<=0){game.current='lost';setResult('lost');window.clearInterval(timer)}
      else if(spawned===TOTAL&&live.current.length===0){game.current='won';setResult('won');setGameTier(3);callbacks.current.onMilestone(3);callbacks.current.onWin();window.clearInterval(timer)}
    },32)
    return ()=>{window.clearInterval(timer);window.removeEventListener('keydown',key)}
  },[round,result])
  return <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
    <section className="space-quest" role="dialog" aria-modal="true" aria-labelledby="space-title">
      <header className="space-titlebar"><span>🚀 MINI QUEST / 001</span><button aria-label={zh?'關閉遊戲':'Close game'} onClick={onClose}><X size={18}/></button></header>
      <h2 id="space-title">{zh?'太空船躲避挑戰':'SPACESHIP DODGE'}</h2>
      <p>{zh?'隕石會從上方落下。看準它與太空船的距離，左右移動避開！':'Watch meteors fall toward your ship. Move between lanes before they reach you!'}</p>
      <div className="space-stats"><span>HP {'♥'.repeat(health)}{'♡'.repeat(3-health)}</span><span>{zh?'已閃避':'DODGED'} {dodged}</span><span>WAVE {waves}/{TOTAL}</span></div>
      <div className={'space-board '+(hit?'space-flash':'')} aria-label={zh?'隕石下落的三條航道':'Three lanes showing falling meteors'}>
        <div className="space-galaxy" aria-hidden="true">· ✦ · · ✧ · ✦ · · ✦ · ✧ ·</div>
        {Array.from({length:3},(_,i)=><div key={i} className="space-lane">
          {meteors.filter(m=>m.lane===i).map(m=><span key={m.id} className={'space-meteor '+(m.checked?'meteor-passed':'')} style={{top:`${m.progress*86}%`}} aria-hidden="true">☄</span>)}
          {ship===i&&<span className="space-ship" aria-label={zh?'太空船':'Spaceship'}>🚀</span>}
        </div>)}
        <div className="space-impact-line" aria-hidden="true"/>
        {result!=='running'&&<div className="space-message"><strong>{result==='ready'?'READY PLAYER ONE?':result==='won'?(zh?'任務完成！':'QUEST COMPLETE!'):(zh?'太空船受損！':'SHIP DOWN!')}</strong>{result==='won'&&<small>{zh?'成功閃避！三張故事卡現在可以探索。':'You made it through the asteroid field!'}</small>}</div>}
      </div>
      <div className="space-role-progress" aria-label={zh?'角色解鎖進度':'Character unlock progress'}>{[
  {name:'Pilot Yun',condition:zh?'閃避 2 顆':'DODGE 2',need:1},
  {name:'Shadow Support Yun',condition:zh?'閃避 5 顆':'DODGE 5',need:2},
  {name:'Tactical Yun',condition:zh?'完成挑戰':'FINISH GAME',need:3}
 ].map(role=><span key={role.name} className={gameTier>=role.need?'earned':'locked'}>{gameTier>=role.need?'✦':'?'} <b>{gameTier>=role.need?role.name:'???'}</b><small>{role.condition}</small></span>)}</div>
      <div className="space-controls"><button disabled={result!=='running'} onClick={()=>move(-1)} aria-label={zh?'向左':'Move left'}><ArrowLeft/>{zh?'左':'LEFT'}</button><button disabled={result!=='running'} onClick={()=>move(1)} aria-label={zh?'向右':'Move right'}>{zh?'右':'RIGHT'}<ArrowRight/></button></div>
      {result==='won'&&<button className="space-start" onClick={onViewAchievements}>{zh?'成功！查看解鎖角色':'SUCCESS! SEE UNLOCKED CHARACTERS'}</button>}
      {result==='lost'&&gameTier>0&&<button className="space-start" onClick={onViewAchievements}>{zh?'已取得角色！閱讀角色故事':'SEE UNLOCKED CHARACTERS & STORIES'}</button>}
      {result!=='running'&&result!=='won'&&<button className={result==='lost'&&gameTier>0?'space-retry-button':'space-start'} onClick={start}>{result==='ready'?(zh?'開始遊戲':'START GAME'):<><RotateCcw size={16}/>{zh?'再玩一次':'RETRY'}</>}</button>}
      <button className="space-skip" onClick={onClose}>{zh?'返回遊戲室':'BACK TO GAME ROOM'}</button>
      <p className="space-tip">{zh?'鍵盤 ← → 或 A / D；手機使用左右按鈕。碰撞位置在船身附近的虛線。':'Keyboard: ← → or A / D. Mobile: buttons below. The dashed line marks the collision zone.'}</p>
    </section>
  </div>
}
