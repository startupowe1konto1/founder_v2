export default async function handler(req: any, res: any) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 2. Make the secure call to the AI provider
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY, // Hidden environment variable!
        "anthropic-version": "2023-06-01"
      },
      // Pass along the prompt and model details sent from your React app
      body: JSON.stringify(req.body)
    });

    // 3. Send the AI's response back to your React app
    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: 'Failed to generate analysis' });
  }
}
