import { useEffect, useState, type CSSProperties } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, Code2, Compass, ExternalLink, Gamepad2, Github, Globe2, Map, RotateCcw, Sparkles, Trophy, X } from 'lucide-react'
import SpaceQuest from './SpaceQuest'
import SharkMaze from './SharkMaze'
import LabClicker from './LabClicker'

type Lang = 'en' | 'zh'
type ZoneId = 'lab' | 'field' | 'game'
type Screen = 'home' | 'map' | 'zone' | 'ending'
type Story = { id:string; emoji:string; title:[string,string]; teaser:[string,string]; lines:[string[],string[]] }
type Zone = { id:ZoneId; icon:string; name:[string,string]; trait:[string,string]; accent:string; stories:Story[] }

const zones: Zone[] = [
  { id:'lab',icon:'⌘',name:['AI LAB','AI 研究室'],trait:['THE BUILDER','工程實作者'],accent:'#7abfdc',stories:[
    {id:'plantman',emoji:'🌱',title:['Plantman','Plantman 農業 AI'],teaser:['From thesis to a tool','從研究走向應用'],lines:[['During graduate research, I built an AI approach to recognize tomato diseases and disorders.','I learned that a useful model needs more than accuracy: it needs to work where people actually use it.'],['研究所期間，我建立辨識番茄病蟲害與生理障礙的 AI 方法。','我學到：模型不只要準確，更需要真正符合使用現場。']]},
    {id:'sam',emoji:'🎞️',title:['Long-video tracking','長影片追蹤'],teaser:['Engineering within limits','在限制下解決問題'],lines:[['Long videos can strain GPU memory. I worked on chunked processing to support video tracking with limited resources.','The challenge I enjoy: finding an approach that works under real constraints.'],['長影片容易消耗大量 GPU 記憶體。我嘗試以分段處理等方式，讓追蹤能在有限資源下運作。','我喜歡的工程挑戰，就是在真實限制中找到可行解法。']]},
    {id:'workflow',emoji:'🧩',title:['Making ideas usable','讓想法真正可用'],teaser:['Ambiguity → small experiments','模糊需求 → 小規模驗證'],lines:[['In manufacturing AI projects, I start by talking to people closest to the problem.','I turn ambiguous needs into testable steps, ship a small working version, and improve it through feedback.'],['在製造業 AI 專案，我習慣先理解第一線遇到的問題。','把模糊需求拆成可驗證的步驟，先做出能使用的版本，再根據回饋迭代。']]}
  ]},
  { id:'field',icon:'✦',name:['QUEST FIELD','冒險原野'],trait:['THE LEARNER','快速學習者'],accent:'#b8cc88',stories:[
    {id:'camino',emoji:'🥾',title:['The long road','朝聖之路'],teaser:['A lesson in persistence','在旅途中學習'],lines:[['I walked the Camino de Santiago. Progress came from showing up every day, adapting, and continuing.','It changed how I think about unfamiliar challenges.'],['我走過 Camino de Santiago 朝聖之路。每天出發、調整節奏、繼續前進，讓我重新理解挑戰。','面對陌生問題，我也會用這樣的方式逐步找到路。']]},
    {id:'water',emoji:'🤿',title:['Underwater quests','水下探索'],teaser:['New skills, new perspective','從零開始學新技能'],lines:[['I explored scuba diving, freediving, and lifesaving. Each new skill starts with learning the basics and respecting the environment.'],['我學習水肺潛水、自由潛水，也取得救生員資格。','每個新領域，都從基本功、練習與尊重環境開始。']]},
    {id:'arena',emoji:'🥊',title:['Practice → competition','從練習到競賽'],teaser:['Fencing, Sanda, bouldering','擊劍、散打、抱石'],lines:[['I won freshman competitions in fencing and Sanda, and continue finding new challenges through bouldering.','What stays with me is the process: learn, try, receive feedback, repeat.'],['我曾在新生盃獲得擊劍與散打冠軍，也持續透過抱石挑戰自己。','比起獎項，我更重視從學習、嘗試、獲得回饋到再次挑戰的過程。']]}
  ]},
  { id:'game',icon:'★',name:['GAME ROOM','遊戲房間'],trait:['THE GAMER','熱愛遊戲的玩家'],accent:'#e6ad80',stories:[
    {id:'spaceship',emoji:'🚀',title:['It began with a game','一切從遊戲開始'],teaser:['My first 2D spaceship','第一款 2D 太空船遊戲'],lines:[['In high school, I joined a software training program. My first programming project was a 2D spaceship game.','Games were my gateway into software — and that curiosity never left.'],['高中時，我參加軟體種子培訓計畫，第一個程式作業是一款 2D 太空船遊戲。','遊戲是我踏入軟體領域的起點，這份好奇心一直延續到現在。']]},
    {id:'pyke',emoji:'⚔️',title:['The support player','輔助玩家的視角'],teaser:['Vision, timing, teamwork','視野、時機與團隊合作'],lines:[['In League of Legends, I enjoy playing Pyke support. I like creating opportunities through vision, roaming, and well-timed engages.','The best play is not always about individual damage.'],['在英雄聯盟，我很喜歡玩派克輔助。透過視野、遊走與抓準開戰時機，創造隊友能發揮的機會。','最有價值的操作，不一定是自己的傷害最高。']]},
    {id:'cs',emoji:'🎯',title:['Friends, games, stories','與朋友一起玩的遊戲'],teaser:['CS2 and shared experiences','CS2 與共同經驗'],lines:[['I play Counter-Strike 2 with friends. It reminds me how much social connection shapes why people come back to games.','I want to understand not just how games work, but why people love them.'],['我會和朋友一起玩 CS2。這讓我感受到社交連結，也是玩家持續回到遊戲的重要原因之一。','我想理解的不只是遊戲怎麼運作，更是玩家為什麼喜歡它。']]}
  ]}
]
const tr = (pair:[string,string],lang:Lang) => pair[lang==='en'?0:1]
const github = 'https://github.com/b07611031'
const linkedin = 'https://www.linkedin.com/in/yunlin-ntu/'
const labels = {
  en:{start:'START EXPLORING',map:'WORLD MAP',welcome:'WELCOME, TRAVELER',intro:'Hi, I’m Yun. I build with AI, learn by doing, and have loved games since my first line of code.',hint:'Choose a destination. Every place tells a piece of my story.',explore:'EXPLORE',seen:'DISCOVERED',completed:'ACHIEVEMENT UNLOCKED!',finish:'ALL QUESTS COMPLETE',ending:'The next adventure begins with a conversation.',back:'BACK TO MAP',again:'RESTART JOURNEY',about:'ABOUT THIS WORLD',links:'CONNECT',portfolio:'RESUME COMING SOON',progress:'BADGES',dialogue:'STORY',continue:'NEXT',exit:'CLOSE',skip:'SKIP INTRO',chapter:'CHAPTER',view:'VIEW STORY',return:'RETURN',summary:'YOU MET YUN',revisit:'KEEP EXPLORING',hint2:'Select any item to read a story. Discover all three to earn this area’s badge.',read:'READ STORIES',notready:'Resume link will be added before public launch.',linkTitle:'Professional links',github:'GITHUB',sound:'No sound in this version'},
  zh:{start:'開始探索',map:'世界地圖',welcome:'歡迎，冒險者',intro:'嗨，我是 Yun。我用 AI 解決問題，喜歡動手學習，也從寫下第一行程式以前就熱愛遊戲。',hint:'選擇一個目的地，每個地方都藏著一段我的故事。',explore:'進入探索',seen:'已探索',completed:'解鎖成就！',finish:'完成所有冒險',ending:'下一段冒險，從一場對話開始。',back:'返回地圖',again:'重新開始',about:'關於這個世界',links:'聯絡與履歷',portfolio:'履歷即將提供',progress:'徽章',dialogue:'故事',continue:'下一段',exit:'關閉',skip:'略過介紹',chapter:'篇章',view:'閱讀故事',return:'返回',summary:'你認識了 YUN',revisit:'繼續探索',hint2:'點擊物品閱讀故事，探索此區域三個故事即可獲得徽章。',read:'故事',notready:'履歷連結將於公開發布前補上。',linkTitle:'專業連結',github:'GITHUB',sound:'目前版本沒有音效'}
}
const readSaved = (key:string): string[] => {try {const v=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(v)?v.filter((x):x is string=>typeof x==='string'):[]}catch{return []}}
function PixelAvatar({large=false}:{large?:boolean}){return <div className={'pixel-avatar '+(large?'large':'')} aria-label="Pixel art character of Yun" role="img"><span className="hair"/><span className="face"/><span className="eyes"/><span className="shirt"/><span className="legs"/></div>}
function PixelScene({zone, stories, completed, lang, onInteract}:{zone:ZoneId; stories:Story[]; completed:string[]; lang:Lang; onInteract:(story:Story)=>void}){return <div className={'scene-art scene-'+zone} role="group" aria-label={lang==='zh'?'可互動的像素場景':'Interactive pixel scene'}><div className="scene-sky" aria-hidden="true"><i/><i/><i/></div>{zone==='lab'?<><div className="pixel-window">✦</div><div className="scene-desk"><div className="monitor"><span> &gt;_ </span></div><div className="keyboard"/></div><div className="plant">✿</div></>:zone==='field'?<><div className="mountain-one"/><div className="mountain-two"/><div className="pine pine-a">♠</div><div className="pine pine-b">♠</div><div className="lake"/></>:<><div className="arcade arcade-a"><div>★</div><span>PLAY</span></div><div className="arcade arcade-b"><div>🚀</div><span>START</span></div><div className="neon-star">✧</div></>}<div className="ground"/><div className="scene-character"><PixelAvatar/></div><div className="scene-hotspots">{stories.map((story,i)=><button type="button" key={story.id} className={`scene-hotspot hotspot-${zone}-${i} ${completed.includes(story.id)?'hotspot-read':''}`} onClick={()=>onInteract(story)} aria-label={`${lang==='zh'?'探索':'Explore'}: ${tr(story.title,lang)}`} title={tr(story.title,lang)}><span className="hotspot-sprite" aria-hidden="true">{story.emoji}</span><span className="hotspot-label">{completed.includes(story.id)?'✓ ':'✦ '}{tr(story.title,lang)}</span></button>)}</div></div>}
function App(){
 const [lang,setLang]=useState<Lang>(()=>{try{return localStorage.getItem('pm-lang')==='zh'?'zh':'en'}catch{return'en'}})
 const [screen,setScreen]=useState<Screen>('home')
 const [zoneId,setZoneId]=useState<ZoneId>('lab')
 const [opened,setOpened]=useState<string[]>(()=>readSaved('pm-opened'))
 const [activeStory,setActiveStory]=useState<Story|null>(null)
 const [line,setLine]=useState(0)
 const [linksOpen,setLinksOpen]=useState(false)
 const [spaceOpen,setSpaceOpen]=useState(false)
 const [spaceWon,setSpaceWon]=useState(false)
 const [gameStarted,setGameStarted]=useState(false)
 const [fieldStarted,setFieldStarted]=useState(false)
 const [sharkOpen,setSharkOpen]=useState(false)
 const [sharkWon,setSharkWon]=useState(false)
 const [labOpen,setLabOpen]=useState(false)
 const [labTier,setLabTier]=useState(0)
 const [skipGames,setSkipGames]=useState<Record<ZoneId,boolean>>({lab:false,field:false,game:false})
 const t=labels[lang]
 const zone=zones.find(z=>z.id===zoneId)!
 const zoneComplete=(z:Zone)=>z.stories.every(s=>opened.includes(s.id))
 const badges=zones.filter(zoneComplete).length
 useEffect(()=>{try{localStorage.setItem('pm-opened',JSON.stringify(opened))}catch{}},[opened])
 useEffect(()=>{try{localStorage.setItem('pm-lang',lang)}catch{};document.documentElement.lang=lang==='zh'?'zh-TW':'en'},[lang])
 useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape' && !spaceOpen){setActiveStory(null);setLinksOpen(false)} };window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[spaceOpen])
 const openStory=(s:Story)=>{setActiveStory(s);setLine(0)}
 const finishStory=()=>{if(activeStory){const id=activeStory.id;setOpened(prev=>prev.includes(id)?prev:[...prev,id])}setActiveStory(null)}
 const goMap=()=>{setActiveStory(null);setScreen(badges===3?'ending':'map')}
 const reset=()=>{setOpened([]);setScreen('home');setActiveStory(null)}
 const completed=zoneComplete(zone)
 const unlockedCount=skipGames[zone.id]?3:zone.id==='game'?(gameStarted?3:0):zone.id==='field'?(fieldStarted?3:0):labTier
 const storyAccess=unlockedCount>0
 const launchGame=()=>{if(zone.id==='game')setSpaceOpen(true);else if(zone.id==='field')setSharkOpen(true);else setLabOpen(true)}
 return <div className="app-shell">
  <div className="stars" aria-hidden="true"/>
  <header className="topbar"><button className="brand" onClick={()=>setScreen('home')} aria-label="Go to start"><span className="brand-icon">✦</span> PLAYABLE<span className="brand-highlight">ME</span><span className="brand-version">v0.3</span></button><div className="header-actions"><span className="badge-count"><Trophy size={15}/> {badges}/3</span><button className="icon-button lang-button" onClick={()=>setLang(lang==='en'?'zh':'en')} aria-label="Change language"><Globe2 size={16}/>{lang==='en'?'中':'EN'}</button><button className="icon-button" onClick={()=>setLinksOpen(true)} aria-label={t.linkTitle}><ExternalLink size={17}/></button></div></header>
  <main className="main-content">
   {screen==='home'&&<section className="home-screen"><div className="tiny-kicker"><span className="pulse-dot"/> AN INTERACTIVE PORTFOLIO · 2026</div><div className="home-art"><div className="pixel-sun"/><span className="float-star st1">✧</span><span className="float-star st2">✦</span><span className="float-star st3">✧</span><div className="home-platform"/><PixelAvatar large/><span className="home-shadow"/></div><div className="home-copy"><p className="level-tag">PLAYER 001 · ENGINEER / GAMER / EXPLORER</p><h1>THE STORY<br/>OF <em>YUN</em><span className="cursor">_</span></h1><p className="tagline">Started with Games. <span>Built with AI.</span><br/>Always Learning.</p><p className="intro">{t.intro}</p><button className="primary-cta" onClick={()=>setScreen('map')}><Gamepad2 size={19}/>{t.start}<ChevronRight size={20}/></button><button className="secondary-link" onClick={()=>setLinksOpen(true)}>{t.links} <ArrowRight size={15}/></button></div></section>}
   {screen==='map'&&<section className="map-screen"><div className="section-top"><p className="eyebrow">01 / WORLD SELECT</p><h1>{t.map}<span className="title-spark"> ✦</span></h1><p className="section-subtitle">{t.hint}</p></div><div className="world-board"><div className="map-pattern"/><div className="map-route route-one"/><div className="map-route route-two"/><div className="map-player"><PixelAvatar/></div>{zones.map((z,i)=><button key={z.id} className={'world-location node-'+z.id} onClick={()=>{setZoneId(z.id);setScreen('zone')}} style={{'--accent':z.accent} as CSSProperties}><span className={'map-building build-'+z.id}>{z.id==='lab'?'▣':z.id==='field'?'▲':'▤'}</span><span className="map-label">{tr(z.name,lang)}</span><span className="map-check">{zoneComplete(z)?'✓':('0'+(i+1))}</span></button>)}<div className="pixel-trees" aria-hidden="true">♠ ♠<br/>♠ ♠ ♠</div><div className="map-lake" aria-hidden="true">≈ ≈ ≈</div></div><div className="map-footer"><span>✦ {badges}/3 {t.progress}</span><span>CHOOSE A LOCATION ↗</span></div><div className="zone-preview-list">{zones.map(z=><button className="preview-row" key={z.id} onClick={()=>{setZoneId(z.id);setScreen('zone')}}><span className="preview-symbol" style={{color:z.accent}}>{z.icon}</span><span><b>{tr(z.name,lang)}</b><small>{tr(z.trait,lang)}</small></span>{zoneComplete(z)?<Check size={17} className="done-icon"/>:<ChevronRight size={17}/>}</button>)}</div></section>}
   {screen==='zone'&&<section className="zone-screen">
    <button className="back-link" onClick={goMap}><ArrowLeft size={16}/>{t.back}</button>
    <div className="zone-heading"><p className="eyebrow">02 / {t.chapter} · {zone.id.toUpperCase()}</p><h1 style={{color:zone.accent}}>{tr(zone.name,lang)}</h1><p>{tr(zone.trait,lang)}</p></div>
    <PixelScene zone={zone.id} stories={zone.stories.slice(0,unlockedCount)} completed={opened} lang={lang} onInteract={openStory}/>
    <div className="quest-gate">
      <div className="quest-gate-copy">
        <span className="eyebrow">MINI QUEST / {zone.id==='game'?'001':zone.id==='field'?'002':'003'}</span>
        <h2>{zone.id==='game'?'🚀 SPACESHIP DODGE':zone.id==='field'?'🦈 OCEAN MAZE':'⚡ AI POWER-UP LAB'}</h2>
        <p>{zone.id==='game'
          ?(lang==='zh'?'先玩一局太空船，親眼看到隕石從上方逼近。開始遊戲即可解鎖三張故事卡。':'Play a round of Spaceship Dodge. Meteors visibly fall toward your ship; starting reveals all three stories.')
          :zone.id==='field'
          ?(lang==='zh'?'操作 Yun 收集海底珍珠，同時避開鯊魚。開始探索即可看到三張故事卡。':'Guide Yun through an underwater maze while avoiding a shark. Starting reveals the three stories.')
          :(lang==='zh'?'12 秒內連點生成能量！累積 5、12、22 次，逐步解鎖一、二、三張故事卡。':'Tap for 12 seconds! Reach 5, 12 or 22 taps to unlock one, two or three stories.')}</p>
        {zone.id==='game'&&spaceWon&&<span className="mini-win">✓ {lang==='zh'?'太空船挑戰完成':'SPACESHIP CLEARED'}</span>}
        {zone.id==='field'&&sharkWon&&<span className="mini-win">✓ {lang==='zh'?'成功躲避鯊魚':'OCEAN MAZE CLEARED'}</span>}
        {zone.id==='lab'&&<span className="mini-win">⚡ {lang==='zh'?'已解鎖':'UNLOCKED'} {unlockedCount}/3</span>}
      </div>
      <button className="quest-play-button" onClick={launchGame}><Gamepad2 size={18}/>{lang==='zh'?'開始遊戲':'PLAY MINI GAME'}</button>
    </div>
    <div className="gate-skip-row"><span>{lang==='zh'?'沒有時間玩？':'Short on time?'}</span><button onClick={()=>setSkipGames(p=>({...p,[zone.id]:true}))}>{lang==='zh'?'直接閱讀全部故事':'READ ALL STORIES INSTEAD'} <ArrowRight size={14}/></button></div>
    {storyAccess?<><div className="zone-story-head"><div><span className="eyebrow">{t.read}</span><h2>{lang==='en'?'DISCOVER THE STORY':'探索這段故事'}</h2></div><span className="story-count">{zone.stories.filter(s=>opened.includes(s.id)).length}/3</span></div>
      <p className="zone-instruction">{lang==='zh'?'點擊場景物件或下方故事卡。完整閱讀才算完成。':'Tap the scene objects or cards below. Finish a dialogue to record completion.'}</p>
      <div className="story-list">{zone.stories.map((s,i)=>i<unlockedCount?<button className="story-card" key={s.id} onClick={()=>openStory(s)}><span className="object-icon">{s.emoji}</span><span className="story-details"><b><span className="story-idx">0{i+1} / </span>{tr(s.title,lang)}</b><small>{tr(s.teaser,lang)}</small></span><span className={'story-status '+(opened.includes(s.id)?'is-done':'')}>{opened.includes(s.id)?<Check size={17}/>:<ChevronRight size={17}/>}</span></button>:<div key={s.id} className="story-card story-locked" aria-label={lang==='zh'?'尚未解鎖故事':'Story not yet unlocked'}><span className="object-icon">🔒</span><span className="story-details"><b>0{i+1} / {lang==='zh'?'尚未解鎖':'LOCKED STORY'}</b><small>{lang==='zh'?'繼續挑戰 AI 連點，或直接閱讀':'Tap more in the AI Lab or choose to read directly'}</small></span></div>)}</div>
    </>:<div className="stories-hidden"><span>🔐</span><b>{lang==='zh'?'故事尚未解鎖':'STORIES ARE LOCKED'}</b><p>{lang==='zh'?'按下「開始遊戲」，或選擇直接閱讀故事。':'Start the mini-game to reveal the story cards, or use the reading shortcut.'}</p></div>}
    {completed&&<div className="achievement-unlocked"><Trophy size={24}/><div><b>{t.completed}</b><span>{tr(zone.trait,lang)}</span></div></div>}
    <button className="wide-back" onClick={goMap}>{t.back} <ArrowRight size={18}/></button>
   </section>}
      {screen==='ending'&&<section className="end-screen"><div className="end-stars">✦ &nbsp; ✧ &nbsp; ✦</div><Trophy size={46} className="end-trophy"/><p className="eyebrow">{t.finish}</p><h1>{t.summary}</h1><p className="end-line">{t.ending}</p><div className="achievement-list">{zones.map(z=><span key={z.id}><Check size={15}/> {tr(z.trait,lang)}</span>)}</div><p className="ending-tag">Started with Games. Built with AI. Always Learning.</p><button className="primary-cta" onClick={()=>setLinksOpen(true)}>{t.links}<ArrowRight size={19}/></button><button className="secondary-link" onClick={()=>setScreen('map')}>{t.revisit}</button><button className="restart-button" onClick={reset}><RotateCcw size={14}/>{t.again}</button></section>}
  </main>
  <footer className="site-footer"><span>© YUN · MADE WITH CURIOSITY</span><span><Sparkles size={12}/> PRESS START ON YOUR NEXT IDEA</span></footer>
  {activeStory&&<div className="overlay" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setActiveStory(null)}}><section className="dialogue-modal" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><div className="dialogue-bar"><span>✦ {t.dialogue} · {line+1}/{activeStory.lines[lang==='en'?0:1].length}</span><button className="close-modal" onClick={()=>setActiveStory(null)} aria-label={t.exit}><X size={18}/></button></div><div className="dialogue-person"><span className="object-icon big">{activeStory.emoji}</span><div><p>YUN’S JOURNAL</p><h2 id="dialog-title">{tr(activeStory.title,lang)}</h2></div></div><p className="dialogue-text" key={activeStory.id+line}>{activeStory.lines[lang==='en'?0:1][line]}</p><div className="dialogue-controls"><span className="dialogue-dots">{activeStory.lines[lang==='en'?0:1].map((_,i)=><i key={i} className={i===line?'active':''}/>)}</span><button className="dialogue-next" onClick={()=>{if(line<activeStory.lines[lang==='en'?0:1].length-1)setLine(l=>l+1);else finishStory()}}>{line<activeStory.lines[lang==='en'?0:1].length-1?t.continue:t.exit} <ArrowRight size={16}/></button></div></section></div>}
  {linksOpen&&<div className="overlay" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setLinksOpen(false)}}><section className="links-modal" role="dialog" aria-modal="true" aria-label={t.linkTitle}><div className="dialogue-bar"><span>✦ {t.linkTitle}</span><button className="close-modal" onClick={()=>setLinksOpen(false)} aria-label={t.exit}><X size={18}/></button></div><h2>LET’S CONNECT.</h2><p>{t.notready}</p><a className="external-link" href={github} target="_blank" rel="noopener noreferrer"><Github size={20}/> GitHub <ExternalLink size={16}/></a><div className="disabled-link"><BookOpen size={20}/>{t.portfolio}</div><a className="external-link" href={linkedin} target="_blank" rel="noopener noreferrer"><Code2 size={20}/> LinkedIn <ExternalLink size={16}/></a><button className="modal-return" onClick={()=>setLinksOpen(false)}><X size={15}/>{t.exit}</button></section></div>}
  {spaceOpen&&<SpaceQuest lang={lang} onClose={()=>setSpaceOpen(false)} onStart={()=>setGameStarted(true)} onWin={()=>setSpaceWon(true)}/>} 
  {sharkOpen&&<SharkMaze lang={lang} onClose={()=>setSharkOpen(false)} onStart={()=>setFieldStarted(true)} onWin={()=>setSharkWon(true)}/>} 
  {labOpen&&<LabClicker lang={lang} onClose={()=>setLabOpen(false)} onStart={()=>{}} onUnlock={tier=>setLabTier(old=>Math.max(old,tier))} initialTier={labTier}/>}
  <nav className="mobile-nav" aria-label="Navigation"><button onClick={()=>setScreen('home')} className={screen==='home'?'active':''}><Compass size={18}/>HOME</button><button onClick={()=>setScreen('map')} className={screen==='map'?'active':''}><Map size={18}/>MAP</button><button onClick={()=>setLinksOpen(true)}><ExternalLink size={18}/>LINKS</button></nav>
 </div>
}
export default App
