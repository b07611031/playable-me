import './codex.css'
import {useState} from 'react'
import {ArrowLeft, ArrowRight, Check, Lock, X} from 'lucide-react'
import CharacterSprite from './CharacterSprite'
import {countUnlocked,groupInfo,groups,isUnlocked,roles,type Group,type Lang,type Progress,type Role} from './codex'

type Props={lang:Lang;progress:Progress;onBack:()=>void;onStory:(storyId:string)=>void;preferredGroup?:Group|'all';onGoToStation:(group:Group)=>void;storyTitles:Record<string,string>}
const val=(o:{en:string;zh:string},lang:Lang)=>o[lang]
const stationNames:Record<Group,{en:string;zh:string}>={builder:{en:'AI Lab',zh:'AI 研究室'},learner:{en:'Quest Field',zh:'冒險原野'},gamer:{en:'Game Room',zh:'遊戲房間'}}
const hint=(group:Group,lang:Lang)=>({
 builder:lang==='zh'?'挑戰 AI Lab 連點，達成 5 / 12 / 22 次':'Play AI Lab and reach 5 / 12 / 22 taps',
 learner:lang==='zh'?'在海底迷宮收集潛水鏡、拳套與探險鞋':'Collect the dive mask, gloves and boots in Ocean Maze',
 gamer:lang==='zh'?'躲過 2 / 5 波隕石並完成太空船挑戰':'Dodge 2 / 5 meteors and complete Spaceship Dodge'
})[group]

