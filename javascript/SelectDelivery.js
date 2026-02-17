
//전역
let displaySeatPrice1, displayTotalPrice, displayCommission, displayCountSeat, container;
let deliveryprice, priceValue, countValue, commission;

document.addEventListener("DOMContentLoaded", function () {
  // 요소를 가져올 때 ID가 확실히 있는지 확인하세요.
  displaySeatPrice1 = document.getElementById("seat-price1"); // 티켓 총액 칸
  displayGameData = document.getElementById("Gamedate");
  displayTotalPrice = document.getElementById("displayTotalPrice"); // 하단 검정 박스
  displayCommission = document.getElementById("commission"); //수수료
  displayCountSeat = document.getElementById("countseat"); //자리개수
  const nextBtn = document.getElementById("btn-next");
  // 데이터 가져오기
  priceValue = sessionStorage.getItem("Seatprice") || "0";
  gameDate = sessionStorage.getItem("GameDate") || "날짜 정보 없음";
  countValue = Number(sessionStorage.getItem("selectedSeatCount")) || 0;

  // 요소가 하나라도 없으면 중단
  if (!countValue || !displayTotalPrice) {
    console.error("필요한 HTML 요소를 찾을 수 없습니다. ID를 확인하세요.");
    return;
  }

  // 다음페이지 넘어갈수있을지 없을지 판단
  nextBtn.addEventListener('click', () => {
    if (check()) {
      location.href = 'Payment.html';
    }
  });

  commission = 3000; // 수수료 기본값
  // 글씨 집어넣기
  displayCountSeat.textContent = `총 ${countValue}석 선택하셨습니다.`;
  displayGameData.textContent = `일시: ${gameDate}`;
  displaySeatPrice1.textContent = `티켓 총액: ${Number(priceValue).toLocaleString()}원`;
  displayTotalPrice.textContent = `총 결제금액: ${Number(priceValue).toLocaleString()}원`;
  displayCommission.textContent = `수수료: ${commission}원`;
  console.log("데이터 로드 완료:", { countValue, priceValue, gameDate });

  selectPay();// 호출
});


function selectPay() {
  const filed = document.getElementById("filed");
  const delivery = document.getElementById("delivery");
  const mobileticket = document.getElementById("mobileticket");
  const container = document.getElementById("input-container");// 사용자 input 받는것 
  const deliveryprice = document.getElementById("deliveryprice");
  //티켓 총액 계산 (숫자로 변환해서 계산)
  const baseTotal = Number(priceValue) * countValue;
  filed.addEventListener('click', () => {
    // 현장 수령 & 모바일티켓
    // 이름 //생년월일 연락처 //이메일
    container.innerHTML = `
    <input type="text" id="user-name" placeholder="이름">
    <input type="text" id="user-birthday" placeholder="생년월일">
    <input type="text" id="user-phone" placeholder="연락처">
    <input type="text" id="user-email" placeholder="dlapdlf">
  `;
    //결제금액
    const total = baseTotal + commission;
    displayTotalPrice.textContent = `총 걸제금액:${total.toLocaleString()}원`
    sessionStorage.setItem("finalTotalPrice", total);

  });

  //배송을 누른 경우에는(displayCommission 3000원 추가)
  //총액도 3000원 플러스 저장되게
  //이름 연락처 주소

  mobileticket.addEventListener('click', () => {
    // 현장 수령 & 모바일티켓
    // 이름 //생년월일 연락처 //이메일
    container.innerHTML = `
    <input type="text" id="user-name" placeholder="이름">
    <input type="text" id="user-birthday" placeholder="생년월일">
    <input type="text" id="user-phone" placeholder="연락처">
    <input type="text" id="user-email" placeholder="이메일">
  `;
    //결제금액
    const total = baseTotal + commission;
    displayTotalPrice.textContent = `총 걸제금액:${total.toLocaleString()}원`
    sessionStorage.setItem("finalTotalPrice", total);
  });

  delivery.addEventListener('click', () => {
    // 현장 수령 & 모바일티켓
    // 이름 //생년월일 연락처 //이메일
    container.innerHTML = `
    <input type="text" id="user-name" placeholder="이름">
    <input type="text" id="user-birthday" placeholder="생년월일">
    <input type="text" id="user-phone" placeholder="연락처">
    <input type="text" id="user-email" placeholder="이메일">
     <input type="text" id="user-address" placeholder="주소">
  `;
    // 금액 계산
    const total = baseTotal + commission + 3000
    displayTotalPrice.textContent = `총 걸제금액:${total.toLocaleString()}원`
    sessionStorage.setItem("finalTotalPrice", total);
    deliveryprice.textContent = `3000원`;
  });
}

//input요소에 다들어있는지 체크 함수
function check() {
  const fields = {
    "이름": document.getElementById("user-name"),
    "연락처": document.getElementById("user-phone"),
    "생년월일": document.getElementById("user-birthday"),
    "이메일": document.getElementById("user-email"),
    "주소": document.getElementById("user-address") // 배송일 때만 존재함
  };

  // 객체의 키(key)들을 돌면서 검사
  for (let key in fields) {
    const inputElement = fields[key];

    if (inputElement) {
      if (inputElement.value.trim() === "") {
        alert(`${key} 항목을 입력해주세요!`);
        inputElement.focus();//사용자의 커서(입력창)를 강제로 그 위치로 이동시켜라"라는 뜻
        return false; // 하나라도 비었으면 즉시 종료
      }
    }
  }

  alert("확인 완료!");
  return true;
}
