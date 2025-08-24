// api/gptSearch.js
import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // stored securely in Vercel
    });

    // Call OpenAI GPT model
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // cheaper & faster, adjust if needed
      messages: [
        {
          role: "system",
          content:
            "You are a movie recommendation system. Respond with only 10 movie names along with their original language in two characters, separated by semicolons. Example: Gadar,hi; The Proposal,en; The Intern,en",
        },
        { role: "user", content: query },
      ],
      temperature: 0.7,
    });

    const result = completion.choices[0].message.content;

    res.status(200).json({ result });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Failed to fetch from OpenAI" });
  }
}
