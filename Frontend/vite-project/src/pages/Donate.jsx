import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function loadScript(src){
  return new Promise((res)=> {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => res(true);
    script.onerror = () => res(false);
    document.body.appendChild(script);
  });
}

export default function Donate(){
  const { id } = useParams();
  const [amount, setAmount] = useState(500);

  useEffect(()=>{
    // optionally fetch campaign to show info
  },[id]);

  const handlePay = async () => {
    // 1. create order on backend
    const orderRes = await API.post("/payments/order", { amount, campaignId:id });
    const { orderId, amount:orderAmount } = orderRes.data;

    const ok = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if(!ok) return alert("Razorpay SDK failed to load.");

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: orderAmount, // in paise
      currency: "INR",
      name: "KindLink",
      description: "Donation",
      order_id: orderId,
      handler: async function (response){
        // verify payment on backend
        await API.post("/payments/verify", {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          campaignId: id,
          amount
        });
        alert("Thank you for donating!");
      },
      prefill: { name: "", email: "" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Donate</h2>
      <div className="mb-4">
        <label className="block text-sm mb-1">Amount (₹)</label>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} className="w-full border p-2 rounded" />
      </div>
      <button onClick={handlePay} className="bg-green-600 text-white px-4 py-2 rounded">Pay with Razorpay</button>
    </div>
  );
}
