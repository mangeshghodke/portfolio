import { Link } from 'react-router-dom';

const services = [
  {
    icon: 'bi-laptop',
    title: 'Web Design',
    desc: 'I craft pixel-perfect, responsive designs that look stunning on every device. Using Figma and Adobe XD, I turn ideas into intuitive interfaces with a focus on user experience and accessibility.',
    features: ['Wireframing & Prototyping', 'UI/UX Design', 'Responsive Layouts', 'Design System Creation'],
  },
  {
    icon: 'bi-code-square',
    title: 'Frontend Development',
    desc: 'Bringing designs to life with clean, performant code. I specialize in React, Vue, and vanilla JavaScript to build dynamic, fast-loading interfaces.',
    features: ['React / Next.js / Vue', 'Bootstrap & Tailwind CSS', 'API Integration', 'State Management'],
  },
  {
    icon: 'bi-server',
    title: 'Backend Development',
    desc: 'Robust server-side solutions that power your applications. From RESTful APIs to full authentication systems, I build secure and scalable backends.',
    features: ['Node.js / Express', 'PHP / Laravel', 'Database Design (SQL & NoSQL)', 'REST & GraphQL APIs'],
  },
  {
    icon: 'bi-phone',
    title: 'E-Commerce Solutions',
    desc: 'End-to-end online stores with secure payments, inventory management, and admin dashboards. I use Shopify, WooCommerce, and custom builds.',
    features: ['Shopify / WooCommerce', 'Custom Storefronts', 'Payment Gateway Integration', 'Inventory & Order Management'],
  },
  {
    icon: 'bi-speedometer2',
    title: 'SEO & Performance',
    desc: 'Optimize your site for speed and search engines. I implement best practices for Core Web Vitals, meta tags, and technical SEO to boost rankings.',
    features: ['Page Speed Optimization', 'Technical SEO Audit', 'Structured Data (Schema)', 'Analytics Setup'],
  },
  {
    icon: 'bi-gear',
    title: 'Maintenance & Support',
    desc: 'Ongoing support to keep your website secure, updated, and running smoothly. Regular backups, security patches, and feature updates included.',
    features: ['Regular Backups', 'Security Updates', 'Content Updates', '24/7 Monitoring'],
  },
];

export default function Services() {
  return (
    <>
      <section className="page-header d-flex align-items-center">
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold">My Services</h1>
          <p className="lead">Comprehensive web development solutions tailored to your needs.</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {services.map((s, i) => (
              <div className="col-lg-6" key={i}>
                <div className="card border-0 shadow p-4 h-100">
                  <div className="d-flex align-items-start gap-3">
                    <i className={`bi ${s.icon} fs-1 text-warning`}></i>
                    <div>
                      <h4>{s.title}</h4>
                      <p className="text-muted">{s.desc}</p>
                      <ul className="list-unstyled">
                        {s.features.map((f, j) => (
                          <li key={j}>
                            <i className="bi bi-check2 text-warning me-2"></i>{f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-warning">
        <div className="container text-center">
          <h2 className="fw-bold">Ready to Start Your Project?</h2>
          <p className="mb-4">Let's discuss your idea and turn it into reality.</p>
          <a href="/#contact" className="btn btn-dark btn-lg">Get in Touch</a>
        </div>
      </section>
    </>
  );
}
