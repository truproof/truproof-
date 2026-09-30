'use client';

import React, { useEffect, useState } from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export default function EmbedWidget({ params }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default theme support (light by default)
  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await fetch(`/api/testimonials?businessId=${params?.businessId || 'default-biz'}&status=approved`);
        const data = await res.json();
        if (data.success) {
          setReviews(data.testimonials || []);
        }
      } catch (e) {
        console.error('Embed load error', e);
      } finally {
        setLoading(false);
      }
    }
    loadTestimonials();
  }, [params]);

  if (loading) {
    return <div className="p-4 text-center text-xs text-slate-400 font-sans">Loading verified reviews...</div>;
  }

  if (reviews.length === 0) {
    return null; // Empty widget if no reviews yet
  }

  return (
    <div className="font-sans antialiased p-4 max-w-5xl mx-auto">
      {/* Testimonials Wall Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-3"
          >
            <div>
              {/* Rating stars */}
              <div className="flex items-center gap-1 mb-2.5">
                {[...Array(r.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              {/* Review Text */}
              <p className="text-slate-800 text-sm leading-relaxed font-normal">
                "{r.reviewText}"
              </p>
            </div>

            {/* Author + Verified Badge */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900 leading-none">{r.clientName}</p>
                {r.company && <p className="text-[11px] text-slate-400 mt-0.5">{r.company}</p>}
              </div>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Powered by TruProof Badge (Viral Growth Hook) */}
      <div className="mt-4 text-center">
        <a
          href="https://truproof.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-blue-600 transition"
        >
          ⚡ Collected with <span className="font-bold text-slate-700">TruProof</span>
        </a>
      </div>
    </div>
  );
}
