import { useEffect, useState } from 'react';

export default function Footer() {
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    fetch('https://contact-form.ghodke-mangesh2.workers.dev/counter')
      .then((res) => res.json())
      .then((data) => setVisitors(data.count))
      .catch(() => setVisitors('—'));
  }, []);

  return (
    <footer className="bg-black text-white-50 py-3">
      <div className="container position-relative text-center">
        <p className="mb-0">&copy; 2026 Mangesh Ghodke. All rights reserved.</p>
        <small className="position-absolute end-0 top-50 translate-middle-y d-none d-md-inline">
          Visitors: {visitors ?? '...'}
        </small>
        <small className="d-md-none d-block mt-1">Visitors: {visitors ?? '...'}</small>
      </div>
    </footer>
  );
}
