let selectedText = "";

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "readAloud" && message.text) {
    selectedText = message.text;

    // First, speak the selected text
    chrome.tts.speak(selectedText, { lang: 'en-US', rate: 1.0 });

    // Wait for the speech to finish, then speak the prompt and notify the popup
    chrome.tts.onEvent.addListener(function handler(event) {
      if (event.type === "end") {
        chrome.tts.onEvent.removeListener(handler);

        const prompt = "Do you have any doubts regarding this data?";
        chrome.tts.speak(prompt, { lang: 'en-US', rate: 1.0 });

        chrome.runtime.sendMessage({
          command: "copilotPrompt",
          prompt: prompt
        });
      }
    });

    sendResponse({ status: "started reading" });
  }

  else if (message.command === "askLLM" && message.question) {
    // Call LLM API with selectedText and question
    handleLLMRequest(message.question, selectedText, sendResponse);
    return true; // Keep the message channel open for async response
  }
});

// LLM handler for Ollama (tinyllama, phi3, etc.)
async function handleLLMRequest(question, context, sendResponse) {
  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "tinyllama", // or "phi3", "qwen:0.5b", etc.
        prompt: `Context: ${context}\n\nQuestion: ${question}\n\nAnswer:`,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown API error" }));
      throw new Error(`API error: ${response.status} ${response.statusText} - ${errorData.error || 'No additional error info'}`);
    }

    const data = await response.json();
    const answer = data.response || "Sorry, I couldn't generate an answer.";

    // Speak the answer aloud
    chrome.tts.speak(answer, { lang: 'en-US', rate: 1.0 });

    // Send answer to popup
    sendResponse({ answer: answer });

  } catch (error) {
    sendResponse({ error: "LLM Error: " + error.message });
  }
}