export default function Codex({lang,progress,onBack,onStory,preferredGroup='all',onGoToStation,storyTitles}:Props){
 const zh=lang==='zh'
 const [filter,setFilter]=useState<Group|'all'>(preferredGroup)
 const [selected,setSelected]=useState<Role|null>(null)
 const complete=countUnlocked(progress)
 const shown=filter==='all'?groups:[filter]
 return <section className="codex-screen">
   <button className="back-link" onClick={onBack}><ArrowLeft size={16}/>{zh?'返回世界地圖':'BACK TO WORLD MAP'}</button>
   <header className="codex-heading"><div><span className="eyebrow">PLAYER JOURNAL / 001</span><h1>YUN CODEX <span className="title-spark">✦</span></h1><p>{zh?'九種身份，三條成長路線。每個角色都來自真實經歷。':'Nine identities. Three journeys. Every character comes from a real experience.'}</p></div><div className="codex-total"><strong>{complete}<small>/9</small></strong><span>{zh?'已收藏':'DISCOVERED'}</span></div></header>
   <div className="codex-progress" role="progressbar" aria-label={zh?'圖鑑收藏進度':'Codex collection progress'} aria-valuemin={0} aria-valuemax={9} aria-valuenow={complete}><span style={{width:`${complete/9*100}%`}}/></div>
   <div className="codex-tabs" role="group" aria-label={zh?'選擇角色分類':'Character category'}>
    <button onClick={()=>setFilter('all')} className={filter==='all'?'active':''}>ALL <span>{complete}/9</span></button>
    {groups.map(g=><button key={g} onClick={()=>setFilter(g)} className={filter===g?'active':''}>{g.toUpperCase()} <span>{roles.filter(r=>r.group===g&&isUnlocked(r,progress)).length}/3</span></button>)}
   </div>
   <div className="codex-groups">{shown.map(group=><section className="codex-group" key={group}>
    <div className="codex-group-heading"><div><span className="eyebrow">0{groups.indexOf(group)+1} / COLLECTION</span><h2>{val(groupInfo[group].name,lang)}</h2><p>{val(groupInfo[group].theme,lang)}</p></div><div className="codex-group-counter">{roles.filter(r=>r.group===group&&isUnlocked(r,progress)).length}/3</div></div>
    <div className="codex-cards">{roles.filter(r=>r.group===group).map(role=>{
      const earned=isUnlocked(role,progress)
      return <button key={role.id} className={'codex-card '+(earned?'codex-earned':'codex-locked')} onClick={()=>setSelected(role)} aria-label={earned?val(role.name,lang):(zh?'未解鎖角色，點擊選擇是否前往解鎖地點':'Locked role, click to visit its unlock station')}>
        <span className="codex-card-num">#{String(roles.indexOf(role)+1).padStart(2,'0')}</span>
        <CharacterSprite role={role} locked={!earned}/>
        <span className="codex-card-info"><strong>{earned?val(role.name,lang):'???'}</strong><small>{earned?val(role.classTag,lang):(zh?'尚未解鎖':'LOCKED')}</small>
        {earned&&<small className="codex-card-story">📖 {storyTitles[role.storyId]}</small>}</span>
        <span className="codex-card-foot">{earned?<><Check size={13}/>{zh?'已解鎖':'UNLOCKED'}</>:<><Lock size={13}/>{zh?'繼續探索':'KEEP EXPLORING'}</>}</span>
      </button>
    })}</div>
    <div className="codex-group-trait"><span>✦ {zh?'能力特質':'KEY ABILITIES'}</span> {val(groupInfo[group].skill,lang)}</div>
   </section>)}</div>
   <div className="codex-summary"><span>✦</span><p>{zh?'這九個角色不是九份不同的履歷，而是我如何學習、實作、以及理解遊戲的九種視角。':'Nine roles, not nine resumes—nine ways to explore how I learn, build, and understand games.'}</p></div>
   {selected&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}><section className="codex-modal" role="dialog" aria-modal="true" aria-labelledby="codex-detail-heading">
     <div className="dialogue-bar"><span>✦ YUN CODEX / {selected.group.toUpperCase()}</span><button className="close-modal" onClick={()=>setSelected(null)} aria-label={zh?'關閉':'Close'}><X size={18}/></button></div>
     {isUnlocked(selected,progress)?<>
       <div className="codex-modal-hero"><CharacterSprite role={selected} large/><div><span className="eyebrow">{val(selected.classTag,lang)}</span><h2 id="codex-detail-heading">{val(selected.name,lang)}</h2><p>{val(selected.skill,lang)}</p></div></div>
       <p className="codex-modal-intro">{val(selected.intro,lang)}</p>
       <div className="codex-evidence"><span>01 / {zh?'真實經歷':'REAL EXPERIENCE'}</span><p>{val(selected.evidence,lang)}</p><small>{val(selected.detail,lang)}</small></div>
       <div className="codex-evidence"><span>02 / {zh?'我的收穫':'WHAT I LEARNED'}</span><p>{val(selected.takeaway,lang)}</p></div>
       <button className="codex-modal-cta" onClick={()=>{onStory(selected.storyId);setSelected(null)}}>{zh?'閱讀':'READ'} {storyTitles[selected.storyId]} <ArrowRight size={17}/></button>
     </>:<>
       <div className="codex-unknown"><CharacterSprite role={selected} locked large/><div><h2 id="codex-detail-heading">???</h2><p>{zh?'尚未解鎖的身份':'UNKNOWN CHARACTER'}</p></div></div>
       <div className="codex-evidence"><span>✦ {zh?'解鎖線索':'UNLOCK HINT'}</span><p>{hint(selected.group,lang)}</p></div>
       <div className="codex-station-confirm">
         <strong>{zh?'要前往解鎖地點嗎？':'GO TO THE UNLOCK STATION?'}</strong>
         <p>{zh?'這個角色可以在「'+stationNames[selected.group].zh+'」解鎖。要現在前往嗎？':'This character can be unlocked in '+stationNames[selected.group].en+'. Would you like to go there now?'}</p>
         <div className="codex-confirm-actions">
           <button className="codex-confirm-cancel" onClick={()=>setSelected(null)}>{zh?'稍後再說':'NOT NOW'}</button>
           <button className="codex-modal-cta" onClick={()=>{const group=selected.group;setSelected(null);onGoToStation(group)}}>{zh?'前往 '+stationNames[selected.group].zh:'GO TO '+stationNames[selected.group].en.toUpperCase()} <ArrowRight size={17}/></button>
         </div>
       </div>
     </>}
   </section></div>}
 </section>
}
