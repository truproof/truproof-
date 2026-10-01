'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, UserButton, RedirectToSignIn } from '@clerk/nextjs';
import { 
  Check, X, Copy, RefreshCw, Star, MessageSquare, Clock, CheckCircle2, 
  Sparkles, Loader2, Code2, Coins, ArrowUpRight, Gift, 
  LayoutDashboard, ShieldCheck, ExternalLink, Link2
} from 'lucide-react';

export default function FounderDashboard() {
  const { user, isLoaded } = useUser();
  const businessId = user?.id || 'default-biz';

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'embed' | 'referral'
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedDirectEmbed, setCopiedDirectEmbed] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  const [plan] = useState('free');
  const [aiCredits, setAiCredits] = useState(3);
  const [requestsSent, setRequestsSent] = useState(1);
  const [generatingAiId, setGeneratingAiId] = useState(null);
  const [aiAssets, setAiAssets] = useState({});

  const referralCode = user?.id ? user.id.slice(-6).toUpperCase() : 'TRU77';
  const referralLink = `https://truproof.vercel.app?ref=${referralCode}`;
  
  const directEmbedUrl = `https://truproof.vercel.app/embed/${businessId}`;
  const embedCodeSnippet = `<iframe src="https://truproof.vercel.app/embed/${businessId}" width="100%" height="450" frameborder="0" loading="lazy"></iframe>`;

  const limits = {
    free: { maxRequests: 10, maxApproved: 3, maxAi: 0 },
    starter: { maxRequests: 50, maxApproved: 15, maxAi: 3 },
    pro: { maxRequests: 300, maxApproved: 9999, maxAi: 20 },
    agency: { maxRequests: 1500, maxApproved: 9999, maxAi: 100 }
  };

  const currentLimit = limits[plan] || limits.free;

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/testimonials?status=all`);
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.testimonials || []);
      }
    } catch (err) {
      console.error('Failed to load testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchReviews();
    }
  }, [isLoaded, user]);

  const totalCount = testimonials.length;
  const approvedCount = testimonials.filter((t) => t.status === 'approved').length;
  const pendingCount = testimonials.filter((t) => t.status === 'pending').length;
  const isApprovedLimitReached = plan === 'free' && approvedCount >= currentLimit.maxApproved;

  const handleModerate = async (id, action) => {
    if (action === 'approve' && isApprovedLimitReached) {
      alert('Free Plan limit reached (Max 3 Approved Testimonials). Please upgrade to approve more.');
      return;
    }

    try {
      const res = await fetch('/api/testimonials/moderate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action })
      });
      const data = await res.json();
      if (data.success) {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status: action === 'approve' ? 'approved' : 'rejected' } : t))
        );
      }
    } catch (err) {
      alert('Status update failed');
    }
  };

  const handleGenerateAiPack = async (item) => {
    if (aiCredits <= 0) {
      alert('You have 0 AI Credits remaining. Please upgrade for more.');
      return;
    }

    setGeneratingAiId(item.id);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testimonialId: item.id,
          reviewText: item.reviewText,
          clientName: item.clientName,
          company: item.company || 'Customer'
        })
      });
      const data = await res.json();
      if (data.success) {
        setAiAssets((prev) => ({ ...prev, [item.id]: data.assets }));
        setAiCredits((prev) => Math.max(0, prev - 1));
      }
    } catch (err) {
      alert('AI generation service error');
    } finally {
      setGeneratingAiId(null);
    }
  };

  const handleGenerateLink = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId,
          clientName: clientName.trim(),
          clientEmail: clientEmail.trim()
        })
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedLink(data.inviteUrl);
        setRequestsSent((prev) => prev + 1);
        setClientName('');
        setClientEmail('');
      }
    } catch (err) {
      alert('Error creating invite link');
    } finally {
      setGenerating(false);
    }
  };

  const filteredTestimonials = testimonials.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900/90 border-b md:border-b-0 md:border-r border-slate-800 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-black text-blue-500 tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-blue-500" /> TruProof
            </Link>
            <span className="text-[10px] font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">
              {plan}
            </span>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Overview & Reviews
            </button>
            <button
              onClick={() => setActiveTab('embed')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'embed' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Code2 className="w-4 h-4" /> Embed Widget
            </button>
            <button
              onClick={() => setActiveTab('referral')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'referral' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Gift className="w-4 h-4" /> Referral Program
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800/80 space-y-4">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-amber-400" /> AI Credits
              </span>
              <span className="font-bold text-amber-300">{aiCredits} left</span>
            </div>
            <Link
              href="/pricing"
              className="block text-center text-[11px] font-bold bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 py-1.5 rounded-lg transition"
            >
              Upgrade Plan ↗
            </Link>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="text-xs">
              <p className="font-semibold text-white truncate max-w-[120px]">{user.primaryEmailAddress?.emailAddress || 'Founder'}</p>
              <p className="text-[10px] text-slate-500">Logged in</p>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Founder Dashboard</h1>
            <p className="text-xs text-slate-400">Manage client reviews, generate invite links, and publish proof.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchReviews}
              className="flex items-center gap-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3.5 py-2 rounded-xl transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <Link
              href="/pricing"
              className="flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded-xl transition shadow-lg shadow-blue-600/20"
            >
              Upgrade <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Received</span>
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-3xl font-black text-white">{totalCount}</div>
                <p className="text-[11px] text-slate-500">Invites: {requestsSent} / {currentLimit.maxRequests}</p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Approved (Live)</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-emerald-400">{approvedCount}</div>
                <p className="text-[11px] text-slate-500">Plan limit: {plan === 'free' ? `${approvedCount}/3` : 'Unlimited'}</p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Pending</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-amber-400">{pendingCount}</div>
                <p className="text-[11px] text-slate-500">Awaiting your approval</p>
              </div>
            </div>

            {/* Invite Generator Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Create 7-Day Expiring Invite Link</h3>
                <p className="text-xs text-slate-400">Share this link directly with your client via WhatsApp, Slack, or Email.</p>
              </div>

              <form onSubmit={handleGenerateLink} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Client Name (optional)"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="bg-slate-950 border border-slate-800 px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Client Email (optional)"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="bg-slate-950 border border-slate-800 px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={generating}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl px-4 py-2.5 transition disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate Invite Link'}
                </button>
              </form>

              {generatedLink && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-between gap-3">
                  <span className="text-xs font-mono text-blue-300 truncate">{generatedLink}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedLink);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2000);
                    }}
                    className="shrink-0 flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedLink ? 'Copied' : 'Copy Link'}
                  </button>
                </div>
              )}
            </div>

            {/* Moderation Queue */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
                <h3 className="text-base font-bold text-white">Testimonials Moderation Queue</h3>
                <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
                  {['all', 'pending', 'approved', 'rejected'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setFilter(item)}
                      className={`px-3 py-1.5 rounded-lg capitalize transition ${
                        filter === item ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-slate-800/80">
                {loading ? (
                  <div className="p-10 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" /> Loading reviews...
                  </div>
                ) : filteredTestimonials.length === 0 ? (
                  <div className="p-10 text-center text-xs text-slate-500">No testimonials found for this filter.</div>
                ) : (
                  filteredTestimonials.map((item) => (
                    <div key={item.id} className="p-5 space-y-4">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="space-y-2 max-w-2xl">
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(item.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <span
                              className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                                item.status === 'approved'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                  : item.status === 'rejected'
                                  ? 'bg-red-500/10 text-red-400 border-red-500/30'
                                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                              }`}
                            >
                              {item.status || 'pending'}
                            </span>
                          </div>

                          <p className="text-sm text-slate-200 font-normal leading-relaxed">"{item.reviewText}"</p>

                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="font-semibold text-white">{item.clientName}</span>
                            {item.company && <span>• {item.company}</span>}
                            <span>• {item.clientEmail}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 flex-wrap">
                          <button
                            onClick={() => handleGenerateAiPack(item)}
                            disabled={generatingAiId === item.id}
                            className="flex items-center gap-1.5 text-xs bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 border border-indigo-500/30 px-3 py-1.5 rounded-xl font-semibold transition disabled:opacity-50"
                          >
                            {generatingAiId === item.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                            )}
                            AI Pack (-1 credit)
                          </button>

                          {item.status !== 'approved' && (
                            <button
                              onClick={() => handleModerate(item.id, 'approve')}
                              className="flex items-center gap-1 text-xs bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-semibold transition"
                            >
                              <Check className="w-3.5 h-3.5" /> Approve
                            </button>
                          )}
                          {item.status !== 'rejected' && (
                            <button
                              onClick={() => handleModerate(item.id, 'reject')}
                              className="flex items-center gap-1 text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 px-3 py-1.5 rounded-xl font-semibold transition"
                            >
                              <X className="w-3.5 h-3.5" /> Reject
                            </button>
                          )}
                        </div>
                      </div>

                      {aiAssets[item.id] && (
                        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 mt-3 space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" /> Generated Marketing Copies
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                              <span className="font-semibold text-slate-300 block mb-1">LinkedIn Post</span>
                              <p className="text-slate-400 whitespace-pre-line">{aiAssets[item.id].linkedInPost}</p>
                            </div>
                            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                              <span className="font-semibold text-slate-300 block mb-1">Twitter / X Post</span>
                              <p className="text-slate-400 whitespace-pre-line">{aiAssets[item.id].twitterThread}</p>
                            </div>
                            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                              <span className="font-semibold text-slate-300 block mb-1">Micro Case Study</span>
                              <p className="text-slate-400 whitespace-pre-line">{aiAssets[item.id].caseStudy}</p>
                            </div>
                            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                              <span className="font-semibold text-slate-300 block mb-1">Ad Copy / Headline</span>
                              <p className="text-slate-400 whitespace-pre-line">{aiAssets[item.id].adCopy}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Embed Widget (UPDATED & ACCESSIBLE) */}
        {activeTab === 'embed' && (
          <div className="max-w-3xl space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Code2 className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="text-base font-bold text-white">Embed Testimonials on Your Site</h3>
                    <p className="text-xs text-slate-400">Share direct link or paste code on WordPress, Shopify, Framer etc.</p>
                  </div>
                </div>
                {/* Seedha naya tab kholne ke liye one-click button */}
                <a
                  href={`/embed/${businessId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-lg shadow-blue-600/20"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open Live Preview ↗
                </a>
              </div>

              {/* 1. Direct Web Link */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-blue-400" /> Direct Link (Browser / Client share)
                </label>
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-3">
                  <code className="text-xs font-mono text-blue-300 truncate flex-1">{directEmbedUrl}</code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(directEmbedUrl);
                      setCopiedDirectEmbed(true);
                      setTimeout(() => setCopiedDirectEmbed(false), 2000);
                    }}
                    className="shrink-0 flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    {copiedDirectEmbed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedDirectEmbed ? 'Copied Link' : 'Copy Link'}
                  </button>
                </div>
              </div>

              {/* 2. HTML Iframe Code */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" /> HTML Embed Tag (Website source code)
                </label>
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-3">
                  <code className="text-xs font-mono text-slate-400 truncate flex-1">{embedCodeSnippet}</code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(embedCodeSnippet);
                      setCopiedEmbed(true);
                      setTimeout(() => setCopiedEmbed(false), 2000);
                    }}
                    className="shrink-0 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedEmbed ? 'Copied Tag' : 'Copy Code'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Referral Program */}
        {activeTab === 'referral' && (
          <div className="max-w-3xl space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Earn Free Pro Access</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Share your personal referral link with creators and SaaS founders. For every user that upgrades to Pro, get 1 month free.
              </p>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-3">
                <code className="text-xs font-mono text-indigo-300 truncate flex-1">{referralLink}</code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(referralLink);
                    setCopiedRef(true);
                    setTimeout(() => setCopiedRef(false), 2000);
                  }}
                  className="shrink-0 flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedRef ? 'Copied' : 'Copy Link'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
