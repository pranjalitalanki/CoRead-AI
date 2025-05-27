chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showChat") {
    const modal = document.getElementById("chatModal");
    modal.style.display = "block";

    const content = request.content;
    document.getElementById("askBtn").onclick = () => {
      const userQuestion = document.getElementById("userQuestion").value;
      askLocalAI(content, userQuestion);
    };
  }
});

document.querySelector(".close").onclick = () => {
  document.getElementById("chatModal").style.display = "none";
};

async function askLocalAI(context, question) {
  const responseBox = document.getElementById("aiResponse");
  responseBox.textContent = "Thinking...";

  const result = await fetch("http://localhost:5000/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ context, question })
  });

  const data = await result.json();
  responseBox.textContent = data.answer;
}
