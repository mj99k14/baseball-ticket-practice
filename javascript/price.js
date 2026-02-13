document.addEventListener("DOMContentLoaded", function () {
  // 좌석 개수 표시 부분
  // 글자를 보여줄 곳
  const dispalyCountSeat = document.getElementById("seat-count");

  //  만약 요소를 못 찾았다면 콘솔에 에러를 띄웁니다.
  if (!dispalyCountSeat) {
    console.error("HTML 요소를 찾을 수 없습니다.");
    return; // 에러가 있으면 여기서 중단
  }

  // localStorage에서 좌석 개수 가져오기
  const countValue = parseInt(
    sessionStorage.getItem("selectedSeatCount") || "0",
    10,
  ); //닫으면 사라지게 할려고

  // 글씨 집어넣기
  dispalyCountSeat.textContent = `총${countValue}석 입니다 `;

  console.log("표시할 좌석 개수:", countValue);
});
