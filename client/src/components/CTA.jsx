import { Link } from 'react-router-dom'
import './CTA.css'

function CTA() {
  return (
    <section className="cta">
      <div className="container cta-inner">
        <h2>Take control of your job search.</h2>
        <Link to="/register" className="btn btn-primary">Start Tracking</Link>
      </div>
    </section>
  )
}

export default CTA