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
          {/* Twin Reaping Scythe Blades converging and spinning */}
          <div className="star-wing star-wing-1">
            <svg className="star-svg star-scythe-upper" viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="scythe-edge-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffedd5" />
                  <stop offset="30%" stopColor="#fb923c" />
                  <stop offset="70%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#be123c" />
                </linearGradient>
              </defs>
              <path
                d="M78 18 C72 22, 65 20, 58 17 C55 13, 48 13, 44 16 C40 13, 34 16, 30 19 C24 23, 18 29, 13 37 C10 42, 8 47, 8 50 C11 48, 16 43, 22 39 C30 34, 40 31, 52 31 C62 31, 71 35, 76 43 C80 49, 81 55, 78 60 C83 52, 84 41, 80 32 C84 30, 83 24, 78 18 Z"
                fill="#1f0714"
                stroke="url(#scythe-edge-1)"
                strokeWidth="2.4"
              />
              <path
                d="M78 18 L74 24 L69 20 L64 25 L58 18 L52 23 L46 17 L40 22 L32 20 L24 28 L17 37 L8 50"
                stroke="url(#scythe-edge-1)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 50 C14 44, 24 38, 35 34 C47 30, 58 31, 68 35 C75 39, 80 46, 78 60"
                stroke="#ffedd5"
                strokeWidth="3.4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="star-wing star-wing-2">
            <svg className="star-svg star-scythe-lower" viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="scythe-edge-2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffedd5" />
                  <stop offset="30%" stopColor="#fb923c" />
                  <stop offset="70%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#be123c" />
                </linearGradient>
              </defs>
              <path
                d="M22 82 C28 78, 35 80, 42 83 C45 87, 52 87, 56 84 C60 87, 66 84, 70 81 C76 77, 82 71, 87 63 C90 58, 92 53, 92 50 C89 52, 84 57, 78 61 C70 66, 60 69, 48 69 C38 69, 29 65, 24 57 C20 51, 19 45, 22 40 C17 48, 16 59, 20 68 C16 70, 17 76, 22 82 Z"
                fill="#1f0714"
                stroke="url(#scythe-edge-2)"
                strokeWidth="2.4"
              />
              <path
                d="M22 82 L26 76 L31 80 L36 75 L42 82 L48 77 L54 83 L60 78 L68 80 L76 72 L83 63 L92 50"
                stroke="url(#scythe-edge-2)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M92 50 C86 56, 76 62, 65 66 C53 70, 42 69, 32 65 C25 61, 20 54, 22 40"
                stroke="#ffedd5"
                strokeWidth="3.4"
                strokeLinecap="round"
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
          <span className="loader-text">INITIALIZING AUDIT ENGINE</span>
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
