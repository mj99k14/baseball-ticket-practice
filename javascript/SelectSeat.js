// ===== 1. 공통 설정 =====
const ROWS = 5;
const COLS = 5;
const TOTAL_SEATS = ROWS * COLS;
const price = 14000;

// 전역 변수
let gridA;
let gridB;
let seatCount;
let count = 0;
let selectedSeatNames = []; // 좌석 번호 저장

// ===== 페이지 로딩 =====
document.addEventListener("DOMContentLoaded", function () {
  const selectCompletion = document.getElementById("selectCompletion");

  gridA = document.getElementById("gridA");
  gridB = document.getElementById("gridB");
  seatCount = document.getElementById("seat-count");

  if (!gridA || !gridB || !seatCount) {
    console.error("HTML 요소를 찾을 수 없습니다.");
    return;
  }

  // A구역 / B구역 생성
  createSeat(gridA, "A");
  createSeat(gridB, "B");

  // 완료 버튼 클릭
  selectCompletion.addEventListener("click", () => {
    if (selectedSeatNames.length < 1) {
      alert("먼저 좌석을 선택해주세요");
    } else {
      sessionStorage.setItem("selectedSeatCount", selectedSeatNames.length);
      sessionStorage.setItem(
        "selectedSeats",
        JSON.stringify(selectedSeatNames),
      );
      sessionStorage.setItem("Seatprice", selectedSeatNames.length * price);

      location.href = "Seat-check-price.html";
    }
  });
});

// ===== 좌석 상태 랜덤 =====
function SeatCondition() {
  return Math.random() < 0.2 ? "disabled" : "selectable";
}

// ===== 좌석 생성 =====
function createSeat(targetGrid, areaName) {
  for (let i = 0; i < TOTAL_SEATS; i++) {
    const seat = document.createElement("div");
    seat.classList.add("seat");
    seat.classList.add(SeatCondition());

    // 좌석 번호 표시 (A1, A2, B1...)
    seat.textContent = areaName + (i + 1);

    targetGrid.appendChild(seat);
    seatcolorchange(seat);
  }
}

// ===== 클릭 이벤트 =====
function seatcolorchange(seat) {
  seat.addEventListener("click", () => {
    if (seat.classList.contains("disabled")) {
      alert("선택 불가 좌석입니다!");
      return;
    }

    const seatName = seat.textContent;

    // 선택할 때
    if (seat.classList.contains("selectable")) {
      if (count < 4) {
        seat.classList.remove("selectable");
        seat.classList.add("selected");
        count++;

        selectedSeatNames.push(seatName);

        seatCount.textContent = `총 ${selectedSeatNames.length}석`;
      } else {
        alert("최대 4매까지 가능합니다");
      }
    }

    // 취소할 때
    else if (seat.classList.contains("selected")) {
      if (confirm("좌석을 취소하시겠습니까?")) {
        seat.classList.remove("selected");
        seat.classList.add("selectable");
        count--;

        const idx = selectedSeatNames.indexOf(seatName);
        if (idx !== -1) {
          selectedSeatNames.splice(idx, 1);
        }

        seatCount.textContent =
          selectedSeatNames.length > 0
            ? `총 ${selectedSeatNames.length}석`
            : "좌석을 선택해 주세요";
      }
    }
  });
}
