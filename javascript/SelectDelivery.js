//현장 수령 선택
//이름, 생년월일 , 연락처, 이메일 입력 받음
// 하나라도 입력이안되면 전부 입력해주세요
//appState.delivery 저장
//배송
//이름, 연락처 ,주소입력 받음
// 하나라도 입력이안되면 전부 입력해주세요
//appState.delivery 저장
//모바일 티켓
//이름, 생년월일 , 연락처, 이메일 입력 받음
// 하나라도 입력이안되면 전부 입력해주세요
//appState.delivery 저장

//이전단계 클릭시
//Seat-price.html로 이동
//appState.delivery 삭제

//다음 단계클릭시
//Completion.html로 이동

document.addEventListener("DOMContentLoaded", function () {
  // 요소를 가져올 때 ID가 확실히 있는지 확인하세요.
  const displayCountSeat = document.getElementById("seat-count");
  const displaySeatPrice1 = document.getElementById("seat-price1"); // 티켓 총액 칸
  const displayGameData = document.getElementById("Gamedate");
  const displayTotalPrice = document.getElementById("total-price-display"); // 하단 검정 박스
//   const displayCommission =document.getElementById("commission"); //수수료

  // 데이터 가져오기
  const priceValue = sessionStorage.getItem("Seatprice") || "0";
  const gameDate = sessionStorage.getItem("GameDate") || "날짜 정보 없음";
  const countValue = Number(sessionStorage.getItem("selectedSeatCount")) || 0;

  // 요소가 하나라도 없으면 중단
  if (!displayCountSeat || !displayTotalPrice) {
    console.error("필요한 HTML 요소를 찾을 수 없습니다. ID를 확인하세요.");
    return;
  }

    //배송을 누른 경우에는(displayCommission 3000원 추가)
  //총액도 3000원 플러스 저장되게


  // 글씨 집어넣기
  displayCountSeat.textContent = `총 ${countValue}석 선택하셨습니다.`;
  displayGameData.textContent = `일시: ${gameDate}`;
  displaySeatPrice1.textContent = `티켓 총액: ${Number(priceValue).toLocaleString()}원`;
  displayTotalPrice.textContent = `총 결제금액: ${Number(priceValue).toLocaleString()}원`;
  

  console.log("데이터 로드 완료:", { countValue, priceValue, gameDate });
});