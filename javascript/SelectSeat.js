//좌석 5*5 를 두판 생성 50 
//행
const ROWS = 5;
//열
const COLS = 5;
//자석 
const seat = 25;
//그리드 컨테이너
const grid = document.getElementById('grid');
// function creatSeat(){
//     for (let i = 0 ; i < (ROWS * COLS); i++){
//         const div = document.createElement("div");
//         div.className = "seat";
//         grid.appendChild(div);
//         console.log(grid);
//     }
// }


// creatSeat();

//상태 결정함수
function SeatCondition(){

    const random = Math.random();
    //확률
    if(random < 0.2){
        return "disabled";
    }else{
        return"selectable";
    }

}

function createSeat() {
  for (let i = 0; i < ROWS * COLS; i++) {
    const seat = document.createElement("div");

    seat.classList.add("seat");
    seat.classList.add(SeatCondition());

    grid.appendChild(seat);
  }
}

createSeat();


//예외처리 
    //이전단계 클릭경우
        //Select-seat-area.html로
              //appState.seats 리셋
              //appState.price 리셋
    //좌석 다시 선택 클릭 경우
        // 새로고침되도록
         //appState.seats 리셋