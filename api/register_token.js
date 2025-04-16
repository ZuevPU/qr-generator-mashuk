export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { token, used, timestamp } = req.body;
    const scriptUrl = "https://script.google.com/macros/s/AKfycbwsu18BPytS4DYGN79wuFg9B1ignjrnrEqaAM70uHgPgerGOwkMIkaJeq9aQXXg2UHg/exec?action=register_token";

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token, used, timestamp })
    });

    const text = await response.text();
    res.status(200).send(text);
  } catch (error) {
    console.error("Ошибка регистрации токена:", error);
    res.status(500).json({ error: 'Failed to register token' });
  }
}
