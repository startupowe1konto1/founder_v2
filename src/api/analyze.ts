try {
      // Notice we are calling OUR api now, not api.anthropic.com
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022", // Updated to a valid model name
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      
      const data = await response.json();
      
      // Extract the text from the response
      const text = data.content?.map((b: { type: string; text?: string }) => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed: AnalysisResult = JSON.parse(clean);
      setAnalysis(parsed);
    } catch (err) {
      setAnalysisError("Could not generate analysis. Please check your responses and try again.");
    } finally {
      setAnalysisLoading(false);
    }
