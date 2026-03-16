document.addEventListener("DOMContentLoaded", function () {
  const displayCountSeat = document.getElementById("seat-count");
  const selectedSeatsDiv = document.getElementById("selected-seats");
  const displaySeatPrice1 = document.getElementById("seat-price1");
  const displayCommission = document.getElementById("commission");
  const displayGameData = document.getElementById("Gamedate");
  const displayTotalPrice = document.getElementById("total-price-display");
  const unitPriceDisplay = document.getElementById("unit-price-display");
  const matchTag = document.querySelector(".match-tag");

  const { seatPrice, seatUnitPrice, seatCount, gameDate, gameHome, gameAway, selectedSeats } =
    getBookingSession();

  if (!displayCountSeat || !displayTotalPrice) {
    console.error("필요한 HTML 요소를 찾을 수 없습니다. ID를 확인하세요.");
    return;
  }

  // match-tag
  if (matchTag) matchTag.textContent = `${gameHome} VS ${gameAway}`;

  // 좌석 단가
  if (unitPriceDisplay) unitPriceDisplay.textContent = `${seatUnitPrice.toLocaleString()}원`;

  displayCountSeat.textContent = `총 ${seatCount}석 선택하셨습니다.`;
  if (displayGameData) displayGameData.textContent = `일시: ${gameDate}`;
  if (displaySeatPrice1) displaySeatPrice1.textContent = `티켓 총액: ${seatPrice.toLocaleString()}원`;
  if (displayCommission) displayCommission.textContent = `수수료: ${COMMISSION_FEE.toLocaleString()}원`;

  // 좌석 번호 표시
  if (selectedSeatsDiv && selectedSeats.length > 0) {
    selectedSeatsDiv.textContent = `선택 좌석: ${selectedSeats.join(", ")}`;
  }

  const total = seatPrice + COMMISSION_FEE;
  displayTotalPrice.textContent = `총 결제금액: ${total.toLocaleString()}원`;
});
