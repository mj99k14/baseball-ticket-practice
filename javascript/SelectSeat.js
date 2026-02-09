//좌석 5*5 를 두판 생성 50 
//행
const ROWS = 5;
//열
const COLS = 5;
//자석 
const TOTAL_SEATS = 25;
//그리드 컨테이너
const grid = document.getElementById('grid');
const seatCount = document.getElementById("seat-count");



//상태 결정함수
function SeatCondition(){

    const random = Math.random();
    //확률
    if(random < 0.2){
        //선택 불가
        return "disabled";
    }else{
        //선택 가능
        return"selectable";
    }

}

function createSeat() {
  for (let i = 0; i <TOTAL_SEATS; i++) {
    //요소 만듬
    const seat = document.createElement("div");
    // id 뒤에 seat를 붙침
    seat.classList.add("seat");
    // 그다음에 seatcondition을 랜덤으로 붙침

    seat.classList.add(SeatCondition());
    //grid에 생성된 랜덤 자리를 붙침
    grid.appendChild(seat);
    
    //좌석 상태 변화 함수 호출
    seatcolorchange(seat);

  }
}

createSeat();
let count = 0;
// 클릭좌서상태 변화
function seatcolorchange(seat){
    
  seat.addEventListener("click", () =>{
    //이좌석이 disabled 상태인지확인
    //contains -> 그안 에 뭐가 들어있는지?
    if(seat.classList.contains("disabled")){
        alert("선택 불가 좌석입니다!");
        return;
    } else if (seat.classList.contains("selectable")){

        // 카운트가 4 미만일경우 
        console.log(count)
        if(count < 4){
            seat.classList.remove("selectable");
            seat.classList.add("selected");
            count ++; // 카운트 추가
            appState.seats.push(seat);   // 좌석 저장
            alert("선택되었습니다.");
            console.log(seat.classList.contains("selected"));
             //총 자석 
            seatCount.textContent = `총 ${appState.seats.length}석`;
     

        }
        else{
            alert("최대 4매까지 가능합니다 ");
        }

    }else if (seat.classList.contains("selected")){
        
        alertnc(seat);
    }
  });
 }



//상태가 바꾸면 
//색상은 직접 바꾸지않고 CLASS변경을 통해 CSS가 알아서 바뀌게 함




 function alertnc(seat){
    //이미 선택된 좌석을 다시 클릭한 경우라면
    // 선택 해제인지 경고
    //취소면  selectable 
    //아니면 그대로

    if(confirm("선택하신 자석입니다. 자석 취소할까요?")){
        alert('취소되었습니다');
        seat.classList.remove("selected");
        seat.classList.add("selectable");
        count --;

    }
    // 선택된 자석 수 뼤기
    const idx = appState.seats.indexOf(seat);
    if(idx !== -1){
        appState.seats.splice(idx,1);

    }
    seatCount.textContent = `총 ${appState.seats.length}석`;
    
    
 }


//좌석 선택 완료
fun
//좌석이 한칸 이상이 되어야 다음페이지 넘어가기
//한칸도 선택안되면 선택해주세요 