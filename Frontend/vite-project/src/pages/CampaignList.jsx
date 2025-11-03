import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function CampaignList(){
  const [campaigns, setCampaigns] = useState([]);

  useEffect(()=>{
    API.get("/campaigns/all").then(res=>setCampaigns(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">All Campaigns</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map(c=>(
          <div key={c.id} className="bg-white rounded shadow p-4">
            <img src={c.imageUrl || "https://via.placeholder.com/400x200"} alt="" className="w-full h-40 object-cover rounded mb-3" />
            <h3 className="font-semibold">{c.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{c.story?.slice(0,120)}...</p>
            <div className="flex justify-between items-center mt-3">
              <strong>₹{c.raised || 0} / ₹{c.goal}</strong>
              <Link to={`/campaigns/${c.id}`} className="text-indigo-600">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
