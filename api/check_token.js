// ✅ /api/check_token.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Only GET method allowed' });

  const { token } = req.query;
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbzO-qc4Sc-B7BnEGL8fSQUkE6v7rUVL-spPkm9rU5urnA2HKKjsi8zmz7kjGrH5ZBcA/exec';

  if (!token) return res.status(400).json({ error: 'Missing token' });

  try {
    const response = await fetch(`${scriptUrl}?token=${encodeURIComponent(token)}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('[check_token] Error:', err);
    res.status(500).json({ error: 'Failed to check token' });
  }
}
