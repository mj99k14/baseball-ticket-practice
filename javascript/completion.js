document.addEventListener("DOMContentLoaded", () => {
  const reservation = document.getElementById("reservationNumber");
  const selectedSeatsEl = document.getElementById("selectedSeats");
  const count = document.getElementById("count");
  const totalprice = document.getElementById("displayTotalPrice");
  const matchInfoEl = document.getElementById("matchInfo");
  const gameDateEl = document.getElementById("gameDate");

  // 세션에서 값 꺼내기
  const { seatCount, gameDate, gameHome, gameAway, selectedSeats } = getBookingSession();
  const rawFinalPrice = sessionStorage.getItem("finalTotalPrice");
  const seatPrice = Number(sessionStorage.getItem("Seatprice")) || 0;
  // 배송 방법 미선택 시 Seatprice + 수수료로 대체
  const finalPrice = rawFinalPrice !== null ? rawFinalPrice : seatPrice + COMMISSION_FEE;

  // 경기 정보 표시
  if (matchInfoEl) matchInfoEl.textContent = `${gameHome} VS ${gameAway}`;
  if (gameDateEl) gameDateEl.textContent = gameDate;

  // 선택 좌석 표시
  if (selectedSeats && selectedSeats.length > 0) {
    selectedSeatsEl.textContent = selectedSeats.join(", ");
  } else {
    selectedSeatsEl.textContent = "좌석 정보 없음";
  }

  // 매수·총금액 표시
  count.textContent = seatCount + "매";
  totalprice.textContent = Number(finalPrice).toLocaleString() + "원";

  // 예약번호 생성
  const now = new Date();
  const datePart =
    now.getFullYear().toString().slice(2) +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    now.getDate().toString().padStart(2, "0");
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  reservation.textContent = "R" + datePart + randomPart;

  // 모달 — 예약 정보를 읽을 시간을 준 후 표시 (3초)
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modalText");
  const modalClose = document.getElementById("modalClose");

  setTimeout(() => {
    modalText.textContent =
      "예매 연습이 정상적으로 완료되었습니다.\n실제 예매와 같은 방식으로 진행되었습니다.";
    modal.style.display = "flex";
  }, 3000);

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
