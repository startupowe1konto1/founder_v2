export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY environment variable");
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Using gemini-2.0-flash as the most widely supported and stable model
    const modelName = "gemini-2.0-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    // TRACER LOG: If you don't see this in Vercel logs, the code didn't update!
    console.log(`🚀 RUNNING SECURE BACKEND. Target model: ${modelName}`);

    const { prompt } = req.body;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      return res.status(response.status).json({ error: 'Gemini API Error', details: data });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("Server API Error:", error);
    return res.status(500).json({ error: 'Failed to generate analysis' });
  }
}
