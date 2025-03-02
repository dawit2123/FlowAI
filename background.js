console.log("Background script loaded");

const GEMINI_API_KEY = "INSERT_GEMINI_API_KEY_HERE";
const API_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// Handle messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getCompletion") {
    console.log("Received completion request");

    generateCompletion(request.prefix, request.context)
      .then((completion) => sendResponse({ completion }))
      .catch((error) => {
        console.error("API Error:", error);
        sendResponse({ completion: null });
      });

    return true; // Keep channel open
  }
});

// Generate completion
async function generateCompletion(prefix, context) {
  try {
    const prompt = `Based on this page context:
${context}

Continue this text: "${prefix}" and don't return the ${prefix} and return only the result.`;

    const response = await fetch(`${API_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
