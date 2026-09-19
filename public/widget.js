(function () {
  const container = document.getElementById('truproof-widget');
  if (!container) return;

  const businessId = container.getAttribute('data-business-id') || 'demo-biz';
  const apiBase = window.location.origin;

  fetch(`${apiBase}/api/testimonials?businessId=${businessId}`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.testimonials || data.testimonials.length === 0) return;

      const html = data.testimonials.map((t) => `
        <div style="background:#fff; border:1px solid #E2E8F0; border-radius:12px; padding:20px; box-shadow:0 2px 4px rgba(0,0,0,0.05); margin-bottom:15px; font-family:sans-serif;">
          <div style="color:#F59E0B; margin-bottom:6px;">${'★'.repeat(t.rating || 5)}</div>
          <p style="color:#334155; font-size:14px; line-height:1.5; margin:0 0 10px 0;">"${t.review_text}"</p>
          <div style="font-size:12px; font-weight:bold; color:#0F172A;">${t.customer_name} <span style="color:#64748B; font-weight:normal;">— ${t.company || 'Customer'}</span></div>
        </div>
      `).join('');

      container.innerHTML = `
        <div style="max-width:700px; margin:auto;">
          <h3 style="font-family:sans-serif; font-size:18px; font-weight:bold; margin-bottom:12px; color:#0F172A;">Wall of Proof</h3>
          ${html}
        </div>
      `;
    })
    .catch((err) => console.error('TruProof Widget Error:', err));
})();
