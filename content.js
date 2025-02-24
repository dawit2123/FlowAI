console.log("Content script loaded");

// Debounce function (350ms delay)
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

// Get element text (supports contenteditable)
const getElementText = (element) => {
  if (!element) {
    console.error("Element is undefined or null.");
    return "";
  }

  if (element.isContentEditable) {
    return element.innerText || element.textContent || "";
  }

  if (element.tagName === "TEXTAREA" || element.tagName === "INPUT") {
    return element.value || "";
  }

  console.error("Unsupported element type:", element);
  return "";
};

// Get page context (meta + body text)
const getPageContext = () => {
  try {
    const metaContent = Array.from(document.querySelectorAll("meta"))
      .map((meta) => meta.getAttribute("content") || "")
      .join(" ");

    const bodyText = document.body.innerText
      .replace(/\s+/g, " ")
      .substring(0, 2000); // First 2000 characters

    return `${metaContent} ${bodyText}`.substring(0, 2500); // Total limit
  } catch (error) {
    console.error("Error getting context:", error);
    return "";
  }
};

// Display suggestion inline as ghost text
const showSuggestion = (element, text) => {
  if (!text) return;

  // Remove existing suggestions
  const existing = document.querySelector(".flow-ai-suggestion");
  if (existing) existing.remove();

  // Create a ghost suggestion element
  const suggestion = document.createElement("span");
  suggestion.className = "flow-ai-suggestion";
  suggestion.textContent = text;

  // Match the text area's style
  const style = window.getComputedStyle(element);
  suggestion.style.font = style.font;
  suggestion.style.color = "#888"; // Gray color for suggestion
  suggestion.style.opacity = "0.7";

  // Position the suggestion inline
  const cursorPosition = element.selectionStart;
  const beforeText = element.value.substring(0, cursorPosition);
  const afterText = element.value.substring(cursorPosition);

  // Create a temporary container to measure the width of the text before the cursor
  const temp = document.createElement("div");
  temp.style.position = "absolute";
  temp.style.visibility = "hidden";
  temp.style.whiteSpace = "pre-wrap";
  temp.style.font = style.font;
  temp.textContent = beforeText;
  document.body.appendChild(temp);

  // Calculate the position of the cursor
  const cursorLeft = temp.offsetWidth;
  document.body.removeChild(temp);

  // Position the suggestion element
  const rect = element.getBoundingClientRect();
  suggestion.style.position = "absolute";
  suggestion.style.left = `${rect.left + cursorLeft}px`;
  suggestion.style.top = `${rect.top}px`;

  // Append the suggestion to the body
  document.body.appendChild(suggestion);

  // Store the suggestion in the element's dataset
  element.dataset.suggestion = text;
};

// Handle input
const handleInput = debounce((event) => {
  const target = event.target;
  console.log("Input event target:", target);

  if (
    !target.matches('textarea, input[type="text"], [contenteditable="true"]')
  ) {
    console.log("Invalid target element. Skipping.");
    return;
  }

  const text = getElementText(target);
  console.log("Element text:", text);

  if (!text) {
    console.log("Text is empty. Skipping.");
    return;
  }

  const trimmedText = text.trim();
  console.log("Trimmed text:", trimmedText);

  const words = trimmedText.split(/\s+/).filter((w) => w.length > 0);
  console.log("Words:", words);

  if (words.length >= 3) {
    const prefix = words.slice(-3).join(" ");
    const context = getPageContext();

    console.log("Sending request:", {
      prefix,
      context: context.substring(0, 100) + "...",
    });

    chrome.runtime.sendMessage(
      { type: "getCompletion", prefix, context },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error("Message error:", chrome.runtime.lastError);
          return;
        }
        if (response?.completion) {
          showSuggestion(target, response.completion);
        }
      }
    );
  }
}, 3500);

// Handle tab acceptance
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    const target = e.target;
    if (target.dataset?.suggestion) {
      e.preventDefault();

      const suggestion = target.dataset.suggestion;
      const cursorPosition = target.selectionStart;
      const currentText = target.value;

      // Insert the suggestion at the cursor position
      const newText =
        currentText.substring(0, cursorPosition) +
        suggestion +
        currentText.substring(cursorPosition);

      // Update the text area
      target.value = newText;

      // Move the cursor to the end of the inserted text
      target.selectionStart = target.selectionEnd =
        cursorPosition + suggestion.length;

      // Remove the suggestion from the DOM and dataset
      const suggestionElement = document.querySelector(".flow-ai-suggestion");
      if (suggestionElement) suggestionElement.remove();
      delete target.dataset.suggestion;
    }
  }
});

// Initialize
document.addEventListener("input", handleInput);
console.log("Event listeners registered");
