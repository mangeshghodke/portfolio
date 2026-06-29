import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const services = [
  {
    icon: 'bi-laptop',
    title: 'Web Design',
    desc: 'I craft pixel-perfect, responsive designs that look stunning on every device. Using Figma and Adobe XD, I turn ideas into intuitive interfaces with a focus on mobile-first layouts and user experience.',
    features: [
      'Wireframing & Prototyping',
      'UI/UX Design',
      'Responsive & Mobile-First Layouts',
      'Design System Creation',
    ],
  },
  {
    icon: 'bi-code-square',
    title: 'Frontend Development',
    desc: 'Bringing designs to life with clean, performant code. I specialize in React, Vue, and vanilla JavaScript to build dynamic, fast-loading interfaces with CMS and business tools integration.',
    features: [
      'React / Next.js / Vue',
      'Bootstrap & Tailwind CSS',
      'CMS & Blog Integration',
      'Contact Forms & Business Tools',
      'API Integration',
      'State Management',
    ],
  },
  {
    icon: 'bi-server',
    title: 'Backend & API Development',
    desc: 'Robust server-side solutions that power your applications. From RESTful APIs to admin dashboards and custom integrations, I build secure and scalable backends.',
    features: [
      'Node.js / Express',
      'PHP / Laravel',
      'Database Design (SQL & NoSQL)',
      'Admin Dashboard Development',
      'REST & GraphQL APIs',
      'Custom Integrations',
    ],
  },
  {
    icon: 'bi-phone',
    title: 'E-Commerce Solutions',
    desc: 'End-to-end online stores with secure payments, inventory management, and admin dashboards. From basic stores (up to 20 products) to full enterprise suites with unlimited products.',
    features: [
      'Shopify / WooCommerce',
      'Custom Storefronts',
      'Basic Store (Up to 20 Products)',
      'Full Enterprise Suite',
      'Payment Gateway Integration',
      'Inventory & Order Management',
    ],
  },
  {
    icon: 'bi-speedometer2',
    title: 'SEO & Performance',
    desc: 'Optimize your site for speed and search engines. I implement best practices for Core Web Vitals, meta tags, and technical SEO to boost rankings and drive traffic.',
    features: [
      'Page Speed Optimization',
      'Technical SEO Audit',
      'Structured Data (Schema)',
      'Google Analytics & Reports',
    ],
  },
  {
    icon: 'bi-share',
    title: 'Digital Business Tools',
    desc: 'Essential tools to connect with your customers and grow your online presence. Contact forms, messaging, maps, and social integrations — everything a modern business needs.',
    features: [
      'Custom Contact Forms',
      'WhatsApp / Click-to-Call',
      'Google Maps Embed',
      'Social Media Links',
      'Google Analytics Setup',
    ],
  },
  {
    icon: 'bi-gear',
    title: 'Maintenance & Support',
    desc: 'Ongoing support to keep your website secure, updated, and running smoothly. Regular backups, security patches, and priority support with a dedicated project manager available.',
    features: [
      'Regular Backups & Security Updates',
      'Content Updates',
      'Domain & Hosting Assistance',
      'Priority Support (24/7)',
      'Dedicated Project Manager',
    ],
  },
];

export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Web design, frontend, backend, e-commerce, SEO, and maintenance services by Mangesh Ghodke."
        path="/services"
      />
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
                            <i className="bi bi-check2 text-warning me-2"></i>
                            {f}
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
          <p className="mb-4">Let&apos;s discuss your idea and turn it into reality.</p>
          <Link to="/#contact" className="btn btn-dark btn-lg">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
