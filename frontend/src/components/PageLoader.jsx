import { useEffect, useState } from 'react'
import './PageLoader.css'

export default function PageLoader({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        const next = prev + Math.floor(Math.random() * 8) + 4
        return next > 100 ? 100 : next
      })
    }, 60)

    const timer = setTimeout(() => {
      setIsFadingOut(true)
      setTimeout(() => {
        setIsDone(true)
        if (onFinish) onFinish()
      }, 600)
    }, 2400)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [onFinish])

  if (isDone) return null

  return (
    <div className={`page-loader-overlay ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="loader-ambient-glow" />
      <div className="loader-stars-container">
        <div className="loader-shockwave" />
        <div className="loader-orbit-wrapper">
          <div className="star-wing star-wing-1">
            <svg className="star-svg star-blue" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="star-wing star-wing-2">
            <svg className="star-svg star-purple" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="loader-content">
        <div className="loader-brand">
          <span className="loader-brand-title">KAHN</span>
          <span className="loader-brand-dot">.</span>
        </div>
        <div className="loader-status">
          <span className="loader-text">LOADING</span>
          <span className="loader-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
          <span className="loader-percent">{progress}%</span>
        </div>
        <div className="loader-progress-track">
          <div className="loader-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
