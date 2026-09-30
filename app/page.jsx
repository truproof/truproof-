'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, Shield, Zap } from 'lucide-react';

export default function HomePage() {
  const [currency, setCurrency] = useState('USD');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-black text-2xl tracking-tight text-blue-500">TruProof</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
              AI Proof Engine
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-slate-300 hover:text-white transition"
            >
              Dashboard
            </Link>
            <a
              href="#pricing"
              className="text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition shadow-sm"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center space-y-8">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-medium text-blue-400">
          <Sparkles className="w-3.5 h-3.5" /> Turn Proof Into Revenue Automatically
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
          Collect customer testimonials. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Let AI write your marketing assets.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal">
          Collect verified text and video reviews in 2 minutes. Gemini AI automatically generates viral LinkedIn posts, Twitter threads, case studies, and ad copy.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition shadow-lg shadow-blue-500/20"
          >
            Go to Founder Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-medium text-sm px-6 py-3 rounded-xl transition"
          >
            View Pricing Plans
          </a>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left">
          <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-6 space-y-3">
            <Zap className="w-6 h-6 text-blue-400" />
            <h2 className="text-base font-bold text-white">7-Day Expiring Invites</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate single-use tokenized links. Protect your forms from bots and spam while getting authenticated client feedback.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-6 space-y-3">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Gemini AI Marketing Copy</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instantly turn approved reviews into LinkedIn viral hooks, Twitter threads, micro case studies, and high-converting ad copy.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-6 space-y-3">
            <Shield className="w-6 h-6 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Edge-Cached Widgets</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Embed responsive verified testimonial walls on Webflow, WordPress, Shopify, or Next.js with global CDN caching.
            </p>
          </div>
        </div>

        {/* Pricing Section */}
        <section id="pricing" className="pt-20 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Simple, Transparent Pricing</h2>
            <p className="text-xs text-slate-400">100% money-back guarantee within 7 days. Cancel anytime.</p>
            
            {/* Currency Switcher */}
            <div className="pt-3 flex justify-center">
              <div className="bg-slate-800 p-1 rounded-lg border border-slate-700 flex gap-1 text-xs">
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1 rounded-md font-medium transition ${
                    currency === 'USD' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Global (USD - Stripe)
                </button>
                <button
                  onClick={() => setCurrency('INR')}
                  className={`px-3 py-1 rounded-md font-medium transition ${
                    currency === 'INR' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  India (INR - Razorpay)
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
            {/* Starter Plan */}
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 space-y-5">
              <div>
                <h3 className="text-base font-bold text-white">Starter Founder</h3>
                <p className="text-xs text-slate-400 mt-1">Perfect for early indie hackers and creators.</p>
                <div className="text-3xl font-extrabold text-white mt-4">
                  {currency === 'USD' ? '$9' : '₹499'}
                  <span className="text-xs text-slate-400 font-normal"> / month</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Up to 50 Verified Testimonials</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Embeddable CDN Widgets</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Standard AI Marketing Copies</li>
              </ul>
              <Link
                href="/dashboard"
                className="block text-center bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold py-2.5 rounded-lg transition"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-b from-blue-900/40 to-slate-800/80 border border-blue-500/50 rounded-2xl p-6 space-y-5 relative">
              <span className="absolute -top-2.5 right-4 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Popular
              </span>
              <div>
                <h3 className="text-base font-bold text-white">Pro SaaS Growth</h3>
                <p className="text-xs text-slate-400 mt-1">For growing startups and scaling agencies.</p>
                <div className="text-3xl font-extrabold text-white mt-4">
                  {currency === 'USD' ? '$19' : '₹999'}
                  <span className="text-xs text-slate-400 font-normal"> / month</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Unlimited Verified Testimonials</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Remove "TruProof" Branding</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Unlimited Gemini AI Content Generations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> CSV Data Export</li>
              </ul>
              <Link
                href="/dashboard"
                className="block text-center bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2.5 rounded-lg transition shadow-md shadow-blue-500/30"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Mandatory Compliance Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">TruProof</span>
            <span>© 2026. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300 transition">Terms of Service</Link>
            <span>•</span>
            <Link href="/refund" className="hover:text-slate-300 transition">7-Day Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
