'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';

export default function PricingPage() {
  const [currency, setCurrency] = useState('INR'); // 'INR' | 'USD'
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  const foundingSpotsLeft = 47; // Live counter indicator

  const pricingData = {
    INR: {
      free: { monthly: 0, annual: 0 },
      starter: { monthly: 299, annual: 2499 },
      pro: { monthly: 799, annual: 6999, founding: 499 },
      agency: { monthly: 1999, annual: 16999 },
      symbol: '₹',
      aiTopup: '₹199 for 20 AI packs'
    },
    USD: {
      free: { monthly: 0, annual: 0 },
      starter: { monthly: 9, annual: 79 },
      pro: { monthly: 19, annual: 159, founding: 12 },
      agency: { monthly: 49, annual: 399 },
      symbol: '$',
      aiTopup: '$5 for 20 AI packs'
    }
  };

  const current = pricingData[currency];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      {/* Header Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-black text-blue-500 tracking-tight">
          TruProof
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-xs font-semibold text-slate-300 hover:text-white transition">
            Dashboard
          </Link>
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition"
          >
            Start Free
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        {/* Title & Tagline */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" /> Simple, Transparent SaaS Pricing
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Collect Proof. Convert Visitors. Scale Confidently.
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Start completely free. Upgrade as your customer testimonials and AI marketing volume grow.
          </p>

          {/* Region Currency & Billing Toggle */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Currency Selector */}
            <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700 text-xs font-bold">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  currency === 'INR' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                🇮🇳 India (INR)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  currency === 'USD' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                🌐 Global (USD)
              </button>
            </div>

            {/* Monthly / Annual Toggle */}
            <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700 text-xs font-bold">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  billingCycle === 'monthly' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition ${
                  billingCycle === 'annual' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  Save ~2 Months
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Founding Member Banner */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                Founding Member Offer
              </span>
              <span className="text-xs font-bold text-amber-300">
                Only {foundingSpotsLeft}/100 Spots Remaining
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Lock in <strong className="text-white">Pro Plan</strong> for just{' '}
              <strong className="text-amber-400">
                {current.symbol}{current.pro.founding}/month
              </strong>{' '}
              for your first 12 months. Standard pricing applies thereafter.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="shrink-0 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
          >
            Claim Founding Spot <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Tier Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Free */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Free</h3>
                <p className="text-xs text-slate-400 mt-1">For testing out verified social proof.</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">{current.symbol}0</span>
                <span className="text-xs text-slate-400">/month</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2.5 pt-2">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> 10 requests / month</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> 3 approved testimonials</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> 1 embed widget</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> External video URL links</li>
                <li className="flex items-center gap-2 text-slate-500">✕ No AI marketing credits</li>
                <li className="flex items-center gap-2 text-slate-400 font-medium">TruProof branding required</li>
              </ul>
            </div>
            <Link
              href="/dashboard"
              className="block w-full text-center py-2.5 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600 text-white transition"
            >
              Get Started Free
            </Link>
          </div>

          {/* 2. Starter */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Starter</h3>
                <p className="text-xs text-slate-400 mt-1">For solo creators and early-stage tools.</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">
                  {current.symbol}
                  {billingCycle === 'monthly' ? current.starter.monthly : Math.round(current.starter.annual / 12)}
                </span>
                <span className="text-xs text-slate-400">/month</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {billingCycle === 'annual' ? `Billed ${current.symbol}${current.starter.annual}/yr` : 'Billed monthly'}
              </p>
              <ul className="text-xs text-slate-300 space-y-2.5 pt-2">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> 50 requests / month</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> 15 approved testimonials</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> 1 embed widget</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Basic response analytics</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> 3 one-time trial AI credits</li>
                <li className="flex items-center gap-2 text-slate-400 font-medium">TruProof branding required</li>
              </ul>
            </div>
            <Link
              href="/dashboard"
              className="block w-full text-center py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              Choose Starter
            </Link>
          </div>

          {/* 3. Pro (Popular) */}
          <div className="bg-slate-800/90 border-2 border-blue-500 rounded-2xl p-6 flex flex-col justify-between space-y-6 relative shadow-xl shadow-blue-500/10">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
              Most Popular
            </span>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center justify-between">
                  Pro
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </h3>
                <p className="text-xs text-slate-400 mt-1">For growing SaaS & active businesses.</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">
                  {current.symbol}
                  {billingCycle === 'monthly' ? current.pro.monthly : Math.round(current.pro.annual / 12)}
                </span>
                <span className="text-xs text-slate-400">/month</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {billingCycle === 'annual' ? `Billed ${current.symbol}${current.pro.annual}/yr` : 'Billed monthly'}
              </p>
              <ul className="text-xs text-slate-200 space-y-2.5 pt-2">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 300 requests / month</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Unlimited approved reviews</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 3 embed widgets</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 20 AI Marketing Packs / mo</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Custom branding & logo</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 font-bold text-white" /> Remove TruProof branding</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> CSV Export & Priority support</li>
              </ul>
            </div>
            <Link
              href="/dashboard"
              className="block w-full text-center py-2.5 rounded-xl text-xs font-black bg-blue-500 hover:bg-blue-600 text-white transition"
            >
              Upgrade to Pro
            </Link>
          </div>

          {/* 4. Agency */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Agency</h3>
                <p className="text-xs text-slate-400 mt-1">For marketing agencies & multiple client brands.</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">
                  {current.symbol}
                  {billingCycle === 'monthly' ? current.agency.monthly : Math.round(current.agency.annual / 12)}
                </span>
                <span className="text-xs text-slate-400">/month</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {billingCycle === 'annual' ? `Billed ${current.symbol}${current.agency.annual}/yr` : 'Billed monthly'}
              </p>
              <ul className="text-xs text-slate-300 space-y-2.5 pt-2">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> 5 client workspaces</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> 1,500 requests / month</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> 100 AI Marketing Packs / mo</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Complete White-label widget</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Team member seats</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Dedicated priority support</li>
              </ul>
            </div>
            <Link
              href="/dashboard"
              className="block w-full text-center py-2.5 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600 text-white transition"
            >
              Choose Agency
            </Link>
          </div>
        </div>

        {/* AI Top-up Addon Card */}
        <div className="max-w-2xl mx-auto bg-slate-800/40 border border-slate-700 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <div>
              <p className="text-xs font-bold text-white">Need extra AI Repurposing Credits?</p>
              <p className="text-[11px] text-slate-400">Pay as you go. No subscription required.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1.5 rounded-lg">
            {current.aiTopup}
          </span>
        </div>

        {/* Feature Comparison Matrix */}
        <div className="pt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-6">Detailed Plan Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4">Free</th>
                  <th className="py-3 px-4">Starter</th>
                  <th className="py-3 px-4 text-blue-400">Pro</th>
                  <th className="py-3 px-4">Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Monthly Requests</td>
                  <td className="py-3 px-4">10</td>
                  <td className="py-3 px-4">50</td>
                  <td className="py-3 px-4 text-blue-400 font-bold">300</td>
                  <td className="py-3 px-4">1,500</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Approved Testimonials</td>
                  <td className="py-3 px-4">3 total</td>
                  <td className="py-3 px-4">15 total</td>
                  <td className="py-3 px-4 text-blue-400 font-bold">Unlimited</td>
                  <td className="py-3 px-4">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">AI Marketing Packs</td>
                  <td className="py-3 px-4">✕</td>
                  <td className="py-3 px-4">3 trial credits</td>
                  <td className="py-3 px-4 text-blue-400 font-bold">20 / month</td>
                  <td className="py-3 px-4">100 / month</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Widgets Allowed</td>
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4 text-blue-400 font-bold">3</td>
                  <td className="py-3 px-4">Unlimited (5 workspaces)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">TruProof Branding Removal</td>
                  <td className="py-3 px-4">✕</td>
                  <td className="py-3 px-4">✕</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">✓ Yes</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">✓ White-label</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">External Video URL Link</td>
                  <td className="py-3 px-4">✓</td>
                  <td className="py-3 px-4">✓</td>
                  <td className="py-3 px-4 text-blue-400">✓</td>
                  <td className="py-3 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">CSV Export</td>
                  <td className="py-3 px-4">✕</td>
                  <td className="py-3 px-4">✕</td>
                  <td className="py-3 px-4 text-blue-400">✓</td>
                  <td className="py-3 px-4">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
