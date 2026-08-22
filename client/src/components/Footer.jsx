import './Footer.css'

function Footer() {
  return (
    <footer id="about" className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-logo">Job<span>Track</span></p>
          <p className="footer-tagline">Track your applications. Manage your career.</p>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} JobTrack. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer