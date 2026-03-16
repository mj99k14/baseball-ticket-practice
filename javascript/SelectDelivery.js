// 전역 변수 설정
let displayTotalPrice, priceValue, countValue, commission;

document.addEventListener("DOMContentLoaded", function () {
  // 1. HTML 요소 가져오기
  const displaySeatPrice1 = document.getElementById("seat-price1"); // 티켓 총액 칸
  const displayGameData = document.getElementById("Gamedate"); //게임날짜
  const displayCommission = document.getElementById("commission"); // 수수료 칸
  const displayCountSeat = document.getElementById("countseat"); // 선택 좌석수 칸
  const nextBtn = document.getElementById("btn-next"); // 다음 버튼

  // 전역 변수에 할당 (selectPay 함수에서 사용)
  displayTotalPrice = document.getElementById("displayTotalPrice");

  // 2. 세션 데이터 가져오기
  const session = getBookingSession();
  priceValue = session.seatPrice;
  countValue = session.seatCount;
  const gameDate = session.gameDate;
  commission = COMMISSION_FEE;

  // match-tag 채우기
  const matchTag = document.querySelector(".match-tag");
  if (matchTag) matchTag.textContent = `${session.gameHome} VS ${session.gameAway}`;

  // 3. 초기 화면 데이터 표시
  if (displayCountSeat)
    displayCountSeat.textContent = `총 ${countValue}석 선택하셨습니다.`;
  if (displayGameData) displayGameData.textContent = `일시: ${gameDate}`;
  if (displaySeatPrice1) {
    displaySeatPrice1.textContent = `티켓 총액: ${priceValue.toLocaleString()}원`;
  }
  if (displayCommission)
    displayCommission.textContent = `수수료: ${commission.toLocaleString()}원`;

  // 초기 총 결제 금액 설정
  if (displayTotalPrice) {
    const initialTotal = priceValue + commission;
    displayTotalPrice.textContent = `총 결제금액: ${initialTotal.toLocaleString()}원`;
  }

  // 4. 다음 페이지 이동 및 데이터 저장
  nextBtn.addEventListener("click", () => {
    if (check()) {
      // 입력창에 적힌 값을 버튼 누르는 시점에 가져옴
      const birthdayValue = document.getElementById("user-birthday").value;
      const nameValue = document.getElementById("user-name").value;

      // 세션 스토리지 저장
      sessionStorage.setItem("user-birthday", birthdayValue);
      sessionStorage.setItem("user-name", nameValue);

      location.href = "Payment.html";
    }
  });

  // 5. 수령 방법 선택 로직 실행
  selectPay();
});

// 수령 방법 선택 및 금액 업데이트 함수
function selectPay() {
  const filed = document.getElementById("filed");
  const delivery = document.getElementById("delivery");
  const mobileticket = document.getElementById("mobileticket");
  const container = document.getElementById("input-container");
  const deliveryprice = document.getElementById("deliveryprice");

  const baseTotal = priceValue; // Seatprice는 이미 단가 * 수량의 총액

  // 공통 입력 폼 HTML
  const commonInputs = `
    <input type="text" id="user-name" placeholder="이름">
    <input type="text" id="user-birthday" placeholder="생년월일">
    <input type="text" id="user-phone" placeholder="연락처">
    <input type="text" id="user-email" placeholder="이메일">
  `;

  // 수령 방법 선택 시 금액·폼 업데이트 (deliveryFee: 배송비, 기본 0)
  function applyDeliveryOption(deliveryFee = 0) {
    const extraInput =
      deliveryFee > 0
        ? `<input type="text" id="user-address" placeholder="주소">`
        : "";
    container.innerHTML = commonInputs + extraInput;

    const total = baseTotal + commission + deliveryFee;
    displayTotalPrice.textContent = `총 결제금액: ${total.toLocaleString()}원`;
    sessionStorage.setItem("finalTotalPrice", total);
    if (deliveryprice)
      deliveryprice.textContent = deliveryFee > 0 ? `${deliveryFee.toLocaleString()}원` : "0원";
  }

  filed.addEventListener("click", () => applyDeliveryOption());
  mobileticket.addEventListener("click", () => applyDeliveryOption());
  delivery.addEventListener("click", () => applyDeliveryOption(DELIVERY_FEE));
}

// 입력값 유효성 검사 함수
function check() {
  const fields = {
    이름: document.getElementById("user-name"),
    연락처: document.getElementById("user-phone"),
    생년월일: document.getElementById("user-birthday"),
    이메일: document.getElementById("user-email"),
    주소: document.getElementById("user-address"), // 배송 선택 시에만 존재
  };

  for (let key in fields) {
    const inputElement = fields[key];

    // 요소가 화면에 존재할 때만 검사 (주소창 등)
    if (inputElement) {
      if (inputElement.value.trim() === "") {
        alert(`${key} 항목을 입력해주세요!`);
        inputElement.focus();
        return false;
      }
    }
  }
  return true;
}
