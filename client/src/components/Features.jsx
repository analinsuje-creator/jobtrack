import './Features.css'

const features = [
  {
    title: 'Application Tracking',
    description: 'Keep all your job applications organized in one place.',
    icon: '📋',
  },
  {
    title: 'Interview Management',
    description: 'Track upcoming interviews and interview details.',
    icon: '🗓️',
  },
  {
    title: 'Follow-up Tracking',
    description: 'Never forget when to follow up with a company.',
    icon: '🔔',
  },
  {
    title: 'Career Analytics',
    description: 'Understand your job search with simple statistics.',
    icon: '📊',
  },
]

function Features() {
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-heading">
          <h2>Everything you need to job hunt smarter</h2>
          <p>Simple tools that keep your search organized from application to offer.</p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features