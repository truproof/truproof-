'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, Code2, Send, ShieldCheck, FileText, Star, Zap, Info } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('widget');
  const [currency, setCurrency] = useState('INR');
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
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
            <Link href="/dashboard" className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition px-2 py-1">
              Dashboard
            </Link>
            <Link href="/dashboard" className="text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg transition">
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
          <Link href="/dashboard" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition shadow-lg shadow-blue-500/20">
            Start collecting testimonials free <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="#demo" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium text-sm px-6 py-3.5 rounded-xl transition">
            See sample widget & demo
          </a>
        </div>
      </section>

      {/* 4-Step Process */}
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
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5"><FileText className="w-4 h-4 text-blue-400" /> Client Submits</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Customers submit rating, text, or external video URLs (Loom, YouTube) with zero signups.</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl space-y-2">
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">Step 3</span>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5"><Code2 className="w-4 h-4 text-blue-400" /> Moderate & Embed</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Approve reviews in 1 click and embed responsive cards on your website.</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl space-y-2">
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">Step 4</span>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-indigo-400" /> AI Marketing Assets</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Gemini transforms feedback into LinkedIn posts, tweets, case studies, and ad copy.</p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="max-w-5xl mx-auto px-4 sm:px-6 py-14 border-t border-slate-800/80 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Interactive Product Preview</h2>
        </div>
        <div className="flex justify-center">
          <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex gap-1 text-xs">
            <button onClick={() => setActiveTab('widget')} className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === 'widget' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Public Testimonial Card</button>
            <button onClick={() => setActiveTab('ai')} className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === 'ai' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>AI-Generated Copies</button>
          </div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 max-w-2xl mx-auto shadow-inner">
          {activeTab === 'widget' ? (
            <div className="bg-white text-slate-900 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-sm text-slate-800 leading-relaxed">"TruProof helped us collect 12 authentic client testimonials in our first week. Embedding the responsive wall took less than 2 minutes."</p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">Alex Carter</p>
                  <p className="text-slate-500 text-[11px]">Founder, SaaSMetrics</p>
                </div>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-left text-xs">
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <span className="font-bold text-blue-400 block mb-1">LinkedIn Post</span>
                <p className="text-slate-300">"Proof drives conversion. Alex Carter from SaaSMetrics just shared how collecting structured testimonials moved the needle. Here are 3 takeaways..."</p>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <span className="font-bold text-indigo-400 block mb-1">Micro Case Study</span>
                <p className="text-slate-300">Problem: Low landing page social proof.<br />Result: 12 authentic testimonials gathered in Week 1.<br />Quote: "Embedding the wall took less than 2 minutes."</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 border-t border-slate-800/80 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Simple, Scalable Pricing</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Free forever tier to get started. No credit card required. Upgrade when you grow.
          </p>

          {/* Toggles */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex gap-1 text-xs">
              <button onClick={() => setCurrency('INR')} className={`px-4 py-2 rounded-lg font-bold transition ${currency === 'INR' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}>🇮🇳 INR</button>
              <button onClick={() => setCurrency('USD')} className={`px-4 py-2 rounded-lg font-bold transition ${currency === 'USD' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}>🌍 USD</button>
            </div>
            <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex gap-1 text-xs">
              <button onClick={() => setBilling('monthly')} className={`px-4 py-2 rounded-lg font-bold transition ${billing === 'monthly' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Monthly</button>
              <button onClick={() => setBilling('yearly')} className={`px-4 py-2 rounded-lg font-bold transition flex items-center gap-1 ${billing === 'yearly' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                Yearly <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full border border-emerald-500/20">Save 20%</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          
          {/* FREE */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <div className="mb-4">
              <h3 className="text-base font-bold text-white">Free</h3>
              <p className="text-[11px] text-slate-400 mt-1">For organic early growth.</p>
              <div className="text-2xl font-extrabold text-white mt-4">{currency === 'INR' ? '₹0' : '$0'}</div>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 flex-1">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0" /> 10 requests / month</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0" /> 3 approved testimonials</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0" /> 1 Embed Widget</li>
              <li className="flex items-start gap-2 text-slate-500"><span className="text-slate-600 font-bold shrink-0">✕</span> TruProof branding on widget</li>
              <li className="flex items-start gap-2 text-slate-500"><span className="text-slate-600 font-bold shrink-0">✕</span> No AI Credits</li>
            </ul>
            <Link href="/dashboard" className="mt-6 block text-center bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-2.5 rounded-lg transition">Start Free</Link>
          </div>

          {/* STARTER */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <div className="mb-4">
              <h3 className="text-base font-bold text-white">Starter</h3>
              <p className="text-[11px] text-slate-400 mt-1">For focused creators.</p>
              <div className="text-2xl font-extrabold text-white mt-4">
                {currency === 'INR' ? (billing === 'monthly' ? '₹299' : '₹2,499') : (billing === 'monthly' ? '$9' : '$79')}
                <span className="text-[10px] font-normal text-slate-400"> / {billing === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 flex-1">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 50 requests / month</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 15 approved testimonials</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Email request templates</li>
              <li className="flex items-start gap-2 text-emerald-200"><CheckCircle2 className="w-4 h-4 shrink-0" /> 3 Trial AI Credits</li>
              <li className="flex items-start gap-2 text-slate-500"><span className="text-slate-600 font-bold shrink-0">✕</span> TruProof branding on widget</li>
            </ul>
            <Link href="/dashboard" className="mt-6 block text-center bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-2.5 rounded-lg transition">Upgrade to Starter</Link>
          </div>

          {/* PRO (Founding Offer) */}
          <div className="bg-gradient-to-b from-blue-900/40 to-slate-900/80 border border-blue-500 rounded-2xl p-6 flex flex-col relative shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
              <Zap className="w-3 h-3" /> Founding Member Offer
            </div>
            <div className="mb-4 pt-2">
              <h3 className="text-base font-bold text-white">Pro</h3>
              <p className="text-[11px] text-blue-300 mt-1">For growing SaaS & Agencies.</p>
              <div className="mt-3 flex items-end gap-2">
                <div className="text-3xl font-black text-white">
                  {currency === 'INR' 
                    ? (billing === 'monthly' ? '₹499' : '₹6,999') 
                    : (billing === 'monthly' ? '$12' : '$159')}
                  <span className="text-[10px] font-normal text-slate-400"> / {billing === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                {billing === 'monthly' && (
                  <span className="text-xs text-slate-500 line-through mb-1.5">{currency === 'INR' ? '₹799' : '$19'}</span>
                )}
              </div>
              {billing === 'monthly' && (
                <div className="text-[10px] text-blue-400 mt-1 font-medium bg-blue-500/10 px-2 py-1 rounded inline-block">
                  Price locked for 12 months. 23/100 spots left.
                </div>
              )}
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 flex-1">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> 300 requests / month</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> <strong>Unlimited</strong> text testimonials</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> 3 Widgets + Custom Branding</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> Remove TruProof branding</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> 20 AI Packs / month</li>
            </ul>
            <Link href="/dashboard" className="mt-6 block text-center bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2.5 rounded-lg transition shadow-md shadow-blue-500/20">Upgrade to Pro</Link>
          </div>

          {/* AGENCY */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <div className="mb-4">
              <h3 className="text-base font-bold text-white">Agency</h3>
              <p className="text-[11px] text-slate-400 mt-1">For scale & client management.</p>
              <div className="text-2xl font-extrabold text-white mt-4">
                {currency === 'INR' ? (billing === 'monthly' ? '₹1,999' : '₹16,999') : (billing === 'monthly' ? '$49' : '$399')}
                <span className="text-[10px] font-normal text-slate-400"> / {billing === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 flex-1">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> 1,500 requests / month</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> 5 client workspaces</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> White-label widgets</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Team access</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> 100 AI Packs / month</li>
            </ul>
            <Link href="/dashboard" className="mt-6 block text-center bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-2.5 rounded-lg transition">Upgrade to Agency</Link>
          </div>

        </div>

        {/* AI Logic Footer */}
        <div className="max-w-4xl mx-auto pt-4 flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-full">
            <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span><strong>What is an AI Pack?</strong> 1 Pack = turns 1 testimonial into a Case Study, LinkedIn post, X thread, and Ad copy.</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Need more AI? Top-up anytime ({currency === 'INR' ? '₹199' : '$5'} for 20 AI packs).</p>
        </div>
      </section>

      {/* Compliance Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 px-4 sm:px-6">
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
            <Link href="/refund" className="hover:text-slate-300 transition">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
