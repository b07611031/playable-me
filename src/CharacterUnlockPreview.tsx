import {Check} from 'lucide-react'
import CharacterSprite from './CharacterSprite'
import {groupInfo,isUnlocked,roles,type Group,type Lang,type Progress} from './codex'

type Props={
  lang:Lang
  group:Group
  progress:Progress
  onAcknowledge:()=>void
}

export default function CharacterUnlockPreview({lang,group,progress,onAcknowledge}:Props){
 const zh=lang==='zh'
 const unlocked=roles.filter(role=>role.group===group&&isUnlocked(role,progress))
 return <div className="overlay" role="presentation">
   <section className="unlock-preview" role="dialog" aria-modal="true" aria-labelledby="unlock-preview-title">
     <span className="eyebrow">✦ CHARACTER UNLOCKED</span>
     <h2 id="unlock-preview-title">{zh?'解鎖新角色！':'CHARACTERS UNLOCKED!'}</h2>
     <p className="unlock-preview-subtitle">{zh?'你已取得這些 Yun 造型。':'You have collected these Yun appearances.'}</p>
     <div className="unlock-preview-characters">
       {unlocked.map(role=><div className="unlock-preview-character" key={role.id}>
         <CharacterSprite role={role}/>
         <b>{role.name[lang]}</b>
         <span><Check size={13}/>{zh?'已解鎖':'UNLOCKED'}</span>
       </div>)}
     </div>
     <button className="unlock-preview-ack" onClick={onAcknowledge}>
       {zh?'我了解了，返回探索故事':'GOT IT — BACK TO STORIES'}
     </button>
     <p className="unlock-preview-tip">{zh?'接下來可在 '+groupInfo[group].name.zh+' 閱讀對應故事，也可以稍後從 YUN CODEX 回顧角色。':'Next, read their stories in '+groupInfo[group].name.en+'. You can revisit these characters in YUN CODEX anytime.'}</p>
   </section>
 </div>
}
