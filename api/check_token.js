export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { token } = req.query;

  const scriptUrl = 'https://script.google.com/macros/s/AKfycbyjTBMvpJaTySgvk5wOrEJJOsp-bFnEP0jAjd4y5nF55jk_oR-3nudd3f5Lqee95MsM/exec';

  try {
    const response = await fetch(`${scriptUrl}?action=check_token&token=${token}`);
    const text = await response.text();

    // Проверяем, начинается ли ответ с {
    if (!text.trim().startsWith("{")) {
      throw new Error("Ответ от скрипта не JSON");
    }

    const json = JSON.parse(text);
    res.status(200).json(json);
  } catch (err) {
    console.error('[check_token] Ошибка:', err);
    res.status(500).json({ error: 'Ошибка при проверке токена' });
  }
}
