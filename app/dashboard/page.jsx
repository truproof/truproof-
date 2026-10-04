'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, UserButton, RedirectToSignIn } from '@clerk/nextjs';
import { 
  Check, X, Copy, RefreshCw, Star, MessageSquare, Clock, CheckCircle, 
  Sparkles, Loader2, Code, Download, Coins, Video, ArrowUpRight, 
  CheckSquare, Square
} from 'lucide-react';

export default function FounderDashboard() {
  const { user, isLoaded } = useUser();
  const businessId = user?.id || 'default-biz';

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  // Business Entitlements & Usage State
  const [plan, setPlan] = useState('free');
  const [aiCredits, setAiCredits] = useState(20);
  const [requestsSent, setRequestsSent] = useState(1);
  const [generatingAiId, setGeneratingAiId] = useState(null);
  const [aiAssets, setAiAssets] = useState({});

  const embedCodeSnippet = `<iframe src="https://truproof.vercel.app/embed/${businessId}" width="100%" height="450" frameborder="0" loading="lazy"></iframe>`;

  // Plan Limits definition (USD Mandate)
  const limits = {
    free: { maxRequests: 10, maxApproved: 10, maxAi: 20 },
    starter: { maxRequests: 50, maxApproved: 50, maxAi: 100 },
    pro: { maxRequests: 9999, maxApproved: 9999, maxAi: 500 },
    agency: { maxRequests: 9999, maxApproved: 9999, maxAi: 2000 }
  };

  const currentLimit = limits[plan] || limits.free;

  const fetchReviews = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/testimonials?businessId=${businessId}&status=all`);
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
  const isRequestLimitReached = plan === 'free' && requestsSent >= currentLimit.maxRequests;

  // 5-Step Launch Setup Checklist
  const hasCreatedInvite = generatedLink !== '' || requestsSent > 0;
  const hasApprovedReview = approvedCount > 0;
  const hasGeneratedAi = Object.keys(aiAssets).length > 0;
  const hasCopiedEmbed = copiedEmbed;

  const handleModerate = async (id, action) => {
    if (action === 'approve' && isApprovedLimitReached) {
      alert('Free Plan limit reached (Max 10 Approved Testimonials). Please upgrade to Pro.');
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
      alert('You have 0 AI Credits remaining. Please upgrade to Pro for 500 monthly credits.');
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
    if (isRequestLimitReached) {
      alert('Monthly invite limit reached (10/10 on Free Plan). Please upgrade to send more invites.');
      return;
    }

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

  const exportCSV = () => {
    if (plan === 'free' || plan === 'starter') {
      alert('CSV Export is available on Pro and Agency plans.');
      return;
    }
    if (testimonials.length === 0) return;
    const headers = ['ID', 'Client Name', 'Email', 'Rating', 'Review', 'Video URL', 'Status', 'Date'];
    const rows = testimonials.map((t) => [
      t.id,
      `"${t.clientName || ''}"`,
      `"${t.clientEmail || ''}"`,
      t.rating,
      `"${(t.reviewText || '').replace(/"/g, '""')}"`,
      `"${t.videoUrl || ''}"`,
      t.status,
      t.createdAt
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'truproof_testimonials.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredTestimonials = testimonials.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16 font-sans">
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-black text-xl tracking-tight text-blue-500">
            TruProof
          </Link>
          <span className="text-[11px] bg-blue-500/10 text-blue-400 font-bold px-2.5 py-0.5 rounded-full border border-blue-500/30 uppercase">
            Plan: {plan}
          </span>
          <Link 
            href="/pricing"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] text-blue-400 font-bold hover:underline"
          >
            Upgrade Plan <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-semibold">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Credits: {aiCredits}</span>
          </div>
          <button
            onClick={exportCSV}
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-200 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button
            onClick={fetchReviews}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <div className="ml-1 border-l border-slate-800 pl-3 flex items-center">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        {/* Onboarding Setup Checklist */}
        <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-blue-400" /> Launch Setup Checklist
              </h2>
              <p className="text-xs text-slate-400">Complete these 5 steps to start converting visitors with live social proof.</p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg">
              {[hasCreatedInvite, requestsSent >= 5, hasApprovedReview, hasCopiedEmbed, hasGeneratedAi].filter(Boolean).length} / 5 Done
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
            <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${hasCreatedInvite ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-800/60 border-slate-800 text-slate-400'}`}>
              {hasCreatedInvite ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : <Square className="w-4 h-4 shrink-0" />}
              <span>1. Create invite</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${requestsSent >= 5 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-800/60 border-slate-800 text-slate-400'}`}>
              {requestsSent >= 5 ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : <Square className="w-4 h-4 shrink-0" />}
              <span>2. Send to 5 clients</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${hasApprovedReview ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-800/60 border-slate-800 text-slate-400'}`}>
              {hasApprovedReview ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : <Square className="w-4 h-4 shrink-0" />}
              <span>3. Approve 1st review</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${hasCopiedEmbed ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-800/60 border-slate-800 text-slate-400'}`}>
              {hasCopiedEmbed ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : <Square className="w-4 h-4 shrink-0" />}
              <span>4. Copy widget code</span>
            </div>
            <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${hasGeneratedAi ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-800/60 border-slate-800 text-slate-400'}`}>
              {hasGeneratedAi ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : <Square className="w-4 h-4 shrink-0" />}
              <span>5. Make 1st AI post</span>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Received</p>
              <MessageSquare className="w-5 h-5 text-blue-400 opacity-60" />
            </div>
            <h3 className="text-2xl font-bold text-white">{totalCount}</h3>
            <p className="text-[11px] text-slate-400">Monthly Invites: {requestsSent} / {currentLimit.maxRequests}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Approved (Live)</p>
              <CheckCircle className="w-5 h-5 text-emerald-400 opacity-60" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-400">{approvedCount}</h3>
            <p className="text-[11px] text-slate-400">Limit: {plan === 'free' ? `${approvedCount} / 10 approved` : 'Unlimited'}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Pending Moderation</p>
              <Clock className="w-5 h-5 text-amber-400 opacity-60" />
            </div>
            <h3 className="text-2xl font-bold text-amber-400">{pendingCount}</h3>
            <p className="text-[11px] text-slate-400">Ready to review & publish</p>
          </div>
        </div>

        {/* Embed Widget Generator */}
        <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-bold text-white">Embed Testimonials on Your Website</h2>
          </div>
          <p className="text-xs text-slate-400">Paste this HTML snippet into WordPress, Webflow, Shopify, Framer, or custom React apps:</p>
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-2.5">
            <code className="text-xs font-mono text-slate-300 truncate flex-1">{embedCodeSnippet}</code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(embedCodeSnippet);
                setCopiedEmbed(true);
                setTimeout(() => setCopiedEmbed(false), 2000);
              }}
              className="shrink-0 flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-md font-medium transition"
            >
              {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedEmbed ? 'Copied' : 'Copy Code'}
            </button>
          </div>
        </div>

        {/* Generate Link Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-semibold text-white">Create 7-Day Expiring Invite Link</h2>
          <p className="text-xs text-slate-400">Send this secure link to verified clients to collect text or video reviews.</p>

          <form onSubmit={handleGenerateLink} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Client Name (optional)"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Client Email (optional)"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={generating || isRequestLimitReached}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-lg px-4 py-2 transition disabled:opacity-50"
            >
              {generating ? 'Generating...' : isRequestLimitReached ? 'Limit Reached' : 'Generate Invite Link'}
            </button>
          </form>

          {generatedLink && (
            <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-lg flex items-center justify-between gap-2">
              <span className="text-xs text-blue-300 font-mono truncate">{generatedLink}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="shrink-0 flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-xs px-2.5 py-1 rounded font-medium"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLink ? 'Copied' : 'Copy'}
              </button>
            </div>
          )}
        </div>

        {/* Moderation Queue */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-white">Testimonials Moderation Queue</h2>
            <div className="flex gap-1.5 bg-slate-950 p-1 rounded-lg text-xs font-medium border border-slate-800">
              {['all', 'pending', 'approved', 'rejected'].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-3 py-1 rounded-md capitalize transition ${
                    filter === item ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-800">
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400">Loading reviews...</div>
            ) : filteredTestimonials.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">No testimonials found for this filter.</div>
            ) : (
              filteredTestimonials.map((item) => (
                <div key={item.id} className="p-5 space-y-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            item.status === 'approved'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : item.status === 'rejected'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {item.status || 'pending'}
                        </span>
                      </div>

                      <p className="text-sm text-slate-200 leading-relaxed font-normal">"{item.reviewText}"</p>

                      {item.videoUrl && (
                        <a
                          href={item.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-400 hover:underline font-medium"
                        >
                          <Video className="w-3.5 h-3.5" /> View Video (Loom / YouTube)
                        </a>
                      )}

                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="font-semibold text-slate-200">{item.clientName}</span>
                        {item.company && <span>• {item.company}</span>}
                        <span>• {item.clientEmail}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleGenerateAiPack(item)}
                        disabled={generatingAiId === item.id}
                        className="flex items-center gap-1.5 text-xs bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 border border-indigo-500/30 px-3 py-1.5 rounded-lg font-medium transition disabled:opacity-50"
                      >
                        {generatingAiId === item.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        )}
                        Generate AI Pack (-1)
                      </button>

                      {item.status !== 'approved' && (
                        <button
                          onClick={() => handleModerate(item.id, 'approve')}
                          className="flex items-center gap-1 text-xs bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 rounded-lg font-medium transition"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve
                        </button>
                      )}
                      {item.status !== 'rejected' && (
                        <button
                          onClick={() => handleModerate(item.id, 'reject')}
                          className="flex items-center gap-1 text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 px-3 py-1.5 rounded-lg font-medium transition"
                        >
                          <X className="w-3.5 h-3.5" /> Reject
                        </button>
                      )}
                    </div>
                  </div>

                  {aiAssets[item.id] && (
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mt-3 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-bold text-indigo-400 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Auto-Generated Marketing Copies
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                          <span className="font-semibold text-slate-200 block mb-1">LinkedIn Post</span>
                          <p className="text-slate-400 whitespace-pre-line">{aiAssets[item.id].linkedInPost}</p>
                        </div>
                        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                          <span className="font-semibold text-slate-200 block mb-1">Twitter / X Post</span>
                          <p className="text-slate-400 whitespace-pre-line">{aiAssets[item.id].twitterThread}</p>
                        </div>
                        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                          <span className="font-semibold text-slate-200 block mb-1">Micro Case Study</span>
                          <p className="text-slate-400 whitespace-pre-line">{aiAssets[item.id].caseStudy}</p>
                        </div>
                        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                          <span className="font-semibold text-slate-200 block mb-1">Ad Copy / Headline</span>
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
      </main>
    </div>
  );
}
