# CoRead AI
**CoRead AI** is a Chrome extension that reads selected text aloud and lets you ask contextual questions—powered by local AI for privacy and speed.

---

## 🚀 Features

- **Select text** on any webpage and have it read aloud instantly.
- **Ask questions** about the selected content and get simple, contextual answers.
- **No tab switching**—everything happens in a friendly popup.
- **Works offline** with your local LLM (Ollama/TinyLlama/phi3).

---

## 🛠️ Installation & Activation

### 1. **Set Up Ollama (Local AI Backend)**

- [Download Ollama](https://ollama.com/download) and install it for your OS.
- Open a terminal and run: ollama run tinyllama
- *(Or use another supported model, e.g., `ollama run phi3`)*

- (Optional, recommended)  
Allow Chrome extensions to access Ollama by setting the environment variable:

- **Windows (Command Prompt as admin):**
  ```
  setx OLLAMA_ORIGINS "chrome-extension://*" /M
  ```
- **Mac (Terminal):**
  ```
  launchctl setenv OLLAMA_ORIGINS "chrome-extension://*"
  ```
Then restart Ollama and your browser.

---

### 2. **Install the Extension in Chrome**

1. Download or clone this repository:
  ```
  git clone https://github.com/your-username/coread-ai.git
  ```
  Or download as ZIP and extract.

2. Go to `chrome://extensions/` in Chrome.

3. Enable **Developer mode** (top right).

4. Click **Load unpacked**.

5. Select the folder where you cloned or extracted this repo.

---

## 🚦 How to Use

1. **Go to any webpage.**
2. **Select some text.**
3. Click the **CoRead AI** icon in your Chrome toolbar.
4. Click **READ** to hear the text aloud.
5. After the prompt, type your question and click **ASK COPILOT**.
6. The answer will be spoken and shown in the popup.

---

## 🛟 Troubleshooting

- **The extension doesn’t read aloud:**  
- Make sure Chrome’s sound is on.
- Test Chrome’s TTS in another tab.
- Check the extension’s background script console for errors.

- **The AI answers aren’t showing up:**  
- Ensure Ollama is running and the model is loaded.
- Check your environment variables and restart your browser if needed.

---

## 📫 Contact

Questions, ideas, or feedback?  
Open an issue or reach out on [LinkedIn](https://www.linkedin.com/in/pranjali-talanki).

---

**Happy listening & learning!**

