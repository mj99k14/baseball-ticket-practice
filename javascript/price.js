document.addEventListener("DOMContentLoaded", function () {
  // 좌석 개수 표시 부분
  // 글자를 보여줄 곳
  const dispalyCountSeat = document.getElementById("seat-count");
  const displySeatPrice1 = document.getElementById("seat-price1");
  const displyGameData =document.getElementById("Gamedate");
  const displySeatPrice2 = document.getElementById("seat-price2");

  const priceValue =(sessionStorage.getItem("Seatprice"));
  const gameDate = (sessionStorage.getItem("GameDate"));

  //  만약 요소를 못 찾았다면 콘솔에 에러를 띄웁니다.
  if (!dispalyCountSeat) {
    console.error("HTML 요소를 찾을 수 없습니다.");
    return; // 에러가 있으면 여기서 중단
  }

  // localStorage에서 좌석 개수 가져오기
  const countValue =
  Number(sessionStorage.getItem("selectedSeatCount")) || 0;

  // 글씨 집어넣기
  dispalyCountSeat.textContent = `총${countValue}석 입니다 `;
  displySeatPrice1.textContent =`티켓 총액: ${priceValue}원`;
  displyGameData.textContent =`일시: ${gameDate}`
  displySeatPrice2.textContent =`총 결제금액 ${priceValue}원`;

  console.log("표시할 좌석 개수:", countValue);
  console.log(sessionStorage.getItem("Seatprice"));


  
});
