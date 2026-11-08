import data from './characters.json'

export type Lang='en'|'zh'
export type Group='builder'|'learner'|'gamer'
export type Role={id:string;group:Group;storyId:string;unlock:{kind:'lab'|'outfit'|'game';level:number};name:{en:string;zh:string};classTag:{en:string;zh:string};skill:{en:string;zh:string};intro:{en:string;zh:string};evidence:{en:string;zh:string};takeaway:{en:string;zh:string};detail:{en:string;zh:string};costume:string;symbol:string}
export type Progress={labTier:number;outfits:number[];gameTier:number}
export const roles=data as Role[]
export const groups:Group[]=['builder','learner','gamer']
export const groupInfo:Record<Group,{name:{en:string;zh:string};theme:{en:string;zh:string};caption:{en:string;zh:string};skill:{en:string;zh:string}}> = {
 builder:{name:{en:'THE BUILDER',zh:'工程實作者'},theme:{en:'RESEARCH → ENGINEERING → REAL USE',zh:'研究 → 技術 → 落地'},caption:{en:'Built with AI',zh:'AI 工程與落地'},skill:{en:'Sharp Thinking · AI Fluency',zh:'問題拆解 · AI 實作'}},
 learner:{name:{en:'THE LEARNER',zh:'快速學習者'},theme:{en:'EXPLORE → PRACTICE → GROW',zh:'探索 → 練習 → 成長'},caption:{en:'Always Learning',zh:'快速學習與韌性'},skill:{en:'Drive · Resilience',zh:'主動挑戰 · 韌性'}},
 gamer:{name:{en:'THE GAMER',zh:'遊戲玩家'},theme:{en:'PLAY → CREATE → UNDERSTAND PLAYERS',zh:'遊玩 → 創作 → 了解玩家'},caption:{en:'Started with Games',zh:'遊戲熱忱與玩家視角'},skill:{en:'Passion for Games · Teamwork',zh:'遊戲熱忱 · 團隊協作'}}
}
export const isUnlocked=(role:Role,p:Progress)=>{
 if(role.unlock.kind==='lab')return p.labTier>=role.unlock.level
 if(role.unlock.kind==='game')return p.gameTier>=role.unlock.level
 return p.outfits.includes(role.unlock.level-1)
}
export const countUnlocked=(p:Progress)=>roles.filter(role=>isUnlocked(role,p)).length
