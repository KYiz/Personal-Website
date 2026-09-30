import { useEffect, useState } from 'react'
import { categories, type Language } from './data'
import { label } from './ui'

export default function LoadingIntro({ lang, onComplete }: { lang: Language; onComplete: (done: boolean) => void }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    // Replay on each page load; cached assets should not skip the intro.
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const duration = 3000
    const started = performance.now()
    const assets = [...new Set(['./visuals/hero.webp', ...categories.map(c => c.image)])]
    let completed = 0
    let finished = false
    let dismissTimer: number | undefined
    const images = assets.map(src => {
      const image = new Image()
      image.onload = image.onerror = () => { completed++ }
      image.src = src
      return image
    })
    const interval = window.setInterval(() => {
      const elapsed = performance.now() - started
      const ready = completed === assets.length || elapsed >= 8000
      if (elapsed >= duration && ready && !finished) {
        finished = true
        setProgress(100)
        window.clearInterval(interval)
        dismissTimer = window.setTimeout(() => onComplete(true), 500)
      } else if (!finished) {
        // This is intro progress, not a measurement of download bytes.
        setProgress(Math.min(99, Math.floor(elapsed / duration * 100)))
      }
    }, 30)
    return () => {
      document.body.style.overflow = originalOverflow
      window.clearInterval(interval)
      window.clearTimeout(dismissTimer)
      images.forEach(image => { image.onload = image.onerror = null })
    }
  }, [onComplete])
  return (
    <div className="loading-intro" aria-label={label(lang, 'Loading portfolio', '正在加载作品集')}>
      <span>{label(lang, 'LOADING PORTFOLIO', '加载作品集')}</span>
      <strong aria-hidden="true">{progress}<i>%</i></strong>
      <div className="loading-track" role="progressbar" aria-valuemin={0} aria-valuemax={100}
        aria-valuenow={progress} aria-label={label(lang, 'Intro progress', '开场进度')}>
        <div style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
