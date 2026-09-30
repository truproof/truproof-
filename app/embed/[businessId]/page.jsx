'use client';

import React, { useEffect, useState } from 'react';
import { Star, ShieldCheck, Video, ExternalLink } from 'lucide-react';

export default function EmbedWidget({ params }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState({ plan: 'free', hideBranding: false });
  const businessId = params?.businessId || 'default-biz';

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/testimonials?businessId=${businessId}&status=approved`);
        const data = await res.json();
        if (data.success) {
          setTestimonials(data.testimonials || []);
        }
      } catch (e) {
        console.error('Failed to load embed data', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [businessId]);

  if (loading) {
    return (
      <div className="p-6 text-center text-xs text-slate-500 font-sans">
        Loading verified customer proof...
      </div>
    );
  }

  const showBranding = business.plan === 'free' || business.plan === 'starter' || !business.hideBranding;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 font-sans bg-transparent">
      {testimonials.length === 0 ? (
        <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
          No approved reviews published yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  "{t.reviewText}"
                </p>

                {t.videoUrl && (
                  <a
                    href={t.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:underline font-medium pt-1"
                  >
                    <Video className="w-3.5 h-3.5" /> Watch Video Story
                  </a>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-900 text-[12px]">{t.clientName}</p>
                  {t.company && <p className="text-slate-500 text-[10px]">{t.company}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Organic Growth Branding (Required on Free & Starter) */}
      {showBranding && (
        <div className="mt-4 pt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <span>Collected with</span>
          <a
            href="https://truproof.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 transition"
          >
            TruProof <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      )}
    </div>
  );
}
