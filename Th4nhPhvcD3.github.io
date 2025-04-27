<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PhucD3vBot Chat</title>
    <style>
        :root {
            --main-color: #10a37f;
            --background-image: url(''); /* Thêm link hình nền ở đây nếu muốn */
        }
        body {
            margin: 0;
            height: 100vh;
            background: var(--background-image) no-repeat center center/cover, #000;
            display: flex;
            flex-direction: column;
            font-family: Arial, sans-serif;
            color: white;
        }
        header {
            background-color: var(--main-color);
            padding: 10px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
        }
        #chat-container {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
        }
        .message {
            margin-bottom: 15px;
        }
        .user {
            text-align: right;
        }
        .bot {
            text-align: left;
            color: #ccc;
        }
        footer {
            display: flex;
            padding: 10px;
            background-color: #111;
        }
        #input {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 5px;
        }
        #send {
            margin-left: 10px;
            background-color: var(--main-color);
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            color: white;
            cursor: pointer;
        }
        #settings {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #222;
            padding: 10px;
            border-radius: 10px;
        }
        #settings input {
            width: 100px;
        }
    </style>
</head>
<body>

    <header>PhucD3vBot 🤖</header>

    <div id="chat-container"></div>

    <footer>
        <input type="text" id="input" placeholder="Nhập tin nhắn...">
        <button id="send">Gửi</button>
    </footer>

    <div id="settings">
        <label>Màu chính: </label><input type="color" id="colorPicker" value="#10a37f">
    </div>

    <script>
        const chatContainer = document.getElementById('chat-container');
        const inputField = document.getElementById('input');
        const sendButton = document.getElementById('send');
        const colorPicker = document.getElementById('colorPicker');

        const apiKey = "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";

        sendButton.addEventListener('click', async () => {
            const userMessage = inputField.value.trim();
            if (userMessage === '') return;

            addMessage('user', userMessage);
            inputField.value = '';

            const botReply = await getBotReply(userMessage);
            addMessage('bot', botReply);
        });

        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendButton.click();
        });

        function addMessage(sender, text) {
            const message = document.createElement('div');
            message.className = `message ${sender}`;
            message.textContent = text;
            chatContainer.appendChild(message);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        async function getBotReply(message) {
            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [
                            { role: "system", content: "Bạn là PhucD3vBot, một trợ lý thân thiện." },
                            { role: "user", content: message }
                        ]
                    })
                });

                const data = await response.json();
                if (data.choices && data.choices.length > 0) {
                    return data.choices[0].message.content.trim();
                } else {
                    return "❗ Lỗi khi nhận phản hồi từ AI.";
                }
            } catch (error) {
                return "❗ Lỗi kết nối API.";
            }
        }

        colorPicker.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--main-color', e.target.value);
        });
    </script>

</body>
</html>
