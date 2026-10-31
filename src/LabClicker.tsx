import { useEffect, useRef, useState } from 'react'
import { RotateCcw, X, Zap } from 'lucide-react'
type Props={lang:'en'|'zh';onClose:()=>void;onViewAchievements:()=>void;onStart:()=>void;onUnlock:(tier:number)=>void;initialTier:number}
const thresholds=[5,12,22]
const projects=[['Plantman','Plantman'],['Long-video tracking','長影片追蹤'],['SOP Annotator','SOP Annotator']] as const
export default function LabClicker({lang,onClose,onViewAchievements,onStart,onUnlock,initialTier}:Props){
 const zh=lang==='zh'
 const [running,setRunning]=useState(false)
 const [succeeded,setSucceeded]=useState(false)
 const [seconds,setSeconds]=useState(12)
 const [clicks,setClicks]=useState(0)
 const [best,setBest]=useState(initialTier)
 const total=useRef(0)
 const finished=useRef(false)
 const callbacks=useRef({onStart,onUnlock});callbacks.current={onStart,onUnlock}
 const start=()=>{total.current=0;finished.current=false;setSucceeded(false);setClicks(0);setSeconds(12);setRunning(true);callbacks.current.onStart()}
 const tap=()=>{
   if(!running||finished.current)return
   total.current++;setClicks(total.current)
   const tier=thresholds.filter(n=>total.current>=n).length
   if(tier>best){setBest(tier);callbacks.current.onUnlock(tier)}
   if(tier===thresholds.length){finished.current=true;setSucceeded(true);setRunning(false)}
 }
 useEffect(()=>{
   if(!running)return
   const interval=window.setInterval(()=>setSeconds(s=>Math.max(0,s-1)),1000)
   return()=>window.clearInterval(interval)
 },[running])
 useEffect(()=>{if(seconds===0&&running){finished.current=true;setRunning(false)}},[seconds,running])
 const tier=thresholds.filter(n=>clicks>=n).length
 return <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
  <section className="space-quest lab-quest" role="dialog" aria-modal="true" aria-labelledby="lab-title">
   <header className="space-titlebar"><span>⚡ MINI QUEST / 003</span><button onClick={onClose} aria-label={zh?'關閉':'Close'}><X size={18}/></button></header>
   <h2 id="lab-title">{zh?'AI 能量充電站':'AI POWER-UP LAB'}</h2>
   <p>{zh?'12 秒內連點累積能量，逐步解鎖三個 AI 工程故事。也可以直接選擇瀏覽故事。':'Tap to generate energy in 12 seconds and unlock three engineering stories. You can also browse stories directly.'}</p>
   <div className="space-stats"><span>⏱ {seconds}s</span><span>⚡ {clicks}</span><span>{zh?'最高解鎖':'UNLOCKED'} {Math.max(tier,best)}/3</span></div>
   <div className="lab-progress"><div style={{width:`${Math.min(100,clicks/22*100)}%`}}/></div>
   <div className="lab-milestones">{thresholds.map((n,i)=><span key={n} className={Math.max(tier,best)>i?'earned':''}>{Math.max(tier,best)>i?'✓':'🔒'} <strong>{projects[i][zh?1:0]}</strong><small>{n} {zh?'次':'taps'}</small></span>)}</div>
   <button className={'lab-tap '+(running?'lab-running':'')} disabled={!running} onClick={tap} aria-label={zh?'點擊輸出能量':'Tap to generate energy'}><Zap size={42}/><strong>{running?(zh?'快速點擊！':'TAP!'):(zh?'AI 充電器':'AI GENERATOR')}</strong><span>{zh?'每次點擊都在累積能量':'EVERY TAP GENERATES ENERGY'}</span></button>
   {succeeded&&<div className="mini-success" role="status">🏆 {zh?'成功！三項 AI 專案已解鎖。':'Success! All three AI projects unlocked.'}</div>}
   {!running&&(succeeded?<button className="space-start" onClick={onViewAchievements}>{zh?'成功！查看角色圖鑑':'SUCCESS! VIEW ACHIEVEMENTS'}</button>:<button className="space-start" onClick={start}>{seconds===12&&clicks===0?(zh?'開始 12 秒挑戰':'START 12-SECOND RUN'):<><RotateCcw size={16}/>{zh?'再挑戰一次':'TRY AGAIN'}</>}</button>)}
   <button className="space-skip" onClick={onClose}>{zh?'返回 AI 研究室':'BACK TO AI LAB'}</button>
   <p className="space-tip">{zh?'解鎖條件：5 / 12 / 22 次。成績保留於這次瀏覽；不必拿滿分才能使用專業連結。':'Unlock tiers at 5 / 12 / 22 taps. Professional links never require a game score.'}</p>
  </section>
 </div>
}
