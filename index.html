<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Chat với AI</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f0f2f5; padding: 20px; }
        #chatbox { background: white; padding: 15px; border-radius: 10px; max-width: 600px; margin: auto; height: 500px; overflow-y: auto; }
        .user, .ai { margin: 10px 0; }
        .user { text-align: right; color: blue; }
        .ai { text-align: left; color: green; }
        #form { display: flex; justify-content: center; margin-top: 20px; }
        input[type="text"] { width: 70%; padding: 10px; border-radius: 5px; border: 1px solid #ccc; }
        button { padding: 10px 20px; border: none; background: #4CAF50; color: white; border-radius: 5px; cursor: pointer; }
        button:hover { background: #45a049; }
    </style>
</head>
<body>

<div id="chatbox"></div>

<form id="form" onsubmit="return sendMessage()">
    <input type="text" id="userInput" placeholder="Nhập tin nhắn..." autocomplete="off" required>
    <button type="submit">Gửi</button>
</form>

<script>
    const apiKey = "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";

    async function sendMessage() {
        const inputField = document.getElementById('userInput');
        const message = inputField.value.trim();
        if (!message) return false;

        const chatbox = document.getElementById('chatbox');
        chatbox.innerHTML += `<div class="user"><strong>Bạn:</strong> ${message}</div>`;
        inputField.value = '';
        chatbox.scrollTop = chatbox.scrollHeight;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: message}]
            })
        });

        const data = await response.json();
        const aiMessage = data.choices[0].message.content;

        chatbox.innerHTML += `<div class="ai"><strong>AI:</strong> ${aiMessage}</div>`;
        chatbox.scrollTop = chatbox.scrollHeight;

        return false;
    }
</script>

</body>
</html>
