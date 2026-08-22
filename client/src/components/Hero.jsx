import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <span className="hero-badge">For job seekers, by job seekers</span>
          <h1>Your job search, organized.</h1>
          <p>
            Track applications, manage interviews, remember follow-ups, and
            stay organized throughout your job search.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-outline">Sign In</Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card hero-card-main">
            <div className="hero-card-header">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="hero-stat-row">
              <div className="hero-stat">
                <p className="hero-stat-number">24</p>
                <p className="hero-stat-label">Applications</p>
              </div>
              <div className="hero-stat">
                <p className="hero-stat-number">6</p>
                <p className="hero-stat-label">Interviews</p>
              </div>
            </div>
            <div className="hero-bar-list">
              <div className="hero-bar"><span style={{ width: '80%' }}></span></div>
              <div className="hero-bar"><span style={{ width: '55%' }}></span></div>
              <div className="hero-bar"><span style={{ width: '65%' }}></span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero