import {ArrowRight, BookOpen, Check} from 'lucide-react'
import CharacterSprite from './CharacterSprite'
import {isUnlocked,roles,type Group,type Lang,type Progress} from './codex'

type Props={
  lang:Lang
  group:Group
  progress:Progress
  storyTitles:Record<string,string>
  unreadCount:number
  onReadStories:()=>void
  onAcknowledge:()=>void
}

export default function CharacterUnlockPreview({
  lang,group,progress,storyTitles,unreadCount,onReadStories,onAcknowledge,
}:Props){
 const zh=lang==='zh'
 const unlocked=roles.filter(role=>role.group===group&&isUnlocked(role,progress))
 return <div className="overlay" role="presentation">
   <section className="unlock-preview" role="dialog" aria-modal="true" aria-labelledby="unlock-preview-title">
     <span className="eyebrow">✦ CHARACTER UNLOCKED</span>
     <h2 id="unlock-preview-title">{zh?'解鎖角色，也解鎖他的故事！':'CHARACTERS & STORIES UNLOCKED!'}</h2>
     <p className="unlock-preview-subtitle">{zh?'這些角色都是 Yun 的真實經歷。來認識角色背後的故事吧。':'Every character comes from a real chapter of Yun’s life. Meet the person behind each role.'}</p>
     <div className="unlock-preview-characters">
       {unlocked.map(role=><div className="unlock-preview-character" key={role.id}>
         <CharacterSprite role={role}/>
         <b>{role.name[lang]}</b>
         <span><Check size={13}/>{zh?'已解鎖':'UNLOCKED'}</span>
         <div className="unlock-preview-story-link"><BookOpen size={14}/><strong>{storyTitles[role.storyId]}</strong></div>
       </div>)}
     </div>
     <button className="unlock-preview-ack" onClick={onReadStories}>
       <BookOpen size={17}/>
       {unreadCount>0
        ?(zh?`開始閱讀 ${unreadCount} 個角色故事`:`READ ${unreadCount} CHARACTER ${unreadCount===1?'STORY':'STORIES'}`)
        :(zh?'重新回顧角色故事':'REVISIT CHARACTER STORIES')}
       <ArrowRight size={17}/>
     </button>
     <button className="unlock-preview-later" onClick={onAcknowledge}>
       {zh?'稍後再閱讀，返回 Station':'NOT NOW — BACK TO STATION'}
     </button>
     <p className="unlock-preview-tip">{zh?'讀完一段故事，就能繼續認識下一個角色；也可以隨時略過。':'After each story, continue to the next character. You can skip the guided tour anytime.'}</p>
   </section>
 </div>
}
