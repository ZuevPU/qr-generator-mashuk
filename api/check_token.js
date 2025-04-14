// ✅ /api/check_token.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  const scriptUrl = 'https://script.google.com/macros/s/AKfycbyjTBMvpJaTySgvk5wOrEJJOsp-bFnEP0jAjd4y5nF55jk_oR-3nudd3f5Lqee95MsM/exec';

  try {
    const response = await fetch(`${scriptUrl}?token=${token}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('[check_token error]', err);
    res.status(500).json({ error: 'Token check failed' });
  }
}
