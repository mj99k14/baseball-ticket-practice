
const games = [
  { date: "01.10", time: "18:30", home: "LG", away: "삼성" },
  { date: "01.11", time: "18:30", home: "LG", away: "두산" },
  { date: "01.12", time: "18:30", home: "LG", away: "기아" },
  { date: "01.13", time: "18:30", home: "LG", away: "넥센" }
];

const list = document.getElementById('game-list');

games.forEach(game=>{
    const item = document.createElement("div");
    const info = document.createElement("div");
    const btn = document.createElement("button");

   info.textContent = `${game.date} ${game.time} ${game.home} VS ${game.away}`;
   

    btn.textContent = "예매";
    btn.addEventListener("click",()=>{
      appState.date =  game.date; // appState -> game저장 
      appState.time = game.time;
      appState.home = game.home;
      appState.away = game.away;
      location.href='Select-Seat.html'
      
    })

    item.appendChild(info);
    item.appendChild(btn);
    list.appendChild(item);
});



