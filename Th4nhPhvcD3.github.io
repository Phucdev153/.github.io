<!DOCTYPE html>
<html>
<head>
  <title>Phúc thả thính</title>
  <meta charset="UTF-8">
  <style>
    body {
      background-color: black;
      color: lime;
      font-family: monospace;
      padding: 30px;
    }
    h1 {
      color: cyan;
    }
    button {
      padding: 10px;
      margin-top: 20px;
      background: lime;
      color: black;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>💚 Xin chào em, anh là Phúc - chuyên gia thả thính!</h1>
  <div id="text"></div>
  <button onclick="sendThinh()">Gửi thính</button>

  <script>
    const thinh = [
      "Em ơi, em có phải bug không? Vì nhìn em là anh crash tim.",
      "Tình anh như C++, càng lâu càng khó hiểu, nhưng anh vẫn yêu em.",
      "Dù em có là lỗi 404, anh vẫn tìm em suốt đời.",
      "Em như API token… thiếu em là anh không authenticate được trái tim mình."
    ];
    function sendThinh() {
      let t = thinh[Math.floor(Math.random() * thinh.length)];
      document.getElementById("text").innerHTML += t + "<br>";
    }
  </script>
</body>
</html>
