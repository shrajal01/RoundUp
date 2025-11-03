import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      <h1 className="text-4xl font-bold mb-4">Fund causes that matter</h1>
      <p className="text-gray-600 mb-6">Create campaigns, verify NGOs, accept donations — secure & transparent.</p>
      <div className="flex justify-center gap-4">
        <Link to="/campaigns" className="px-6 py-3 bg-indigo-600 text-white rounded">Explore Campaigns</Link>
        <Link to="/campaigns/create" className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded">Start a Campaign</Link>
      </div>
    </div>
  );
}
