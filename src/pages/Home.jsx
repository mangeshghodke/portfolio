import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [status, setStatus] = useState('');

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const data = new FormData(e.target);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_name: data.get('user_name'),
          user_email: data.get('user_email'),
          message: data.get('message'),
        }),
      });

      if (!res.ok) throw new Error();

      setStatus('success');
      e.target.reset();
    } catch {
      setStatus('error');
    }
  };
  return (
    <>
      {/* Hero */}
      <section id="home" className="hero d-flex align-items-center">
        <div className="container text-center text-white">
          <h1 className="display-3 fw-bold">I Build <span className="text-warning">Web Experiences</span></h1>
          <p className="lead mt-3">Full-stack web developer crafting modern, fast, and scalable websites.</p>
          <Link to="/services" className="btn btn-warning btn-lg mt-3">View Services</Link>
          <a href="#contact" className="btn btn-outline-light btn-lg mt-3 ms-2">Hire Me</a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600"
                alt="Developer workspace"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold">About Me</h2>
              <p className="lead">
                Hi, I'm Mangesh — a professional web developer with 5+ years of experience building digital solutions for startups and enterprises.
              </p>
              <p>
                I specialize in creating responsive, user-centric websites using modern technologies like React, Node.js, and Laravel. I believe in writing clean code that drives business growth.
              </p>
              <div className="row mt-4">
                <div className="col-6">
                  <h5><i className="bi bi-check-circle-fill text-warning"></i> 50+ Projects</h5>
                </div>
                <div className="col-6">
                  <h5><i className="bi bi-check-circle-fill text-warning"></i> 30+ Clients</h5>
                </div>
                <div className="col-6 mt-2">
                  <h5><i className="bi bi-check-circle-fill text-warning"></i> 5+ Years Exp</h5>
                </div>
                <div className="col-6 mt-2">
                  <h5><i className="bi bi-check-circle-fill text-warning"></i> 24/7 Support</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Services I Offer</h2>
            <p className="text-muted">From idea to launch — I handle it all.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card service-card h-100 border-0 shadow text-center p-4">
                <i className="bi bi-laptop display-4 text-warning"></i>
                <h5 className="mt-3">Web Design</h5>
                <p className="text-muted">Modern, responsive, and accessible UI/UX design for all devices.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card service-card h-100 border-0 shadow text-center p-4">
                <i className="bi bi-code-square display-4 text-warning"></i>
                <h5 className="mt-3">Frontend Dev</h5>
                <p className="text-muted">Interactive interfaces with React, Vue, Bootstrap, and vanilla JS.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card service-card h-100 border-0 shadow text-center p-4">
                <i className="bi bi-server display-4 text-warning"></i>
                <h5 className="mt-3">Backend Dev</h5>
                <p className="text-muted">Scalable APIs and server logic with Node.js, PHP, and Python.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card service-card h-100 border-0 shadow text-center p-4">
                <i className="bi bi-phone display-4 text-warning"></i>
                <h5 className="mt-3">E-Commerce</h5>
                <p className="text-muted">Full online stores with payment gateways, inventory, and dashboards.</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/services" className="btn btn-warning btn-lg">View All Services</Link>
            <Link to="/pricing" className="btn btn-outline-dark btn-lg ms-2">See Pricing</Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-5 bg-dark text-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Get In Touch</h2>
            <p className="text-white-50">Have a project in mind? Let's talk.</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <form onSubmit={sendEmail}>
                <div className="mb-3">
                  <input type="text" name="user_name" className="form-control" placeholder="Your Name" required />
                </div>
                <div className="mb-3">
                  <input type="email" name="user_email" className="form-control" placeholder="Your Email" required />
                </div>
                <div className="mb-3">
                  <textarea name="message" className="form-control" rows="5" placeholder="Your Message" required></textarea>
                </div>
                <button type="submit" className="btn btn-warning w-100" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
              {status === 'success' && (
                <p className="mt-3 text-success text-center">Thanks! I'll get back to you shortly.</p>
              )}
              {status === 'error' && (
                <p className="mt-3 text-danger text-center">Something went wrong. Please try again.</p>
              )}
            </div>
          </div>
          <div className="row mt-5 text-center">
            <div className="col-md-4">
              <i className="bi bi-geo-alt fs-3 text-warning"></i>
              <p className="mt-2">Pune, India</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-envelope fs-3 text-warning"></i>
              <p className="mt-2">hello@mangesh.dev</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-phone fs-3 text-warning"></i>
              <p className="mt-2">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
