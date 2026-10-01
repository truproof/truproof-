'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Star, ShieldCheck, Video } from 'lucide-react';

export default function EmbedWidget() {
  const params = useParams();
  const businessId = params?.businessId || 'default-biz';

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        // Pehle current businessId ke approved reviews layein
        const res = await fetch(`/api/testimonials?businessId=${businessId}&status=approved`);
        const data = await res.json();
        
        if (data.success && data.testimonials && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
        } else {
          // Fallback: Agar ID match na ho toh saare approved reviews dikhayein
          const fallbackRes = await fetch(`/api/testimonials?status=approved`);
          const fallbackData = await fallbackRes.json();
          if (fallbackData.success) {
            setTestimonials(fallbackData.testimonials || []);
          }
        }
      } catch (err) {
        console.error('Failed to load embed reviews:', err);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, [businessId]);

  if (loading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center bg-slate-950 text-slate-400 text-xs font-sans">
        Loading verified testimonials...
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-2xl text-center text-xs text-slate-400 font-sans">
        No approved testimonials to display yet. Approve testimonials from your dashboard to showcase them here!
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-950 p-6 font-sans text-slate-100 antialiased min-h-screen">
      {/* Widget Header Badge */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Verified Customer Reviews
          </span>
        </div>
        <span className="text-[11px] text-slate-500">
          Powered by <strong className="text-blue-400">TruProof</strong>
        </span>
      </div>

      {/* Testimonials Grid / Wall */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-sm hover:border-slate-700 transition"
          >
            <div className="space-y-3">
              {/* Star Rating & Verified Pill */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed">
                "{item.reviewText}"
              </p>

              {/* Video URL if available */}
              {item.videoUrl && (
                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold pt-1"
                >
                  <Video className="w-3.5 h-3.5" /> Watch Video Review ↗
                </a>
              )}
            </div>

            {/* Client Profile Info */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">{item.clientName}</p>
                {item.company && (
                  <p className="text-[11px] text-slate-400">{item.company}</p>
                )}
              </div>
              <span className="text-[10px] text-slate-600 font-medium">Verified Client</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
