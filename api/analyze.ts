export default async function handler(req: any, res: any) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 2. Build the Gemini API URL with your secret key
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY environment variable");
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Using gemini-1.5-flash as it is the fastest and highly capable for text analysis
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    // Extract the prompt we sent from the React frontend
    const { prompt } = req.body;

    // 3. Make the secure call to Google Gemini
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        // This generationConfig tells Gemini we strictly want JSON back
        generationConfig: {
          responseMimeType: "application/json", 
        }
      })
    });

    const data = await response.json();

    // Catch any API-specific errors returned by Google
    if (!response.ok) {
      console.error("Gemini API Error:", data);
      return res.status(response.status).json({ error: 'Gemini API Error', details: data });
    }

    // 4. Send the successful response back to your React app
    return res.status(200).json(data);

  } catch (error) {
    console.error("Server API Error:", error);
    return res.status(500).json({ error: 'Failed to generate analysis' });
  }
}
