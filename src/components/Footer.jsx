import { useEffect, useState } from 'react';

export default function Footer() {
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    fetch('https://api.countapi.xyz/hit/mangeshghodke/portfolio')
      .then((res) => res.json())
      .then((data) => setVisitors(data.value))
      .catch(() => setVisitors('—'));
  }, []);

  return (
    <footer className="bg-black text-white-50 py-3">
      <div className="container d-flex flex-wrap align-items-center justify-content-between gap-2">
        <p className="mb-0">&copy; 2026 Mangesh Ghodke. All rights reserved.</p>
        <small>
          <a href="mailto:ghodkemangesh93@gmail.com" className="text-white-50 text-decoration-none">
            ghodkemangesh93@gmail.com
          </a>
        </small>
        <small>Visitors: {visitors ?? '...'}</small>
      </div>
    </footer>
  );
}
