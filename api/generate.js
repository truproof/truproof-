export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { clientName, company, review, assetType } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key configure nahi hai' });
  }

  let prompt = '';
  if (assetType === 'case_study') {
    prompt = `Write a polished 300-word B2B case study with Challenge, Solution, and Measurable Results based on this testimonial.\nClient: ${clientName} (${company})\nReview: "${review}"`;
  } else if (assetType === 'linkedin') {
    prompt = `Write an engaging, high-converting personal story LinkedIn post celebrating client results with 3 actionable takeaways and relevant hashtags.\nClient: ${clientName} (${company})\nReview: "${review}"`;
  } else if (assetType === 'twitter') {
    prompt = `Write a punchy 3-tweet viral breakdown thread showcasing client transformation and concrete proof.\nClient: ${clientName} (${company})\nReview: "${review}"`;
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Content generate nahi ho paya.';
    return res.status(200).json({ output: resultText });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
