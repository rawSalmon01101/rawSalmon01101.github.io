document.addEventListener("DOMContentLoaded", function () {
    const inputBox = document.querySelector(".box");
    const sendButton = document.querySelector(".send-button");
    const chatViewport = document.querySelector(".chat-viewport");

    // Load chat history from Local Storage
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistory.forEach(({ type, messageText }) => addMessageToChat(type, messageText));

    // Event listener for the send button
    sendButton.addEventListener("click", function () {
        const messageText = inputBox.value.trim();
        if (messageText) {
            addMessageToChat("user", messageText);  // Add user message to chat window
            chatHistory.push({ type: "user", messageText });  // Save user message to history
            localStorage.setItem("chatHistory", JSON.stringify(chatHistory));  // Update Local Storage
            inputBox.value = "";  // Clear input box

            // Simulate a chatbot response after a short delay (for demonstration)
            setTimeout(() => {
                const botResponse = "This is a chatbot response"; // Example response
                addMessageToChat("chatbot", botResponse);
                chatHistory.push({ type: "chatbot", messageText: botResponse });
                localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
            }, 500);
        }
    });

    // Function to add a message to the chat viewport
    function addMessageToChat(type, messageText) {
        const newMessageDiv = document.createElement("div");
        newMessageDiv.classList.add(type === "user" ? "sender" : "chatbot");

        const newMessage = document.createElement("p");
        newMessage.classList.add("texting");
        newMessage.textContent = messageText;

        newMessageDiv.appendChild(newMessage);
        chatViewport.appendChild(newMessageDiv);
    }
});
