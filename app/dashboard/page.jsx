'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [testimonials, setTestimonials] = useState([]);
  const [requestLink, setRequestLink] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/testimonials?businessId=demo-biz')
      .then((res) => res.json())
      .then((data) => setTestimonials(data.testimonials || []))
      .catch(() => setTestimonials([]));
  }, []);

  const createRequest = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId: 'demo-biz' })
      });
      const data = await res.json();
      setRequestLink(data.link || `${window.location.origin}/request/${data.token}`);
    } catch {
      alert('Error creating link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-lg">T</div>
          <span className="text-xl font-black text-blue-600">TruProof</span>
        </Link>
        <button
          onClick={createRequest}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition shadow-sm"
        >
          {loading ? 'Generating...' : '+ New Testimonial Link'}
        </button>
      </nav>

      <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-8">
        {requestLink && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex flex-col md:flex-row justify-between items-center gap-3">
            <span className="text-sm text-blue-900 font-medium break-all">
              <b>Client Link:</b> {requestLink}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(requestLink);
                alert('Copied to clipboard!');
              }}
              className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg whitespace-nowrap"
            >
              Copy Link
            </button>
          </div>
        )}

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-base font-bold mb-1">Your Website Widget Code</h2>
          <p className="text-xs text-slate-500 mb-3">Copy and paste this snippet into your website HTML to display approved testimonials:</p>
          <pre className="bg-slate-950 text-slate-100 p-3.5 rounded-xl text-xs overflow-x-auto">
{`<div id="truproof-widget" data-business-id="demo-biz"></div>
<script src="${typeof window !== 'undefined' ? window.location.origin : ''}/widget.js"></script>`}
          </pre>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Collected Proof & AI Assets</h2>
          <div className="grid grid-cols-1 gap-6">
            {testimonials.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base">{item.customer_name}</h3>
                    <p className="text-xs text-slate-500">{item.company || 'Client'} • {'⭐'.repeat(item.rating || 5)}</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold rounded-full">
                    Live
                  </span>
                </div>

                <p className="text-sm text-slate-700 italic bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  "{item.review_text}"
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-200 p-4 rounded-xl">
                    <span className="text-xs font-bold text-blue-600 uppercase">Case Study</span>
                    <p className="text-xs text-slate-600 mt-2 whitespace-pre-wrap">{item.case_study}</p>
                  </div>
                  <div className="border border-slate-200 p-4 rounded-xl">
                    <span className="text-xs font-bold text-blue-600 uppercase">LinkedIn Post</span>
                    <p className="text-xs text-slate-600 mt-2 whitespace-pre-wrap">{item.linkedin_post}</p>
                  </div>
                </div>
              </div>
            ))}

            {testimonials.length === 0 && (
              <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm">
                No reviews yet. Generate a link above and send it to your first customer!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
