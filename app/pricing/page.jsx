'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Check, Zap, Sparkles, ArrowRight, 
  HelpCircle, ChevronDown, ChevronUp, Copy, CheckCircle2, X, QrCode
} from 'lucide-react';

export default function PricingPage() {
  const [currency, setCurrency] = useState('USD'); // 'USD' or 'INR'
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'
  const [faqOpen, setFaqOpen] = useState(null);
  
  // UPI Modal State for Indian payments
  const [upiModalOpen, setUpiModalOpen] = useState(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Aapki Official Launch UPI ID (Yahan apni actual UPI ID daal sakte hain)
  const officialUpiId = "6394427341@pz"; 

  const isIndia = currency === 'INR';
  const isAnnual = billingCycle === 'annual';

  const plans = [
    {
      id: 'free',
      name: 'Free Starter',
      desc: 'Perfect for indie hackers testing their initial social proof.',
      priceUSD: 0,
      priceINR: 0,
      popular: false,
      features: [
        '10 Total Testimonials Limit',
        '1 Embeddable Widget',
        '7-Day Expiring Invites',
        '20 AI Generation Credits',
        'TruProof Watermark'
      ],
      buttonText: 'Start Free Today',
      link: '/dashboard'
    },
    {
      id: 'starter',
      name: 'Starter Pro',
      desc: 'Ideal for solo creators, consultants, and active freelancers.',
      priceUSD: isAnnual ? 7 : 9,
      priceINR: isAnnual ? 249 : 299,
      popular: false,
      features: [
        'Up to 50 Live Testimonials',
        '3 Custom Embed Widgets',
        'Remove TruProof Branding',
        '100 AI Marketing Credits/mo',
        'Video Reviews (Loom/YouTube)',
        'Email Support'
      ],
      buttonText: 'Get Starter Pro',
      usdLink: 'https://checkout.dodopayments.com/buy/starter-plan',
      inrAmount: isAnnual ? 2988 : 299
    },
    {
      id: 'pro',
      name: 'Growth Pro',
      desc: 'For growing businesses demanding full conversion momentum.',
      priceUSD: isAnnual ? 15 : 19,
      priceINR: isAnnual ? 649 : 799,
      popular: true,
      features: [
        'Unlimited Verified Testimonials',
        'Unlimited Embed Widgets',
        'Remove Branding Completely',
        '500 AI Marketing Credits/mo',
        'CSV Data Export',
        'Priority Founder Support'
      ],
      buttonText: 'Unlock Growth Pro',
      usdLink: 'https://checkout.dodopayments.com/buy/pro-plan',
      inrAmount: isAnnual ? 7788 : 799
    },
    {
      id: 'agency',
      name: 'Agency Scale',
      desc: 'Designed for agencies managing multiple client sites.',
      priceUSD: isAnnual ? 39 : 49,
      priceINR: isAnnual ? 1599 : 1999,
      popular: false,
      features: [
        'Unlimited Workspaces & Sub-accounts',
        'Custom Domain Embeds',
        '2,000 AI Credits / month',
        'White-label Widget Styling',
        'Webhook & API Integrations',
        'Dedicated 1-on-1 Slack Channel'
      ],
      buttonText: 'Get Agency Scale',
      usdLink: 'https://checkout.dodopayments.com/buy/agency-plan',
      inrAmount: isAnnual ? 19188 : 1999
    }
  ];

  const handlePlanClick = (plan) => {
    if (plan.id === 'free') {
      window.location.href = '/dashboard';
      return;
    }

    if (currency === 'INR') {
      // Indian users ke liye direct zero-commission UPI popup
      setSelectedPlanDetails(plan);
      setUpiModalOpen(true);
    } else {
      // Global users ke liye direct payment link
      window.open(plan.usdLink || 'https://checkout.dodopayments.com', '_blank');
    }
  };

  const faqs = [
    {
      q: 'How does the 7-day expiring invite link work?',
      a: 'When you create a client request in your dashboard, a unique secure link is generated. Your client has 7 days to submit their rating and testimonial before the token expires, preventing unauthorized or spam entries.'
    },
    {
      q: 'Can I switch currencies or cancel my plan anytime?',
      a: 'Yes. You can switch between USD and INR billing depending on your location. Subscriptions carry no lock-in contract and you can cancel anytime with 1-click.'
    },
    {
      q: 'What is your refund policy?',
      a: 'We offer a straightforward, no-questions-asked 7-day money-back guarantee on all paid plans. Email us at support@truproof.com and we process refunds within 5-7 business days.'
    },
    {
      q: 'How does the embed widget integrate with my website?',
      a: 'You simply copy a single lightweight HTML <iframe> code snippet from your dashboard and paste it into WordPress, Webflow, Shopify, Framer, Wix, or custom React apps.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-black text-blue-500 tracking-tight">
            <ShieldCheck className="w-6 h-6 text-blue-500" /> TruProof
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs font-semibold text-slate-300 hover:text-white transition">
              Home
            </Link>
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20 space-y-12">
        {/* Header with Currency & Billing Toggles */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Simple, High-Trust Pricing
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Automate verified social proof and generate high-converting AI marketing copy in seconds.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Currency Selector */}
            <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center gap-1">
              <button
                onClick={() => setCurrency('USD')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                  currency === 'USD' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                USD ($ Global)
              </button>
              <button
                onClick={() => setCurrency('INR')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                  currency === 'INR' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                INR (₹ India / UPI)
              </button>
            </div>

            {/* Monthly / Annual Toggle */}
            <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center gap-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                  billingCycle === 'monthly' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                  billingCycle === 'annual' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Annual <span className="text-[10px] text-emerald-400 font-extrabold bg-emerald-500/10 px-1.5 py-0.5 rounded">20% OFF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Founding Member Banner */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 border border-blue-500/40 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Soft Launch Founding Offer
            </span>
            <h2 className="text-lg font-bold text-white">Get Pro Tier for {isIndia ? '₹499 / mo' : '$12 / mo'} Lifetime</h2>
            <p className="text-xs text-slate-300">Limited to the first 100 beta founders. Lock in early-adopter pricing permanently.</p>
          </div>
          <button
            onClick={() => handlePlanClick({ id: 'pro', name: 'Founding Member Pro', inrAmount: 499, usdLink: 'https://checkout.dodopayments.com/buy/founding-pro' })}
            className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition shadow-lg shadow-blue-600/25 flex items-center gap-2"
          >
            Claim Founding Seat <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl p-6 flex flex-col justify-between space-y-6 relative transition border ${
                p.popular
                  ? 'bg-slate-900/90 border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/50'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">{p.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{p.desc}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">
                    {isIndia ? `₹${p.priceINR}` : `$${p.priceUSD}`}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">/ month</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                  {p.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePlanClick(p)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  p.popular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                {p.buttonText} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-2xl mx-auto space-y-4 pt-10 border-t border-slate-900">
          <h2 className="text-xl font-bold text-center text-white">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((f, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full text-left p-4 text-xs font-bold text-white flex items-center justify-between"
                >
                  <span>{f.q}</span>
                  {faqOpen === idx ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {faqOpen === idx && (
                  <p className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-2">
                    {f.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Zero-Commission UPI Payment Modal (India Users) */}
      {upiModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-5 relative shadow-2xl">
            <button
              onClick={() => setUpiModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                <QrCode className="w-3 h-3" /> Instant UPI Activation
              </span>
              <h3 className="text-base font-bold text-white">Pay via Any UPI App</h3>
              <p className="text-xs text-slate-400">
                Plan: <strong className="text-white">{selectedPlanDetails?.name}</strong> • Amount: <strong className="text-emerald-400">₹{selectedPlanDetails?.inrAmount}</strong>
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center space-y-3">
              <p className="text-[11px] text-slate-400">Scan via Google Pay, PhonePe, or Paytm:</p>
              
              {/* Dynamic QR Code Generator */}
              <div className="flex justify-center py-1">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=${officialUpiId}&pn=TruProof&am=${selectedPlanDetails?.inrAmount}&cu=INR`} 
                  alt="UPI QR Code" 
                  className="rounded-lg border-2 border-slate-800 p-1 bg-white"
                />
              </div>

              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs">
                <span className="font-mono text-slate-300">{officialUpiId}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(officialUpiId);
                    setCopiedUpi(true);
                    setTimeout(() => setCopiedUpi(false), 2000);
                  }}
                  className="text-[11px] bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded font-medium flex items-center gap-1"
                >
                  {copiedUpi ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedUpi ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-center text-slate-400 leading-tight">
              Pay ₹{selectedPlanDetails?.inrAmount} and share reference to <a href="mailto:support@truproof.com" className="text-blue-400 underline">support@truproof.com</a> for immediate account activation.
            </p>

            <button
              onClick={() => {
                alert('Thank you! Once verified, your Pro limits will reflect in your dashboard.');
                setUpiModalOpen(false);
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition"
            >
              I Have Made The Payment
            </button>
          </div>
        </div>
      )}

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
