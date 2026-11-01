import type {Role} from './codex'

/** Original CSS pixel-art sprite, no copyrighted character artwork. */
export default function CharacterSprite({role,locked=false,large=false}:{role:Role;locked?:boolean;large?:boolean}){
 return <div className={'codex-sprite '+(large?'codex-sprite-large ':'')+'role-'+role.costume+(locked?' sprite-locked':'')} role="img" aria-label={locked?'Locked role silhouette':role.name.en}>
   <span className="sprite-shadow"/>
   <span className="sprite-person">
     <span className="sprite-head"/><span className="sprite-hair"/><span className="sprite-face"/><span className="sprite-torso"/><span className="sprite-left-arm"/><span className="sprite-right-arm"/><span className="sprite-left-leg"/><span className="sprite-right-leg"/>
     <span className="sprite-item"/><span className="sprite-decor"/>
   </span>
   {locked&&<span className="sprite-question" aria-hidden="true">?</span>}
 </div>
}
