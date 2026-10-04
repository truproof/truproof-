'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Star, ArrowRight, CheckCircle2, Sparkles, 
  Code2, Zap, LayoutDashboard, ChevronRight, Send, CheckSquare, Layers
} from 'lucide-react';

export default function LandingPage() {
  const steps = [
    {
      num: '01',
      title: 'Generate 7-Day Expiring Invite',
      desc: 'Create secure, single-use review links in seconds. Eliminates fake spam reviews and builds authentic buyer trust.'
    },
    {
      num: '02',
      title: 'Client Submits Feedback',
      desc: 'Your client opens a clean, frictionless form to leave a rating, authentic review, or link a video testimonial.'
    },
    {
      num: '03',
      title: 'Approve & Embed Everywhere',
      desc: 'Moderate submissions in 1 click. Copy our lightweight iframe widget onto WordPress, Webflow, Shopify, or Framer.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-black text-blue-500 tracking-tight">
            <ShieldCheck className="w-6 h-6 text-blue-500" /> TruProof
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-xs font-semibold text-slate-300 hover:text-white transition">
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-blue-600/20 flex items-center gap-1.5"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-14 px-4 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen Social Proof for Founders & Creators
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          Collect Authenticated Proof. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Convert Visitors into Paying Users.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Stop taking screenshots of reviews. Automate verified customer feedback with 7-day expiring invite links, AI-generated marketing packs, and embeddable dynamic widgets.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2"
          >
            Start Free Today <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-sm px-6 py-3.5 rounded-xl transition flex items-center justify-center gap-2"
          >
            View Pricing Plans
          </Link>
        </div>

        <div className="pt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <span>Trusted by creators, SaaS indie founders, and web agencies</span>
        </div>
      </section>

      {/* 3-Step "How It Works" Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 border-t border-slate-900">
        <div className="text-center space-y-2 mb-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            Simple 3-Step Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">How TruProof Works</h2>
          <p className="text-xs text-slate-400">Collect, approve, and showcase authentic testimonials in under 3 minutes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl relative space-y-3">
              <span className="text-3xl font-black text-blue-500/30">{s.num}</span>
              <h3 className="font-bold text-white text-base">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12 border-t border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">7-Day Expiring Invites</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Create single-use verification links. Prevent fake spam testimonials and ensure high response rates from your actual clients.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Instant AI Marketing Pack</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              One click turns raw reviews into LinkedIn posts, Twitter threads, and micro case studies ready to publish immediately.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">One-Line Embed Widget</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Copy-paste our responsive iframe widget into WordPress, Webflow, Shopify, Framer, or custom React apps in under 30 seconds.
            </p>
          </div>
        </div>
      </section>

      {/* Embed Demo / Visual Preview Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center space-y-6">
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            Live Social Proof
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">How it renders on your site</h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 shadow-2xl">
          <div className="h-6 flex items-center gap-1.5 px-2 mb-3 border-b border-slate-800/80">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-[10px] text-slate-500 ml-2 font-mono">yourwebsite.com/reviews</span>
          </div>
          <iframe 
            src="/embed/default-biz" 
            width="100%" 
            height="320" 
            className="rounded-xl border border-slate-800"
            loading="lazy"
          />
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="border-t border-slate-800/80 py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Ready to boost your site's conversion rate?</h2>
          <p className="text-xs sm:text-sm text-slate-400">Join other founders turning social proof into actual monthly revenue.</p>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-lg shadow-blue-600/20"
            >
              Get Started for Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-4 text-slate-400">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
          <span>•</span>
          <Link href="/refund" className="hover:underline">Refund Policy</Link>
        </div>
        <p>© {new Date().getFullYear()} TruProof. Built for high-trust founders.</p>
      </footer>
    </div>
  );
}
