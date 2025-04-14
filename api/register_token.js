export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).send({ message: 'Only POST allowed' });

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyjTBMvpJaTySgvk5wOrEJJOsp-bFnEP0jAjd4y5nF55jk_oR-3nudd3f5Lqee95MsM/exec';

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const text = await response.text(); // Google Script может вернуть текст
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: 'Google Script error', detail: err.message });
  }
}
