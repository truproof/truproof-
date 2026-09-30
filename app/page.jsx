'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, Code2, Send, ShieldCheck, FileText, Share2, Star } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('widget');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50 px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl sm:text-2xl tracking-tight text-blue-500">TruProof</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
              Beta
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition px-2 py-1"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg transition"
            >
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {/* 1. Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-14 text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 rounded-full text-xs font-medium text-blue-400">
          <Sparkles className="w-3.5 h-3.5" /> Fast Testimonial Collection & AI Repurposing
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Collect customer testimonials. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Let AI write your marketing assets.
          </span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
          Built for SaaS founders, agencies, coaches, consultants, and D2C brands. Collect authentic text feedback and turn customer praise into ready-to-publish content.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition shadow-lg shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Start collecting testimonials free <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium text-sm px-6 py-3.5 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            See sample widget & demo
          </a>
        </div>
      </section>

      {/* 2. Product Explanation: 4-Step Process */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14 border-t border-slate-800/80">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">How TruProof Works</h2>
          <p className="text-xs sm:text-sm text-slate-400">From client review to marketing-ready copy in 4 simple steps.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl space-y-2">
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">Step 1</span>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5"><Send className="w-4 h-4 text-blue-400" /> Create Request Link</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Generate a secure, single-use invite link with a 7-day expiration window.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl space-y-2">
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">Step 2</span>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5"><FileText className="w-4 h-4 text-blue-400" /> Client Submits Feedback</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Your customer submits their rating, written feedback, and details without signups.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl space-y-2">
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">Step 3</span>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5"><Code2 className="w-4 h-4 text-blue-400" /> Moderate & Embed</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Review submissions in your dashboard and embed approved cards with a clean iframe.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl space-y-2">
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">Step 4</span>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-indigo-400" /> AI Marketing Assets</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Gemini turns testimonials into LinkedIn posts, tweets, micro case studies, and ad copy.</p>
          </div>
        </div>
      </section>

      {/* 3. Interactive Sample Demo Section */}
      <section id="demo" className="max-w-5xl mx-auto px-4 sm:px-6 py-14 border-t border-slate-800/80 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Interactive Product Preview</h2>
          <p className="text-xs sm:text-sm text-slate-400">See what your customers see and what TruProof generates for you.</p>
        </div>

        {/* Demo Tab Navigation */}
        <div className="flex justify-center">
          <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex gap-1 text-xs">
            <button
              onClick={() => setActiveTab('widget')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'widget' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Public Testimonial Card
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'ai' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              AI-Generated Copies
            </button>
          </div>
        </div>

        {/* Demo Container */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 max-w-2xl mx-auto shadow-inner">
          {activeTab === 'widget' ? (
            <div className="bg-white text-slate-900 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-800 leading-relaxed">
                "TruProof helped us collect 12 authentic client testimonials in our first week. Embedding the responsive wall took less than 2 minutes."
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">Alex Carter</p>
                  <p className="text-slate-500 text-[11px]">Founder, SaaSMetrics</p>
                </div>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified Feedback
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-left text-xs">
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <span className="font-bold text-blue-400 block mb-1">LinkedIn Post</span>
                <p className="text-slate-300">
                  "Proof drives conversion. Alex Carter from SaaSMetrics just shared how collecting structured testimonials moved the needle for their onboarding. Here are 3 takeaways on authentic social proof..."
                </p>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <span className="font-bold text-indigo-400 block mb-1">Micro Case Study</span>
                <p className="text-slate-300">
                  Problem: Low landing page social proof.<br />
                  Result: 12 authentic testimonials gathered in Week 1.<br />
                  Quote: "Embedding the wall took less than 2 minutes."
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Pricing Preview (Honest & Transparent) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14 border-t border-slate-800/80 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Simple, Honest Pricing</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            No credit card required for Beta. 7-day money-back guarantee on paid plans. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          {/* Free Beta Plan */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Free Beta</h3>
              <p className="text-xs text-slate-400 mt-1">Try core features risk-free.</p>
              <div className="text-2xl font-extrabold text-white mt-3">$0</div>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Up to 15 Testimonials</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Expiring Request Links</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Standard Embed Widget</li>
            </ul>
            <Link
              href="/dashboard"
              className="block text-center bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-2.5 rounded-lg transition"
            >
              Get Started Free
            </Link>
          </div>

          {/* Starter Plan */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Starter</h3>
              <p className="text-xs text-slate-400 mt-1">For growing creators & founders.</p>
              <div className="text-2xl font-extrabold text-white mt-3">$9 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Up to 50 Testimonials</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Edge-cached CDN Widgets</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Basic AI Marketing Copies</li>
            </ul>
            <Link
              href="/dashboard"
              className="block text-center bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-2.5 rounded-lg transition"
            >
              Start Starter
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-b from-blue-900/30 to-slate-900/80 border border-blue-500/40 rounded-2xl p-6 space-y-4">
            <div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Most Flexible</span>
              <h3 className="text-base font-bold text-white mt-1">Pro Growth</h3>
              <p className="text-xs text-slate-400 mt-1">For scaling businesses & agencies.</p>
              <div className="text-2xl font-extrabold text-white mt-3">$19 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Unlimited Testimonials</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Unlimited AI Generations</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> CSV Data Export</li>
            </ul>
            <Link
              href="/dashboard"
              className="block text-center bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2.5 rounded-lg transition shadow-md shadow-blue-500/20"
            >
              Start Pro
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Trust & Compliance Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">TruProof</span>
            <span>© 2026. Collect testimonials faster, turn proof into content.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300 transition">Terms of Service</Link>
            <span>•</span>
            <Link href="/refund" className="hover:text-slate-300 transition">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
