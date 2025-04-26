
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Th4nhPhvcD3v</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #0a0a0a;
            color: #fff;
            background-image: linear-gradient(rgba(20, 20, 20, 0.7) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(20, 20, 20, 0.7) 1px, transparent 1px);
            background-size: 20px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        
        .container {
            width: 100%;
            max-width: 400px;
            background-color: rgba(15, 5, 10, 0.9);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(255, 0, 60, 0.2);
            border: 1px solid rgba(255, 0, 60, 0.3);
        }
        
        .profile {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 0;
            border-bottom: 1px solid rgba(255, 0, 60, 0.3);
        }
        
        .avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 2px solid #ff003c;
            padding: 3px;
            position: relative;
            overflow: hidden;
        }
        
        .avatar img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .avatar::after {
            content: '';
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            border-radius: 50%;
            box-shadow: 0 0 15px #ff003c;
            z-index: -1;
        }
        
        .username {
            margin-top: 10px;
            color: #ff003c;
            font-size: 16px;
        }
        
        .time {
            margin-top: 5px;
            color: #aaa;
            font-size: 14px;
        }
        
        .section {
            padding: 20px;
            border-bottom: 1px solid rgba(255, 0, 60, 0.3);
        }
        
        .section-title {
            color: #ff003c;
            text-align: center;
            margin-bottom: 15px;
            font-size: 18px;
            letter-spacing: 1px;
        }
        
        .todo-form {
            display: flex;
            margin-bottom: 15px;
        }
        
        .todo-input {
            flex: 1;
            padding: 10px;
            background-color: rgba(30, 10, 15, 0.8);
            border: 1px solid rgba(255, 0, 60, 0.3);
            color: #fff;
            border-radius: 5px;
            margin-right: 10px;
        }
        
        .todo-button {
            padding: 10px 15px;
            background-color: #ff003c;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        .todo-button:hover {
            background-color: #d10030;
        }
        
        .todo-list {
            min-height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #aaa;
        }
        
        .music-section {
            background-color: rgba(30, 10, 20, 0.5);
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 10px;
        }
        
        .games-section {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-top: 15px;
        }
        
        .game-item {
            background-color: rgba(30, 10, 20, 0.7);
            border: 1px solid rgba(255, 0, 60, 0.3);
            border-radius: 5px;
            padding: 10px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .game-item:hover {
            background-color: rgba(255, 0, 60, 0.2);
            transform: translateY(-3px);
        }
        
        .game-item img {
            width: 100%;
            height: 60px;
            object-fit: cover;
            border-radius: 3px;
            margin-bottom: 5px;
        }
        
        .game-item .game-title {
            font-size: 12px;
            color: #fff;
        }
        
        .add-game {
            grid-column: span 2;
            background-color: rgba(30, 10, 20, 0.5);
            border: 1px dashed rgba(255, 0, 60, 0.5);
            border-radius: 5px;
            padding: 15px;
            text-align: center;
            cursor: pointer;
            color: #ff003c;
            margin-top: 10px;
        }
        
        .add-game:hover {
            background-color: rgba(255, 0, 60, 0.1);
        }
        
        .game-frame {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 1000;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        
        .game-frame iframe {
            width: 90%;
            height: 80%;
            border: none;
            border-radius: 5px;
            background-color: #000;
        }
        
        .close-game {
            position: absolute;
            top: 20px;
            right: 20px;
            background-color: #ff003c;
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .close-game:hover {
            background-color: #d10030;
        }
        
        .anime-section {
            min-height: 150px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #aaa;
        }
        
        .loading-text {
            margin-top: 10px;
            font-style: italic;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="profile">
            <div class="avatar">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3x3.jpg-Fp3HhPJoCYcEue3enxiyBgS3u3d8zw.jpeg" alt="Profile Avatar">
            </div>
            <div class="username">@Th4nhPhvcD3v</div>
            <div class="time" id="current-time">16:10:35</div>
        </div>
        
        <div class="section">
            <h2 class="section-title">TO DO LIST</h2>
            <div class="todo-form">
                <input type="text" class="todo-input" placeholder="Nhiệm vụ mới...">
                <button class="todo-button">ADD</button>
            </div>
            <div class="todo-list" id="todo-items">
                Chưa có việc nào...
            </div>
        </div>
        
        <div class="section">
            <div class="music-section">
                Sẵn sàng phát nhạc
            </div>
        </div>
        
        <div class="section">
            <h2 class="section-title">GAME HTML</h2>
            <div class="games-section" id="games-container">
                <!-- Game items will be added here -->
                <div class="add-game" id="add-game-btn">
                    <i>+ Thêm game mới</i>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Game Frame for playing games -->
    <div class="game-frame" id="game-frame">
        <button class="close-game" id="close-game">X</button>
        <iframe id="game-iframe" src="about:blank"></iframe>
    </div>

    <script>
        // Update time
        function updateTime() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;
        }
        
        setInterval(updateTime, 1000);
        updateTime();
        
        // Todo functionality
        const todoInput = document.querySelector('.todo-input');
        const todoButton = document.querySelector('.todo-button');
        const todoList = document.getElementById('todo-items');
        
        todoButton.addEventListener('click', addTodo);
        
        function addTodo() {
            const todoText = todoInput.value.trim();
            if (todoText === '') return;
            
            if (todoList.textContent === 'Chưa có việc nào...') {
                todoList.innerHTML = '';
            }
            
            const todoItem = document.createElement('div');
            todoItem.style.display = 'flex';
            todoItem.style.justifyContent = 'space-between';
            todoItem.style.alignItems = 'center';
            todoItem.style.padding = '8px 0';
            todoItem.style.borderBottom = '1px solid rgba(255, 0, 60, 0.2)';
            
            const todoTextElement = document.createElement('span');
            todoTextElement.textContent = todoText;
            todoTextElement.style.color = '#fff';
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.style.background = 'rgba(255, 0, 60, 0.7)';
            deleteButton.style.border = 'none';
            deleteButton.style.color = '#fff';
            deleteButton.style.padding = '3px 8px';
            deleteButton.style.borderRadius = '3px';
            deleteButton.style.cursor = 'pointer';
            
            deleteButton.addEventListener('click', () => {
                todoItem.remove();
                if (todoList.children.length === 0) {
                    todoList.textContent = 'Chưa có việc nào...';
                }
            });
            
            todoItem.appendChild(todoTextElement);
            todoItem.appendChild(deleteButton);
            todoList.appendChild(todoItem);
            
            todoInput.value = '';
        }
        
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
        
        // Games functionality
        const gamesContainer = document.getElementById('games-container');
        const addGameBtn = document.getElementById('add-game-btn');
        const gameFrame = document.getElementById('game-frame');
        const gameIframe = document.getElementById('game-iframe');
        const closeGameBtn = document.getElementById('close-game');
        
        // Sample games data - you can replace this with your own games
        const games = [
            // You will add your games here
        ];
        
        // Function to add a game to the UI
        function addGameToUI(game) {
            const gameItem = document.createElement('div');
            gameItem.className = 'game-item';
            gameItem.innerHTML = `
                <img src="${game.thumbnail || '/placeholder.svg?height=60&width=100'}" alt="${game.title}">
                <div class="game-title">${game.title}</div>
            `;
            
            gameItem.addEventListener('click', () => {
                openGame(game.url);
            });
            
            // Insert before the add button
            gamesContainer.insertBefore(gameItem, addGameBtn);
        }
        
        // Function to open a game in the iframe
        function openGame(url) {
            gameIframe.src = url;
            gameFrame.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
        
        // Close game frame
        closeGameBtn.addEventListener('click', () => {
            gameFrame.style.display = 'none';
            gameIframe.src = 'about:blank';
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
        
        // Add game button functionality
        addGameBtn.addEventListener('click', () => {
            const title = prompt('Nhập tên game:');
            if (!title) return;
            
            const url = prompt('Nhập URL của game HTML:');
            if (!url) return;
            
            const thumbnail = prompt('Nhập URL hình ảnh (để trống nếu không có):') || null;
            
            const newGame = { title, url, thumbnail };
            games.push(newGame);
            addGameToUI(newGame);
            
            // Save to localStorage
            localStorage.setItem('games', JSON.stringify(games));
        });
        
        // Load games from localStorage
        window.addEventListener('DOMContentLoaded', () => {
            const savedGames = JSON.parse(localStorage.getItem('games')) || [];
            games.push(...savedGames);
            
            // Add games to UI
            games.forEach(game => {
                addGameToUI(game);
            });
        });
    </script>
</body>
</html>
