import { Link } from 'react-router-dom';

export function BusinessNav() {
  return (
    <nav className="w-full bg-black border-b border-border/20 text-xs text-white/60 overflow-x-auto">
      {/* Hide scrollbar for a cleaner look but keep it scrollable */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ul className="flex items-center w-full whitespace-nowrap h-9 space-x-4 sm:space-x-6">
          <li>
            <Link to="/for-business" className="font-semibold text-white hover:text-accent transition-colors">
              For Business
            </Link>
          </li>
          <li className="opacity-40 select-none" aria-hidden="true">|</li>
          <li>
            <Link to="/for-business/warnings" className="hover:text-white transition-colors">
              Warnings
            </Link>
          </li>
          <li>
            <Link to="/for-business/data-suite" className="hover:text-white transition-colors">
              Data Suite
            </Link>
          </li>
          <li>
            <Link to="/for-business/forensics" className="hover:text-white transition-colors">
              Forensics
            </Link>
          </li>
          <li>
            <Link to="/advertising" className="hover:text-white transition-colors">
              Advertising
            </Link>
          </li>
          <li className="ml-auto pl-4 hidden sm:block">
            <span className="opacity-60 italic text-[10px]">Superior Accuracy™</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
