import { Link } from 'react-router-dom';
import { Cloud } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-bg-surface/40 backdrop-blur-md border-t border-border mt-12 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-accent text-accent-foreground shadow-md shadow-accent/15">
              <Cloud className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold tracking-tight text-text-primary">
              Nimbus
            </span>
          </div>
          <p className="text-xs text-text-secondary max-w-sm leading-relaxed">
            Nimbus is a premium weather intelligence dashboard offering hyper-local forecasts, smart atmospheric suggestions, and historical analytics.
          </p>
          <div className="flex items-center gap-2 pt-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </div>

        {/* Resources column */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-primary">
            Data Sources
          </p>
          <ul className="space-y-2 text-xs text-text-secondary">
            <li>
              <a
                href="https://www.weatherapi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                WeatherAPI Docs
              </a>
            </li>
            <li>
              <Link to="/for-business/data-suite" className="hover:text-accent transition-colors">
                Sensor Feeds
              </Link>
            </li>
            <li>
              <Link to="/developer-api" className="hover:text-accent transition-colors">
                Developer API
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-accent transition-colors">
                Support Center
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal/Info column */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-primary">
            Legal & Tech
          </p>
          <ul className="space-y-2 text-xs text-text-secondary">
            <li>
              <Link to="/privacy-policy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/cookie-settings" className="hover:text-accent transition-colors">
                Cookie Settings
              </Link>
            </li>
            <li className="pt-1">
              <span className="inline-block text-[10px] bg-bg-elevated/70 px-2 py-0.5 rounded text-text-secondary border border-border">
                v1.2.0 · React 19
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto border-t border-border/40 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <p className="text-[11px] text-text-secondary">
          &copy; {new Date().getFullYear()} Nimbus Weather. All rights reserved.
        </p>
        <p className="text-[11px] text-text-secondary">
          Powered by{' '}
          <a
            href="https://www.weatherapi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-semibold hover:underline"
          >
            WeatherAPI.com
          </a>
        </p>
      </div>
    </footer>
  );
}
