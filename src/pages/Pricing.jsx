import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const plans = [
  {
    name: 'Basic',
    icon: 'bi-file-earmark-code',
    price: '₹999',
    subtitle: 'one-time',
    desc: 'Ideal for landing pages & personal portfolios',
    popular: false,
    features: [
      { text: 'Single-Page Static Website', included: true },
      { text: 'Responsive Design', included: true },
      { text: 'Social Media Links', included: true },
      { text: 'Basic SEO Setup', included: false },
      { text: 'Contact Form', included: false },
      { text: 'Custom Domain', included: false },
      { text: 'E-Commerce', included: false },
    ],
  },
  {
    name: 'Starter',
    icon: 'bi-globe2',
    price: '₹5,999',
    subtitle: 'one-time',
    desc: 'Perfect for small businesses & personal sites',
    popular: false,
    features: [
      { text: '3-Page Responsive Website', included: true },
      { text: 'Basic SEO Setup', included: true },
      { text: 'Contact Form', included: true },
      { text: 'Social Media Integration', included: true },
      { text: 'Free Domain (1 Year)', included: false },
      { text: 'E-Commerce', included: false },
      { text: 'Admin Dashboard', included: false },
    ],
  },
  {
    name: 'Business',
    icon: 'bi-rocket-takeoff',
    price: '₹24,999',
    subtitle: 'one-time',
    desc: 'Ideal for growing companies & startups',
    popular: true,
    features: [
      { text: '10-Page Responsive Website', included: true },
      { text: 'Free Domain (1 Year) + Hosting', included: true },
      { text: 'Advanced SEO Setup', included: true },
      { text: 'Blog / CMS Integration', included: true },
      { text: 'Custom Contact Forms', included: true },
      { text: 'Basic E-Commerce', included: true },
      { text: 'Admin Dashboard', included: false },
    ],
  },
  {
    name: 'Enterprise',
    icon: 'bi-buildings',
    price: '₹49,999+',
    subtitle: 'starting at',
    desc: 'For large-scale applications & platforms',
    popular: false,
    features: [
      { text: 'Unlimited Pages', included: true },
      { text: 'Custom Web Application', included: true },
      { text: 'Full E-Commerce Suite', included: true },
      { text: 'Admin Dashboard', included: true },
      { text: 'API Development', included: true },
      { text: 'Priority Support (24/7)', included: true },
      { text: 'Dedicated Project Manager', included: true },
    ],
  },
];

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'A standard 5-page website takes 1-2 weeks. More complex projects like e-commerce or web apps range from 3-8 weeks depending on requirements.',
  },
  {
    q: 'Do you provide hosting and domain?',
    a: 'Yes, the Business and Enterprise plans include hosting and domain. For the Starter plan, I can recommend affordable providers and help you set up.',
  },
  {
    q: 'Can I update the website myself after launch?',
    a: 'Absolutely. I build websites with easy-to-use CMS options so you can update content without any technical knowledge.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'I accept bank transfers, UPI, PayPal, and Razorpay. A 50% advance is required to start, with the remaining 50% due on completion.',
  },
];

export default function Pricing() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <>
      <SEO
        title="Pricing"
        description="Transparent web development pricing. Basic single-page sites at ₹1,000 to enterprise solutions."
        path="/pricing"
      />
      <section className="page-header d-flex align-items-center">
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold">Pricing Plans</h1>
          <p className="lead">
            Transparent pricing. No hidden fees. Pick the plan that fits your project.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {plans.map((p, i) => (
              <div className="col-lg-3 col-md-6" key={i}>
                <div
                  className={`card pricing-card border-0 shadow text-center p-4 ${p.popular ? 'popular' : ''}`}
                >
                  {p.popular && <div className="popular-badge">Most Popular</div>}
                  <div className="pricing-icon">
                    <i className={`bi ${p.icon}`}></i>
                  </div>
                  <h3 className="fw-bold mt-3">{p.name}</h3>
                  <p className="text-muted">{p.desc}</p>
                  <h2 className="fw-bold text-warning">{p.price}</h2>
                  <small className="text-muted">{p.subtitle}</small>
                  <hr />
                  <ul className="list-unstyled text-start mt-3">
                    {p.features.map((f, j) => (
                      <li key={j} className={`mb-2 ${f.included ? '' : 'text-muted'}`}>
                        <i
                          className={`bi ${f.included ? 'bi-check2-circle text-warning' : 'bi-x-circle'} me-2`}
                        ></i>
                        {f.text}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/#contact"
                    className={`btn w-100 mt-3 ${p.popular ? 'btn-warning' : 'btn-outline-warning'}`}
                  >
                    {p.name === 'Enterprise' ? 'Contact Us' : 'Get Started'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Frequently Asked Questions</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                {faqs.map((faq, i) => (
                  <div className="accordion-item" key={i}>
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${i !== openIdx ? 'collapsed' : ''}`}
                        type="button"
                        onClick={() => setOpenIdx(i === openIdx ? -1 : i)}
                      >
                        {faq.q}
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${i === openIdx ? 'show' : ''}`}>
                      <div className="accordion-body">{faq.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
