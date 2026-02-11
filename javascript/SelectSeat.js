// 1. 공통 설정
const ROWS = 5;
const COLS = 5;
const TOTAL_SEATS = 25;

// 전역 변수 선언 (함수 밖에서 선언해야 모든 함수가 공유 가능합니다)
let grid;
let seatCount;
let count = 0;

// 페이지 로딩 후 실행
document.addEventListener("DOMContentLoaded", function () {


    // 2. HTML 요소 가져오기 (HTML 파일의 ID와 정확히 일치해야 합니다)
    const selectCompletion = document.getElementById("selectCompletion");
    grid = document.getElementById('grid');
    seatCount = document.getElementById("seat-count");

    console.log("grid 요소:", document.getElementById('grid'));
    console.log("버튼 요소:", document.getElementById('selectCompletion'));
    console.log("카운트 요소:", document.getElementById('seat-count'));

    // [체크] 만약 요소를 못 찾았다면 콘솔에 에러를 띄웁니다.
    if (!grid || !selectCompletion || !seatCount) {
        console.error("HTML 요소를 찾을 수 없습니다. ID를 확인해 주세요!");
        return; // 에러가 있으면 여기서 중단
    }

    // 좌석 생성 함수 호출
    createSeat();

    // 완료 버튼 클릭 이벤트
    selectCompletion.addEventListener("click", () => {
        // appState는 state.js에 정의되어 있어야 합니다.
        if (!window.appState || appState.seats.length < 1) {
            alert("먼저 좌석을 선택해주세요");
        } else {
            //필요한 정보 저장
            localStorage.setItem("selectedSeatCount", appState.seats.length);
            location.href = 'Seat-check-price.html';
        }
    });
});

// 좌석 상태 결정 (랜덤)
function SeatCondition() {
    return Math.random() < 0.2 ? "disabled" : "selectable";
}

// 좌석 생성 함수
function createSeat() {
    for (let i = 0; i < TOTAL_SEATS; i++) {
        const seat = document.createElement("div");
        seat.classList.add("seat");
        seat.classList.add(SeatCondition());
        
        // grid 변수가 DOMContentLoaded 안에서 할당된 후 사용됩니다.
        grid.appendChild(seat);
        
        seatcolorchange(seat);
    }
}

// 클릭 시 좌석 상태 변화
function seatcolorchange(seat) {
    seat.addEventListener("click", () => {
        if (seat.classList.contains("disabled")) {
            alert("선택 불가 좌석입니다!");
            return;
        }

        if (seat.classList.contains("selectable")) {
            if (count < 4) {
                seat.classList.remove("selectable");
                seat.classList.add("selected");
                count++;
                
                // state.js의 appState 배열에 추가
                if (window.appState) appState.seats.push(seat);
                console.log(appState.seats)
                
                alert("선택되었습니다.");
                seatCount.textContent = `총 ${appState.seats.length}석`;
            } else {
                alert("최대 4매까지 가능합니다");
            }
        } else if (seat.classList.contains("selected")) {
            alertnc(seat);
        }
    });
}

// 좌석 취소 함수
function alertnc(seat) {
    if (confirm("선택하신 좌석입니다. 취소할까요?")) {
        seat.classList.remove("selected");
        seat.classList.add("selectable");
        
        if (window.appState) {
            const idx = appState.seats.indexOf(seat);
            if (idx !== -1) {
                appState.seats.splice(idx, 1);
                count--;
            }
        }
        
        alert('취소되었습니다');
        seatCount.textContent = appState.seats.length > 0 ? `총 ${appState.seats.length}석` : "좌석을 선택해 주세요";
    }
}