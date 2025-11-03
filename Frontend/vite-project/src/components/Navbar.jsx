import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">KindLink</Link>
        <div className="space-x-4">
          <Link to="/campaigns" className="text-gray-700 hover:text-indigo-600">Campaigns</Link>
          <Link to="/campaigns/create" className="text-gray-700 hover:text-indigo-600">Start a Campaign</Link>
          <Link to="/ngoregister" className="text-gray-700 hover:text-indigo-600">NGO Register</Link>
        </div>
      </div>
    </nav>
  );
}
