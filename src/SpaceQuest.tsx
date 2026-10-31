import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, RotateCcw, X } from 'lucide-react'

type Lang = 'en' | 'zh'
type Props = { lang: Lang; onClose: () => void; onWin: () => void }
const maxWaves = 10

export default function SpaceQuest({ lang, onClose, onWin }: Props) {
  const zh = lang === 'zh'
  const [lane, setLane] = useState(1)
  const laneRef = useRef(1)
  const [rock, setRock] = useState<number | null>(null)
  const [wave, setWave] = useState(0)
  const [hearts, setHearts] = useState(3)
  const [status, setStatus] = useState<'ready' | 'running' | 'won' | 'lost'>('ready')
  const [flash, setFlash] = useState(false)
  const statusRef = useRef(status)
  const [gameNumber, setGameNumber] = useState(0)
  const move = (direction: -1 | 1) => {
    if (statusRef.current !== 'running') return
    const next = Math.max(0, Math.min(2, laneRef.current + direction))
    laneRef.current = next
    setLane(next)
  }
  const start = () => {
    laneRef.current = 1
    setLane(1)
    setHearts(3)
    setWave(0)
    setRock(null)
    setFlash(false)
    statusRef.current = 'running'
    setStatus('running')
    setGameNumber(n => n + 1)
  }
  useEffect(() => { statusRef.current = status }, [status])
  useEffect(() => {
    if (status !== 'running') return
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') { e.preventDefault(); move(-1) }
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') { e.preventDefault(); move(1) }
    }
    window.addEventListener('keydown', key)
    let ticks = 0
    let health = 3
    const interval = window.setInterval(() => {
      ticks += 1
      const fallingLane = Math.floor(Math.random() * 3)
      setRock(fallingLane)
      setWave(ticks)
      if (fallingLane === laneRef.current) {
        health -= 1
        setHearts(health)
        setFlash(true)
      } else setFlash(false)
      if (health <= 0) {
        statusRef.current = 'lost'
        setStatus('lost')
        window.clearInterval(interval)
      } else if (ticks >= maxWaves) {
        statusRef.current = 'won'
        setStatus('won')
        window.clearInterval(interval)
        onWin()
      }
    }, 1000)
    return () => { window.clearInterval(interval); window.removeEventListener('keydown', key) }
    // gameNumber represents each explicit play session.
  }, [gameNumber, status, onWin])
  return <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
    <section className="space-quest" role="dialog" aria-modal="true" aria-labelledby="quest-title">
      <header className="space-titlebar"><span>🚀 MINI QUEST / 001</span><button onClick={onClose} aria-label={zh ? '關閉遊戲' : 'Close game'}><X size={18}/></button></header>
      <h2 id="quest-title">{zh ? '太空船躲避挑戰' : 'SPACESHIP DODGE'}</h2>
      <p>{zh ? '這是向我的第一個程式作業致敬的小遊戲。左右移動，躲過 10 波隕石！' : 'A tiny tribute to my first coding project. Move left or right and dodge 10 meteor waves!'}</p>
      <div className="space-stats"><span>HP {'♥'.repeat(hearts)}{'♡'.repeat(3 - hearts)}</span><span>WAVE {wave}/{maxWaves}</span></div>
      <div className={'space-board ' + (flash ? 'space-flash' : '')} aria-label={zh ? '三條太空航道' : 'Three space lanes'}>
        <div className="space-galaxy" aria-hidden="true">· ✦ · · ✧ · ✦ · · ✦ · ✧ ·</div>
        {Array.from({ length: 3 }, (_, i) => <div key={i} className="space-lane">
          {rock === i && status !== 'ready' && <span className="space-meteor" aria-hidden="true">☄</span>}
          {lane === i && <span className="space-ship" aria-label={zh ? '你的太空船' : 'Your spaceship'}>🚀</span>}
        </div>)}
        {status !== 'running' && <div className="space-message">
          <strong>{status === 'ready' ? 'READY PLAYER ONE?' : status === 'won' ? (zh ? '任務完成！' : 'QUEST COMPLETE!') : (zh ? '太空船受損！' : 'SHIP DOWN!')}</strong>
          {status === 'won' && <small>{zh ? '恭喜！你完成了太空船挑戰。' : 'You survived the asteroid field.'}</small>}
        </div>}
      </div>
      <div className="space-controls">
        <button onClick={() => move(-1)} disabled={status !== 'running'} aria-label={zh ? '向左' : 'Move left'}><ArrowLeft/> {zh ? '左' : 'LEFT'}</button>
        <button onClick={() => move(1)} disabled={status !== 'running'} aria-label={zh ? '向右' : 'Move right'}>{zh ? '右' : 'RIGHT'} <ArrowRight/></button>
      </div>
      {status !== 'running' && <button className="space-start" onClick={start}>{status === 'ready' ? (zh ? '開始遊戲' : 'START GAME') : <><RotateCcw size={16}/>{zh ? '再玩一次' : 'PLAY AGAIN'}</>}</button>}
      <button className="space-skip" onClick={onClose}>{zh ? '返回故事（可略過遊戲）' : 'BACK TO STORIES (SKIP)'}</button>
      <p className="space-tip">{zh ? '鍵盤 ← → 或 A / D；手機使用下方按鈕。遊戲不影響履歷與成就解鎖。' : 'Use ← → or A / D on keyboard, or the on-screen controls. This mini-game is optional.'}</p>
    </section>
  </div>
}
