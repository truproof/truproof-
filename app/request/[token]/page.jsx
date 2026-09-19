'use client';
import { useState } from 'react';

export default function RequestPage({ params }) {
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    company: '',
    rating: 5,
    videoUrl: '',
    reviewText: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, businessId: 'demo-biz' })
      });
      if (res.ok) setSubmitted(true);
      else alert('Something went wrong');
    } catch (err) {
      alert('Error submitting: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6 text-slate-900">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md text-center">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl mb-4">✓</div>
          <h2 className="text-2xl font-bold">Thank You!</h2>
          <p className="text-slate-600 mt-2 text-sm">Your feedback and testimonial have been recorded successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 text-slate-900">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="text-center mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center mx-auto mb-2">T</div>
          <h1 className="text-2xl font-black">Share Your Experience</h1>
          <p className="text-xs text-slate-500 mt-1">Takes only 2 minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Full Name *</label>
            <input
              required
              type="text"
              placeholder="e.g. Sarah Jenkins"
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Email</label>
            <input
              type="email"
              placeholder="sarah@example.com"
              value={form.customerEmail}
              onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company / Designation</label>
            <input
              type="text"
              placeholder="e.g. Founder at TechCorp"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Rating</label>
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none"
            >
              <option value="5">⭐⭐⭐⭐⭐ (5 / 5)</option>
              <option value="4">⭐⭐⭐⭐ (4 / 5)</option>
              <option value="3">⭐⭐⭐ (3 / 5)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Video Link (Loom, Drive, Vimeo - Optional)</label>
            <input
              type="url"
              placeholder="https://..."
              value={form.videoUrl}
              onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Review *</label>
            <textarea
              required
              rows="4"
              placeholder="How did our product/service help your business?"
              value={form.reviewText}
              onChange={(e) => setForm({ ...form, reviewText: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-blue-600"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition disabled:opacity-50"
          >
            {loading ? 'Submitting Review...' : 'Send Review'}
          </button>
        </form>
      </div>
    </div>
  );
}
