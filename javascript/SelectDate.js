//날짜 자동으로 생성
const games = [];
const today = new Date();

for (let i = 1; i <= 4; i++) {
  const gameDate = new Date();
  gameDate.setDate(today.getDate() + i);

  const month = (gameDate.getMonth() + 1).toString().padStart(2, "0");

  const day = gameDate.getDate().toString().padStart(2, "0");

  games.push({
    date: `${month}월${day}`,
    time: "18:30",
    home: "LG",
    away: ["삼성", "두산", "기아", "넥센"][i - 1],
  });
}

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
    sessionStorage.setItem("GameDate", appState.date);
    appState.time = game.time;
    sessionStorage.setItem("GameTime", appState.time);
    appState.home = game.home;
    sessionStorage.setItem("GanmeHome", appState.home);
    appState.away = game.away;
    sessionStorage.setItem("GanmeAway", appState.away);

    sessionStorage.setItem("GameArea", appState.area);
    location.href = "Select-Seat.html";
  });

  list.appendChild(item);
});
