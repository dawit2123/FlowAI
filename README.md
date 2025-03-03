# 🚀 Flow AI - AI-Powered Autocomplete Chrome extension

<img src="https://img.shields.io/badge/-Solo%20Project-f2336f?&style=for-the-badge&logoColor=white" />

## 🌟 Project Vision 

Welcome to **Flow AI**, a Chrome extension that brings **AI-powered autocomplete** to every text field on the web! Whether you're writing a blog, filling out a form, or composing an email, Flow AI acts as your AI copilot, suggesting completions in real-time. Flow AI enhances your productivity by providing intelligent, context-aware suggestions as you type.

With support for the **OpenRouter API**, Flow AI delivers fast and accurate completions, making it the perfect companion for writers, developers, and anyone who spends time typing on the web.
---

## 🚀 Key Features

### 🔹 **Inline Autocomplete**

- Suggests completions **inline** as you type, seamlessly integrating with your workflow.
- Displays suggestions in a subtle, non-intrusive way, matching the font and style of the text field.

### 🔹 **Context-Aware Suggestions**

- Uses **page context** (meta tags and body text) to generate relevant completions.
- Ensures suggestions are tailored to the content of the webpage.

### 🔹 **3-Word Trigger**

- Activates autocomplete only after you type **3 words**, ensuring suggestions are meaningful and contextually relevant.

### 🔹 **Tab to Accept**

- Press **Tab** to accept the suggestion and insert it into the text field.
- The cursor automatically moves to the end of the inserted text for a smooth typing experience.

### 🔹 **Debounced Input**

- Uses **debouncing** to optimize performance and reduce unnecessary API calls.
- Ensures minimal latency while typing.

---

## 🛠️ How It Works

### 1️⃣ **Detect Text Fields**

Flow AI automatically detects **text areas**, **input fields**, and **contenteditable elements** on any webpage.

### 2️⃣ **Analyze Context**

When you type, Flow AI collects **page context** (meta tags and body text) to generate relevant suggestions.

### 3️⃣ **Generate Completions**

Using the **OpenRouter API**, Flow AI generates completions based on the text you've typed and the page context.

### 4️⃣ **Display Suggestions**

Suggestions are displayed **inline** at the cursor position, matching the font and style of the text field.

### 5️⃣ **Accept with Tab**

Press **Tab** to accept the suggestion and continue typing seamlessly.

---

## 🛠️ Installation

### Prerequisites

- A **OpenRouter API key** (get it from [OpenRouter's website](https://openrouter.ai/settings/keys)).
- Google Chrome or any Chromium-based browser.

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/dawit2123/FlowAI.git
   cd flowai
   ```

2. **Add Your API Key**:

   - Open `background.js`.
   - Replace `OPENROUTER_API_KEY` with your actual Open router API key.

3. **Load the Extension**:

   - Open Chrome and go to `chrome://extensions/`.
   - Enable **Developer Mode** (toggle in the top-right corner).
   - Click **Load unpacked** and select the `flow-ai-chrome-extension` folder.

4. **Start Using Flow AI**:
   - Open any webpage with a text field.
   - Type 3+ words and wait for the suggestion to appear.
   - Press **Tab** to accept the suggestion.

---

## 🛠️ Built With

- **OpenRouter API**: For generating intelligent completions.
- **Chrome Extensions API**: For interacting with webpages and handling user input.
- **JavaScript**: For the core logic of the extension.
- **CSS**: For styling the autocomplete UI.

---

## 📌 Developed by **Dawit Zewdu**

🚀 Flow AI is designed to make typing on the web faster, smarter, and more enjoyable. Stay tuned for more updates and features!

- Built with ❤️ for developers and writers everywhere.

---
