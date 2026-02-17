document.addEventListener("DOMContentLoaded", function () {
  // 요소를 가져올 때 ID가 확실히 있는지 확인하세요.
  const displayCountSeat = document.getElementById("seat-count");
  const displaySeatPrice1 = document.getElementById("seat-price1"); // 티켓 총액 칸
  const displayGameData = document.getElementById("Gamedate");
  const displayTotalPrice = document.getElementById("total-price-display"); // 하단 검정 박스

  // 데이터 가져오기
  const priceValue = sessionStorage.getItem("Seatprice") || "0";
  const gameDate = sessionStorage.getItem("GameDate") || "날짜 정보 없음";
  const countValue = Number(sessionStorage.getItem("selectedSeatCount")) || 0;

  // 요소가 하나라도 없으면 중단
  if (!displayCountSeat || !displayTotalPrice) {
    console.error("필요한 HTML 요소를 찾을 수 없습니다. ID를 확인하세요.");
    return;
  }

  const total = priceValue * countValue; //총액
  // 글씨 집어넣기
  displayCountSeat.textContent = `총 ${countValue}석 선택하셨습니다.`;
  displayGameData.textContent = `일시: ${gameDate}`;
  displaySeatPrice1.textContent = `티켓 총액: ${Number(priceValue).toLocaleString()}원`;
  displayTotalPrice.textContent = `총 결제금액: ${Number(total).toLocaleString()}원`;
  sessionStorage.setItem("displayTotalPrice", displayTotalPrice);
  console.log("데이터 로드 완료:", { countValue, priceValue, gameDate });
});
