import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useThemeStore } from './store/themeStore';
import { useGeolocation } from './hooks/useGeolocation';
import { useWeather } from './hooks/useWeather';
import { getOrCreateSessionId } from './utils/session';
import { getWeatherTheme } from './utils/formatters';

// Layout
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BusinessNav } from './components/layout/BusinessNav';

// Pages
import { Dashboard } from './pages/Dashboard';
import { BusinessLanding } from './pages/business/BusinessLanding';
import { Warnings } from './pages/business/Warnings';
import { DataSuite } from './pages/business/DataSuite';
import { Forensics } from './pages/business/Forensics';
import { Advertising } from './pages/business/Advertising';
import { DeveloperApi } from './pages/business/DeveloperApi';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsOfService } from './pages/legal/TermsOfService';
import { CookieSettings } from './pages/legal/CookieSettings';
import { SupportCenter } from './pages/support/SupportCenter';

// Global Background
import { WeatherBackground } from './components/weather/WeatherBackground';

function App() {
  const { theme } = useThemeStore();

  // Ensure session ID exists before any API calls
  useEffect(() => { getOrCreateSessionId(); }, []);

  // Apply dark class to html element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Geolocation — auto-detect on load
  const geo = useGeolocation();

  // Active query state
  const [activeQuery, setActiveQuery] = useState<string>('');

  // Once geo resolves, set coord query; if denied/error, stay on empty state
  useEffect(() => {
    if (geo.status === 'success' && geo.coordQuery && !activeQuery) {
      setActiveQuery(geo.coordQuery);
    }
  }, [geo.status, geo.coordQuery, activeQuery]);

  // Weather data
  const { data, isLoading, isError, error, isFetching } = useWeather(activeQuery);

  // Weather theme for background
  const weatherTheme = data
    ? getWeatherTheme(data.current.condition.code, data.current.is_day)
    : 'night';

  function handleSearch(city: string) {
    setActiveQuery(city);
  }

  const todayHours = data?.forecast.forecastday[0]?.hour ?? [];

  return (
    <div className="min-h-screen flex flex-col bg-bg-base text-text-primary">
      {/* Dynamic animated background */}
      <WeatherBackground theme={weatherTheme} />

      {/* Toast notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: 'bg-bg-surface border border-border text-text-primary shadow-lg',
            description: 'text-text-secondary',
          },
        }}
      />

      {/* Secondary Business Navigation */}
      <BusinessNav />

      {/* Sticky header with Search Bar and Controls */}
      <Header onSearch={handleSearch} initialValue={data?.location.name ?? ''} />

      {/* Main dashboard content container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 flex flex-col">
        <Routes>
          <Route 
            path="/" 
            element={
              <Dashboard 
                geo={geo}
                activeQuery={activeQuery}
                setActiveQuery={setActiveQuery}
                data={data}
                isLoading={isLoading}
                isError={isError}
                error={error}
                isFetching={isFetching}
                handleSearch={handleSearch}
                todayHours={todayHours}
              />
            } 
          />
          {/* Business routes */}
          <Route path="/for-business" element={<BusinessLanding />} />
          <Route path="/for-business/warnings" element={<Warnings />} />
          <Route path="/for-business/data-suite" element={<DataSuite />} />
          <Route path="/for-business/forensics" element={<Forensics />} />
          <Route path="/advertising" element={<Advertising />} />
          <Route path="/developer-api" element={<DeveloperApi />} />
          
          {/* Legal & Support routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-settings" element={<CookieSettings />} />
          <Route path="/support" element={<SupportCenter />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
