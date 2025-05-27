// popup.js
document.addEventListener('DOMContentLoaded', function() {
    const readTextButton = document.getElementById('readTextButton');
    const askCopilotButton = document.getElementById('askCopilotButton');
    const questionInput = document.getElementById('questionInput');
    const copilotOutput = document.getElementById('copilotOutput');

    readTextButton.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => window.getSelection().toString().trim()
            }, (results) => {
                if (results && results[0].result) {
                    chrome.runtime.sendMessage({
                        command: "readAloud",
                        text: results[0].result
                    });
                }
            });
        });
    });

    askCopilotButton.addEventListener('click', function() {
        const question = questionInput.value.trim();
        if (!question) return;
        copilotOutput.textContent = "Thinking...";
        chrome.runtime.sendMessage({ command: "askLLM", question: question }, (response) => {
            if (response.answer) {
                copilotOutput.textContent = response.answer;
            } else if (response.error) {
                copilotOutput.textContent = "Error: " + response.error;
            }
        });
    });
});
