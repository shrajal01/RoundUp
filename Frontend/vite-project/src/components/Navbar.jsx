import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
  return (<>
    {/* --- Header / Navigation --- */}
          <header className="border-b">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              {/* Left Nav */}
              <div className="flex items-center gap-6">
                <Link to="/" className="text-xl font-bold text-gray-800">
                  {/* Using text logo as in image */}
                  gofundme
                </Link>
                <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600">
                  <Link to="/search" className="hover:text-green-700">
                    Search
                  </Link>
                  <Link to="/campaigns" className="hover:text-green-700">
                    Donate
                  </Link>
                  <Link to="/campaigns/create" className="hover:text-green-700">
                    Fundraise
                  </Link>
                </div>
              </div>
    
              {/* Right Nav */}
              <div className="flex items-center gap-4 text-sm font-medium">
                <Link
                  to="/about"
                  className="hidden md:block text-gray-600 hover:text-green-700"
                >
                  About
                </Link>
                <Link
                  to="/signin"
                  className="text-gray-600 hover:text-green-700"
                >
                  Sign in
                </Link>
                <Link
                  to="/start-campaign"
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition-colors"
                >
                  Start a GoFundMe
                </Link>
              </div>
            </nav>
          </header>
          </>
  );
}
