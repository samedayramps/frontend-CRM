import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import ErrorBoundary from './components/ErrorBoundary';
import DashboardPage from './pages/DashboardPage';
import RentalRequestsPage from './pages/RentalRequestsPage';
import RentalRequestDetailsPage from './pages/RentalRequestDetailsPage';
import QuotesPage from './pages/QuotesPage';
import QuoteDetailsPage from './pages/QuoteDetailsPage';
import QuoteAcceptancePage from './pages/QuoteAcceptancePage';
import CustomersPage from './pages/CustomersPage';
import CustomerDetailsPage from './pages/CustomerDetailsPage';
import SettingsPage from './pages/SettingsPage';
import JobsPage from './pages/JobsPage';
import JobDetailsPage from './pages/JobDetailsPage';
import JobCreationPage from './pages/JobCreationPage';

const AppContent: React.FC = () => {
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!window.google && !document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]')) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsGoogleMapsLoaded(true);
      document.head.appendChild(script);
    } else {
      setIsGoogleMapsLoaded(true);
    }
  }, []);

  if (!isGoogleMapsLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  const showNavBar = !location.pathname.includes('/quotes/') || !location.pathname.includes('/accept');

  return (
    <ErrorBoundary>
      {showNavBar && <NavBar />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/rental-requests" element={<RentalRequestsPage />} />
          <Route path="/rental-requests/new" element={<RentalRequestDetailsPage />} />
          <Route path="/rental-requests/:id" element={<RentalRequestDetailsPage />} />
          <Route path="/quotes" element={<QuotesPage />} />
          <Route path="/quotes/:id" element={<QuoteDetailsPage />} />
          <Route path="/quotes/new" element={<QuoteDetailsPage />} />
          <Route path="/quotes/:id/accept" element={<QuoteAcceptancePage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customers/new" element={<CustomerDetailsPage />} />
          <Route path="/customers/:id" element={<CustomerDetailsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/new" element={<JobCreationPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;