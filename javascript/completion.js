document.addEventListener("DOMContentLoaded", () => {
  //기본 정보
  const reservation = document.getElementById("reservationNumber");
  const countseat = document.getElementById("countseat"); // 좌석 번호 표시용
  const count = document.getElementById("count");
  const totalprice = document.getElementById("displayTotalPrice");

  // 세션에서 값 꺼내기
  const seatCount = sessionStorage.getItem("selectedSeatCount");
  const finalPrice = sessionStorage.getItem("Seatprice");
  const selectedSeats = JSON.parse(sessionStorage.getItem("selectedSeats"));

  //선택 좌석 표시
  if (selectedSeats && selectedSeats.length > 0) {
    countseat.textContent = selectedSeats.join(", ");
  } else {
    countseat.textContent = "좌석 정보 없음";
  }

  // 매수 표시
  count.textContent = seatCount + "매";

  // 총 금액 표시
  totalprice.textContent = Number(finalPrice).toLocaleString() + "원";

  //예약번호 생성
  const now = new Date();
  const datePart =
    now.getFullYear().toString().slice(2) +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    now.getDate().toString().padStart(2, "0");

  const randomPart = Math.floor(1000 + Math.random() * 9000);
  reservation.textContent = "R" + datePart + randomPart;

  //  모달
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modalText");
  const modalClose = document.getElementById("modalClose");

  setTimeout(() => {
    modalText.textContent =
      "예매 연습이 정상적으로 완료되었습니다.\n실제 예매와 같은 방식으로 진행되었습니다.";
    modal.style.display = "flex";
  }, 2000);

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
