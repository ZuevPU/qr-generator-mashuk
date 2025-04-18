export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token, timestamp } = req.body;
    
    // Проверка на наличие токена
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    const scriptUrl = "https://script.google.com/macros/s/AKfycbyvItiJPCKa4Sq5nuAbM8FKiI3y-hq5YdSEgXgcA4x6LvZgUQ7P8XHkT587bCA2C3Sh/exec?action=register_token";

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token,
        used: false,
        timestamp: timestamp || new Date().toISOString()
      })
    });

    // Попытка вернуть JSON, если это возможно
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const json = await response.json();
      res.status(200).json(json);
    } else {
      const text = await response.text();
      res.status(200).send(text);
    }
  } catch (error) {
    console.error("Ошибка регистрации токена:", error);
    res.status(500).json({ error: 'Failed to register token' });
  }
}
