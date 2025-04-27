<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>PhucD3vBot</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="settings">
        <input type="color" id="themeColor" value="#007bff">
        <button onclick="changeTheme()">Đổi màu</button>
    </div>
    <div class="chatbox" id="chatbox">
        <div class="message bot">Xin chào! Tôi là <b>PhucD3vBot</b>. Bạn cần giúp gì?</div>
    </div>
    <div class="input-area">
        <input type="text" id="userInput" placeholder="Nhập tin nhắn...">
        <button onclick="sendMessage()">Gửi</button>
    </div>

    <script>
        const OPENAI_API_KEY = "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"; // Thêm API key vào đây

        function addMessage(content, sender) {
            const div = document.createElement('div');
            div.className = 'message ' + sender;
            div.innerHTML = content;
            document.getElementById('chatbox').appendChild(div);
            document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
        }

        async function sendMessage() {
            const input = document.getElementById('userInput');
            const text = input.value.trim();
            if (!text) return;
            addMessage("<b>Bạn:</b> " + text, 'user');
            input.value = '';

            addMessage("Đang gõ...", 'bot');

            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "Bạn là PhucD3vBot, một trợ lý thông minh, thân thiện." },
                        { role: "user", content: text }
                    ]
                })
            });

            const data = await res.json();
            const botReply = data.choices?.[0]?.message?.content || "❗ Lỗi phản hồi từ AI.";

            addMessage("<b>PhucD3vBot:</b> " + botReply, 'bot');
        }

        function changeTheme() {
            const color = document.getElementById('themeColor').value;
            document.documentElement.style.setProperty('--theme-color', color);
        }
    </script>
</body>
</html>
