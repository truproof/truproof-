'use client';

import React, { useState, useEffect } from 'react';
import { Check, X, Copy, RefreshCw, Star, MessageSquare, Clock, CheckCircle, Sparkles, Loader2, Code, Download, Coins, Video } from 'lucide-react';

export default function FounderDashboard() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  // Entitlement & AI Credits State
  const [plan, setPlan] = useState('free');
  const [aiCredits, setAiCredits] = useState(3);
  const [generatingAiId, setGeneratingAiId] = useState(null);
  const [aiAssets, setAiAssets] = useState({});

  const businessId = 'default-biz';
  const embedCodeSnippet = `<iframe src="https://truproof.vercel.app/embed/${businessId}" width="100%" height="450" frameborder="0" loading="lazy"></iframe>`;

  const fetchReviews = async () => {
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
    fetchReviews();
  }, []);

  const handleModerate = async (id, action) => {
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
      alert('You have 0 AI Credits remaining. Please upgrade to Pro or purchase an AI top-up.');
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

  const totalCount = testimonials.length;
  const approvedCount = testimonials.filter((t) => t.status === 'approved').length;
  const pendingCount = testimonials.filter((t) => t.status === 'pending').length;

  const filteredTestimonials = testimonials.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <span className="font-black text-xl tracking-tight text-blue-600">TruProof</span>
          <span className="text-[11px] bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded-full border border-blue-200 uppercase">
            Plan: {plan}
          </span>
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
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Received</p>
              <h3 className="text-2xl font-bold mt-1 text-slate-800">{totalCount}</h3>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-500 opacity-20" />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Approved (Live)</p>
              <h3 className="text-2xl font-bold mt-1 text-emerald-600">{approvedCount}</h3>
            </div>
            <CheckCircle className="w-8 h-8 text-emerald-500 opacity-20" />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending Review</p>
              <h3 className="text-2xl font-bold mt-1 text-amber-500">{pendingCount}</h3>
            </div>
            <Clock className="w-8 h-8 text-amber-500 opacity-20" />
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

        {/* Generate Link */}
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
              disabled={generating}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg px-4 py-2 transition disabled:opacity-50"
            >
              {generating ? 'Generating...' : 'Generate Invite Link'}
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
