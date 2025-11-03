import React, { useState } from "react";
import API from "../api";

export default function NGORegister(){
  const [form, setForm] = useState({ name:"", registrationId:"", address:"" });
  const [doc, setDoc] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!doc) return setMsg("Please upload registration document.");
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("registrationId", form.registrationId);
      fd.append("address", form.address);
      fd.append("document", doc);
      const res = await API.post("/ngos/register", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMsg(res.data.message || "Registered. Pending verification.");
      setForm({ name:"", registrationId:"", address:"" });
      setDoc(null);
    } catch (err){
      console.error(err);
      setMsg(err?.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">NGO Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})}
          placeholder="NGO Name" className="w-full border p-2 rounded" required />
        <input value={form.registrationId} onChange={e=>setForm({...form, registrationId:e.target.value})}
          placeholder="Registration ID (e.g., UIN)" className="w-full border p-2 rounded" required />
        <input value={form.address} onChange={e=>setForm({...form, address:e.target.value})}
          placeholder="Registered Address" className="w-full border p-2 rounded" required />
        <div>
          <label className="block text-sm font-medium mb-1">Upload Registration Document</label>
          <input type="file" accept=".pdf,image/*" onChange={e=>setDoc(e.target.files[0])} />
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Register NGO</button>
      </form>
      {msg && <p className="mt-4 text-sm text-green-700">{msg}</p>}
    </div>
  );
}
