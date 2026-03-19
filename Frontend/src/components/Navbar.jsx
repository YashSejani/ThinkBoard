import React from 'react';
import { Link } from 'react-router';
import { BookOpen, FilePlus } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="navbar bg-base-200/80 backdrop-blur-lg sticky top-0 z-50 border-b border-base-300 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Left — Brand */}
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            <BookOpen className="w-6 h-6 text-primary" />
            <span>ThinkBoard</span>
          </Link>
        </div>

        {/* Right — Create Note */}
        <div className="flex-none">
          <Link to="/create" className="btn btn-primary btn-sm gap-2">
            <FilePlus className="w-4 h-4" />
            Create Note
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;