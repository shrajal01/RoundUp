import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function CreateCampaign(){
  const [form, setForm] = useState({ title:"", goal:50000, story:"", image:null });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("goal", form.goal);
      fd.append("story", form.story);
      if(form.image) fd.append("image", form.image);

      const res = await API.post("/campaigns/create", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMsg("Campaign created!");
      nav("/campaigns");
    } catch (err) {
      console.error(err);
      setMsg("Failed to create campaign.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Campaign</h2>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border p-2 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
        <input className="w-full border p-2 rounded" placeholder="Goal (in ₹)" type="number" value={form.goal} onChange={e=>setForm({...form, goal:e.target.value})} required />
        <textarea className="w-full border p-2 rounded" placeholder="Story" value={form.story} onChange={e=>setForm({...form, story:e.target.value})} rows={6} required />
        <div>
          <label className="block text-sm font-medium mb-1">Campaign Image</label>
          <input type="file" accept="image/*" onChange={e=>setForm({...form, image:e.target.files[0]})} />
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Create</button>
      </form>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
}
