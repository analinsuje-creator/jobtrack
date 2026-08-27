import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-mesh" aria-hidden="true"></div>
      <div className="container hero-inner">
        <div className="hero-text">
          <span className="hero-eyebrow">For job seekers, by job seekers</span>
          <h1>
            Your job search,
            <br />
            <span className="hero-gradient-text">finally organized.</span>
          </h1>
          <p>
            Stop tracking applications across spreadsheets and sticky notes.
            JobTrack brings every application, interview, and follow-up into
            one clear view.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-glow">Get Started — it's free</Link>
            <a href="#how-it-works" className="btn btn-ghost">See how it works</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-aura" aria-hidden="true"></div>

          <div className="scatter-card scatter-1">
            <span className="scatter-dot scatter-dot-warn"></span>
            Figma — Applied
          </div>
          <div className="scatter-card scatter-2">
            <span className="scatter-dot scatter-dot-info"></span>
            Stripe — Interview
          </div>
          <div className="scatter-card scatter-3">
            <span className="scatter-dot scatter-dot-danger"></span>
            Notion — Rejected
          </div>

          <div className="glass-panel hero-dashboard">
            <div className="hero-dashboard-header">
              <span className="hero-live-badge">
                <span className="hero-live-dot"></span> LIVE OVERVIEW
              </span>
            </div>

            <div className="hero-stat-grid">
              <div className="hero-stat-tile">
                <span className="hero-stat-icon hero-stat-icon-a">📋</span>
                <div>
                  <p className="hero-stat-num">24</p>
                  <p className="hero-stat-label">Applications</p>
                </div>
              </div>
              <div className="hero-stat-tile">
                <span className="hero-stat-icon hero-stat-icon-b">🎯</span>
                <div>
                  <p className="hero-stat-num">6</p>
                  <p className="hero-stat-label">Interviews</p>
                </div>
              </div>
            </div>

            <div className="hero-activity-row">
              <div>
                <p className="hero-activity-title">Google — Frontend Engineer</p>
                <p className="hero-activity-sub">Follow-up in 2 days</p>
              </div>
              <span className="hero-pill">Interview</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero