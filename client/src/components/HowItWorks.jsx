import './HowItWorks.css'

const steps = [
  { number: '01', title: 'Add', description: 'Add your job application details.' },
  { number: '02', title: 'Track', description: 'Update the status as your application progresses.' },
  { number: '03', title: 'Succeed', description: 'Stay organized and move closer to your next opportunity.' },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <div className="section-heading">
          <h2>How it works</h2>
          <p>Three simple steps to a more organized job search.</p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <div className="step-card" key={step.number}>
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks