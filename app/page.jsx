'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, UserButton, RedirectToSignIn } from '@clerk/nextjs';
import { 
  Check, X, Copy, RefreshCw, Star, MessageSquare, Clock, CheckCircle, 
  Sparkles, Loader2, Code, Download, Coins, Video, ArrowUpRight, Gift, AlertCircle 
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
  const [copiedRef, setCopiedRef] = useState(false);

  // Business Entitlements & Usage State
  const [plan, setPlan] = useState('free');
  const [aiCredits, setAiCredits] = useState(3);
  const [requestsSent, setRequestsSent] = useState(1);
  const [referralCount, setReferralCount] = useState(0);
  const [generatingAiId, setGeneratingAiId] = useState(null);
  const [aiAssets, setAiAssets] = useState({});

  const referralCode = user?.id ? user.id.slice(-6).toUpperCase() : 'TRU77';
  const referralLink = `https://truproof.vercel.app?ref=${referralCode}`;
  const embedCodeSnippet = `<iframe src="https://truproof.vercel.app/embed/${businessId}" width="100%" height="450" frameborder="0" loading="lazy"></iframe>`;

  // Plan Limits definition
  const limits = {
    free: { maxRequests: 10, maxApproved: 3, maxAi: 0 },
    starter: { maxRequests: 50, maxApproved: 15, maxAi: 3 },
    pro: { maxRequests: 300, maxApproved: 9999, maxAi: 20 },
    agency: { maxRequests: 1500, maxApproved: 9999, maxAi: 100 }
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

  const handleModerate = async (id, action) => {
    if (action === 'approve' && isApprovedLimitReached) {
      alert('Free Plan limit reached (Max 3 Approved Testimonials). Please upgrade to Starter or Pro to approve more.');
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
      alert('You have 0 AI Credits remaining. Please upgrade or top-up (+20 Credits for ₹199 / $5).');
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

  // Agar user details load ho rahi hain toh loader dikhega
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  // Agar user logged in nahi hai, toh bina kisi dummy screen ke seedha login page par redirect hoga
  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-black text-xl tracking-tight text-blue-600">
            TruProof
          </Link>
          <span className="text-[11px] bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded-full border border-blue-200 uppercase">
            Plan: {plan}
          </span>
          <Link 
            href="/pricing"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] text-blue-600 font-bold hover:underline"
          >
            Upgrade Plan <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-lg text-xs font-semibold">
            <Coins className="w-3.5 h-3.5 text-amber-600" />
            <span>AI Credits: {aiCredits}</span>
          </div>
          <button
            onClick={exportCSV}
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button
            onClick={fetchReviews}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <div className="ml-1 border-l border-slate-200 pl-3 flex items-center">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        {/* Contextual Upgrade Alert if Limits Approaching */}
        {isApprovedLimitReached && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>You have reached the Free Plan limit of <strong>3 approved testimonials</strong>. Upgrade to Pro for unlimited reviews and removal of TruProof branding.</span>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition"
            >
              Upgrade Now
            </Link>
          </div>
        )}

        {/* Metric Cards & Usage Meters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Received</p>
              <MessageSquare className="w-5 h-5 text-blue-500 opacity-40" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{totalCount}</h3>
            <p className="text-[11px] text-slate-400">Monthly Invites: {requestsSent} / {currentLimit.maxRequests}</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Approved (Live)</p>
              <CheckCircle className="w-5 h-5 text-emerald-500 opacity-40" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-600">{approvedCount}</h3>
            <p className="text-[11px] text-slate-400">
              Limit: {plan === 'free' ? `${approvedCount} / 3 approved` : 'Unlimited'}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending Moderation</p>
              <Clock className="w-5 h-5 text-amber-500 opacity-40" />
            </div>
            <h3 className="text-2xl font-bold text-amber-500">{pendingCount}</h3>
            <p className="text-[11px] text-slate-400">Ready to review & publish</p>
          </div>
        </div>

        {/* Viral Growth & Referral Loop Banner */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Gift className="w-4 h-4 text-indigo-600" />
              <span className="font-bold text-xs text-indigo-950 uppercase tracking-wider">Referral Program</span>
            </div>
            <p className="text-xs text-indigo-900">
              <strong>Invite a founder, get 1 month of Pro free!</strong> Share your link with creators and SaaS builders.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-indigo-200 rounded-xl p-1.5 w-full sm:w-auto">
            <code className="text-xs font-mono text-indigo-900 px-2 truncate max-w-[220px]">{referralLink}</code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(referralLink);
                setCopiedRef(true);
                setTimeout(() => setCopiedRef(false), 2000);
              }}
              className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition"
            >
              {copiedRef ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Embed Widget Generator */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Embed Testimonials on Your Website</h2>
          </div>
          <p className="text-xs text-slate-600 mb-3">Copy and paste this HTML iframe tag into your WordPress, Webflow, Framer, or custom landing page:</p>
          <div className="flex items-center gap-2 bg-white border border-blue-200 rounded-lg p-2.5">
            <code className="text-xs font-mono text-slate-700 truncate flex-1">{embedCodeSnippet}</code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(embedCodeSnippet);
                setCopiedEmbed(true);
                setTimeout(() => setCopiedEmbed(false), 2000);
              }}
              className="shrink-0 flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md font-medium transition"
            >
              {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedEmbed ? 'Copied' : 'Copy Code'}
            </button>
          </div>
        </div>

        {/* Generate Link Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-800 mb-1">Create 7-Day Expiring Invite Link</h2>
          <p className="text-xs text-slate-500 mb-4">Send this secure link to verified clients to collect text or video reviews.</p>

          <form onSubmit={handleGenerateLink} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Client Name (optional)"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Client Email (optional)"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={generating || isRequestLimitReached}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg px-4 py-2 transition disabled:opacity-50"
            >
              {generating ? 'Generating...' : isRequestLimitReached ? 'Limit Reached' : 'Generate Invite Link'}
            </button>
          </form>

          {generatedLink && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between gap-2">
              <span className="text-xs text-blue-900 font-mono truncate">{generatedLink}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="shrink-0 flex items-center gap-1 bg-white border border-blue-300 text-blue-700 text-xs px-2.5 py-1 rounded font-medium hover:bg-blue-100"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLink ? 'Copied' : 'Copy'}
              </button>
            </div>
          )}
        </div>

        {/* Moderation Queue */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-800">Testimonials Moderation Queue</h2>
            <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-medium">
              {['all', 'pending', 'approved', 'rejected'].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-3 py-1 rounded-md capitalize transition ${
                    filter === item ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-500">Loading reviews...</div>
            ) : filteredTestimonials.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">No testimonials found for this filter.</div>
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
                              ? 'bg-emerald-50 text-emerald-700'
                              : item.status === 'rejected'
                              ? 'bg-red-50 text-red-600'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {item.status || 'pending'}
                        </span>
                      </div>

                      <p className="text-sm text-slate-800 leading-relaxed font-normal">"{item.reviewText}"</p>

                      {item.videoUrl && (
                        <a
                          href={item.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
                        >
                          <Video className="w-3.5 h-3.5" /> View External Video (Loom / YouTube)
                        </a>
                      )}

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">{item.clientName}</span>
                        {item.company && <span>• {item.company}</span>}
                        <span>• {item.clientEmail}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleGenerateAiPack(item)}
                        disabled={generatingAiId === item.id}
                        className="flex items-center gap-1.5 text-xs bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 px-3 py-1.5 rounded-lg font-medium transition disabled:opacity-50"
                      >
                        {generatingAiId === item.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        )}
                        Generate AI Pack (-1 credit)
                      </button>

                      {item.status !== 'approved' && (
                        <button
                          onClick={() => handleModerate(item.id, 'approve')}
                          className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg font-medium transition"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve
                        </button>
                      )}
                      {item.status !== 'rejected' && (
                        <button
                          onClick={() => handleModerate(item.id, 'reject')}
                          className="flex items-center gap-1 text-xs bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg font-medium transition"
                        >
                          <X className="w-3.5 h-3.5" /> Reject
                        </button>
                      )}
                    </div>
                  </div>

                  {aiAssets[item.id] && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-3 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs font-bold text-indigo-700 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Auto-Generated Marketing Copies
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <span className="font-semibold text-slate-700 block mb-1">LinkedIn Post</span>
                          <p className="text-slate-600 whitespace-pre-line">{aiAssets[item.id].linkedInPost}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <span className="font-semibold text-slate-700 block mb-1">Twitter / X Post</span>
                          <p className="text-slate-600 whitespace-pre-line">{aiAssets[item.id].twitterThread}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <span className="font-semibold text-slate-700 block mb-1">Micro Case Study</span>
                          <p className="text-slate-600 whitespace-pre-line">{aiAssets[item.id].caseStudy}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <span className="font-semibold text-slate-700 block mb-1">Ad Copy / Headline</span>
                          <p className="text-slate-600 whitespace-pre-line">{aiAssets[item.id].adCopy}</p>
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
