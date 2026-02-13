const games = [
  { date: "01월10", time: "18:30", home: "LG", away: "삼성" },
  { date: "01월11", time: "18:30", home: "LG", away: "두산" },
  { date: "01월12", time: "18:30", home: "LG", away: "기아" },
  { date: "01월13", time: "18:30", home: "LG", away: "넥센" },
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

  // 카드전체 눌러도 넘어갈수잇음
  item.addEventListener("click", () => {
    appState.date = game.date;
    //session에 저장
    sessionStorage.setItem("GameDate",appState.date);
    appState.time = game.time;
    sessionStorage.setItem("GameTime",appState.time);
    appState.home = game.home;
    sessionStorage.setItem("GanmeHome",appState.home);
    appState.away = game.away;
    sessionStorage.setItem("GanmeAway",appState.away);

    sessionStorage.setItem("GameArea",appState.area);
    location.href = "Select-Seat.html";
  });
  
  list.appendChild(item);

});
