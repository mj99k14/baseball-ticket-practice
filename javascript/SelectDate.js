const games = [
  { date: "01.10", time: "18:30", home: "LG", away: "삼성" },
  { date: "01.11", time: "18:30", home: "LG", away: "두산" },
  { date: "01.12", time: "18:30", home: "LG", away: "기아" },
  { date: "01.13", time: "18:30", home: "LG", away: "넥센" },
];

const list = document.getElementById("game-list");

games.forEach((game) => {
  const item = document.createElement("div");
  item.classList.add("game-item");

  // 정보를 날짜/시간과 팀명으로 분리해서 생성
  item.innerHTML = `
        <div class="game-info">
            <div class="game-date-time">${game.date} <span style="font-size: 1.4rem;">${game.time}</span></div>
            <div class="game-teams">${game.home} VS ${game.away}</div>
        </div>
        <button class="res-button">예매</button>
    `;

  // 어르신들은 버튼뿐만 아니라 '카드 전체'를 눌러도 이동되는 것이 훨씬 편합니다.
  item.addEventListener("click", () => {
    appState.date = game.date;
    appState.time = game.time;
    appState.home = game.home;
    appState.away = game.away;
    location.href = "Select-Seat.html";
  });

  list.appendChild(item);
});
