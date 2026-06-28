import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';

function renderApp(initialRoute = '/portfolio/') {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[initialRoute]} basename="/portfolio">
        <App />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe('App', () => {
  it('renders navbar with brand name', () => {
    renderApp();
    expect(screen.getByRole('link', { name: /Mangesh Ghodke/i })).toBeInTheDocument();
  });

  it('renders footer with copyright', () => {
    renderApp();
    expect(screen.getByText(/2026 Mangesh Ghodke/i)).toBeInTheDocument();
  });

  it('renders home page by default', () => {
    renderApp();
    expect(screen.getByText(/I Build/i)).toBeInTheDocument();
  });

  it('renders services page', () => {
    renderApp('/portfolio/services');
    expect(screen.getByText(/My Services/i)).toBeInTheDocument();
  });

  it('renders pricing page', () => {
    renderApp('/portfolio/pricing');
    expect(screen.getByText(/Pricing Plans/i)).toBeInTheDocument();
  });
});
