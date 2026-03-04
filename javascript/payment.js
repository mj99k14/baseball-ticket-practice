// 전역 상태 변수
let displayTotalPrice, priceValue, countValue, commission;
let currentRandomCard = null;
let failCount = 0;
let isLocked = false;

// 초기 실행
document.addEventListener("DOMContentLoaded", () => {
  initPriceInfo();
  checkPayment();
});

// 결제 금액 정보 초기화
function initPriceInfo() {
  const displaySeatPrice1 = document.getElementById("seat-price1");
  const displayGameData = document.getElementById("Gamedate");
  const displayCommission = document.getElementById("commission");
  const displayCountSeat = document.getElementById("countseat");

  displayTotalPrice = document.getElementById("displayTotalPrice");

  priceValue = Number(sessionStorage.getItem("Seatprice")) || 0;
  countValue = Number(sessionStorage.getItem("selectedSeatCount")) || 0;
  const gameDate = sessionStorage.getItem("GameDate") || "날짜 정보 없음";

  commission = 3000;

  displayCountSeat.textContent = `총 ${countValue}석 선택하셨습니다.`;
  displayGameData.textContent = `일시: ${gameDate}`;
  displaySeatPrice1.textContent = `티켓 총액: ${(priceValue * countValue).toLocaleString()}원`;
  displayCommission.textContent = `수수료: ${commission.toLocaleString()}원`;

  const total = priceValue * countValue + commission;
  displayTotalPrice.textContent = `총 결제금액: ${total.toLocaleString()}원`;
}

// 결제 방식 처리
function checkPayment() {
  const container = document.getElementById("input-container");
  const Card = document.getElementById("Creditcard");
  const Bank = document.getElementById("bank");
  const notice = document.getElementById("notice");
  const nextBtn = document.getElementById("btn-next");

  // 카드 렌더링
  function renderCardForm() {
    currentRandomCard = generateRandomCard();
    failCount = 0;
    isLocked = false;

    const brand = Math.random() > 0.5 ? "VISA" : "MASTER";
    const brandClass = brand === "VISA" ? "visa" : "master";

    container.innerHTML = `
      <div class="random-card-display-wrapper">
        <div class="practice-card" id="practice-card">
          <div class="card-front">
            <div class="card-chip"></div>
            <div class="card-number">${currentRandomCard.cardNumber}</div>
            <div class="card-bottom">
              <div>
                <div>VALID THRU</div>
                <div>${currentRandomCard.validity}</div>
              </div>
              <div class="card-brand ${brandClass}">
                ${brand}
              </div>
            </div>
          </div>

          <div class="card-back">
            <div class="card-strip"></div>
            <div class="card-cvc-box">${currentRandomCard.cvc}</div>
          </div>
        </div>
      </div>

      <input type="text" id="input-card-number" placeholder="카드번호">
      <input type="text" id="input-birthday" placeholder="생년월일">
      <input type="text" id="input-validity" placeholder="유효기간">
      <input type="text" id="input-cvc" placeholder="CVC">
    `;

    notice.textContent = "";
    notice.style.display = "none";

    setupLiveFormatting();
    setupFlip();
  }

  // 무통장 폼
  function renderBankForm() {
    container.innerHTML = `
      <input type="text" placeholder="입금자명">
      <select>
        <option>국민은행</option>
        <option>신한은행</option>
        <option>우리은행</option>
        <option>하나은행</option>
        <option>농협은행</option>
        <option>기업은행</option>
        <option>SC제일은행</option>
        <option>씨티은행</option>
        <option>카카오뱅크</option>
        <option>토스뱅크</option>
      </select>
    `;
    notice.textContent =
      "은행에 따라 밤 11시 30분 이후 온라인 입금이 제한될 수 있습니다.";
    notice.style.display = "block";
  }

  // 이벤트 등록
  Card.addEventListener("change", renderCardForm);
  Bank.addEventListener("change", renderBankForm);
  if (Card.checked) renderCardForm();

  // 결제 버튼 처리
  nextBtn.addEventListener("click", () => {
    if (isLocked) return;
    if (Card.checked) {
      const inputCard = document.getElementById("input-card-number").value;
      const inputValidity = document.getElementById("input-validity").value;
      const inputCvc = document.getElementById("input-cvc").value;
      const inputBirthday = document.getElementById("input-birthday").value;
      const savedBirthday = sessionStorage.getItem("user-birthday") || "";
      const cleanInputCard = inputCard.replace(/\s/g, "");
      const cleanSavedCard = currentRandomCard.cardNumber.replace(/\s/g, "");
      const cleanInputValidity = inputValidity.replace(/[^0-9]/g, "");
      const cleanSavedValidity = currentRandomCard.validity.replace(
        /[^0-9]/g,
        "",
      );

      const cleanInputCvc = inputCvc.trim();
      const cleanSavedCvc = String(currentRandomCard.cvc).trim();
      const cleanInputBirthday = inputBirthday.replace(/[^0-9]/g, "");
      const cleanSavedBirthday = savedBirthday.replace(/[^0-9]/g, "");

      if (
        cleanInputCard === cleanSavedCard &&
        cleanInputValidity === cleanSavedValidity &&
        cleanInputCvc === cleanSavedCvc &&
        cleanInputBirthday === cleanSavedBirthday
      ) {
        handleSuccess();
      } else {
        handleFail();
      }
    } else {
      alert("무통장 입금 신청 완료");
    }
  });

  // 성공 처리
  function handleSuccess() {
    const card = document.getElementById("practice-card");
    card.classList.add("success");
    nextBtn.textContent = "결제 처리 중...";
    nextBtn.disabled = true;
    setTimeout(() => {
      location.href = "Completion.html";
    }, 1500);
  }

  // 실패 처리
  function handleFail() {
    failCount++;
    const card = document.getElementById("practice-card");
    card.classList.add("shake");
    setTimeout(() => card.classList.remove("shake"), 400);

    if (failCount >= 3) {
      isLocked = true;
      nextBtn.disabled = true;
      alert("카드가 잠겼습니다. 다시 시도해주세요.");
    } else {
      alert("입력 정보가 일치하지 않습니다.");
    }
  }
}

// 실시간 카드번호 포맷팅
function setupLiveFormatting() {
  const cardInput = document.getElementById("input-card-number");
  cardInput.addEventListener("input", (e) => {
    const formatted =
      e.target.value
        .replace(/[^0-9]/g, "")
        .match(/.{1,4}/g)
        ?.join(" ") || "";

    e.target.value = formatted;
  });
}

// CVC 입력 시 카드 뒤집기
function setupFlip() {
  const cvcInput = document.getElementById("input-cvc");
  const card = document.getElementById("practice-card");
  cvcInput.addEventListener("focus", () => card.classList.add("flip"));
  cvcInput.addEventListener("blur", () => card.classList.remove("flip"));
}

// 랜덤 카드 생성
function generateRandomCard() {
  const cardNumber = Array.from({ length: 4 }, () =>
    Math.floor(1000 + Math.random() * 9000),
  ).join(" ");

  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const year = Math.floor(Math.random() * 5) + 25;
  const cvc = Math.floor(100 + Math.random() * 900);

  return {
    cardNumber,
    validity: `${month}/${year}`,
    cvc,
  };
}