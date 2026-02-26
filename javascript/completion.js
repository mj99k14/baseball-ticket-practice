document.addEventListener("DOMContentLoaded", () => {

  // 기본 정보 출력 
  const reservation = document.getElementById("reservationNumber");
  const countseat = document.getElementById("countseat");
  const count = document.getElementById("count");
  const totalprice = document.getElementById("displayTotalPrice");

  const seatCount = sessionStorage.getItem("selectedSeatCount");
  const finalPrice = sessionStorage.getItem("finalTotalPrice");

  countseat.textContent = seatCount;
  count.textContent = seatCount;
  totalprice.textContent = finalPrice + "원";

  // 예약번호 생성
  const now = new Date();
  const datePart =
    now.getFullYear().toString().slice(2) +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    now.getDate().toString().padStart(2, "0");

  const randomPart = Math.floor(1000 + Math.random() * 9000);
  reservation.textContent = "R" + datePart + randomPart;

  // 모달 관련 
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modalText");
  const modalClose = document.getElementById("modalClose");

  // 3초 후 모달 표시
  setTimeout(() => {
    modalText.textContent =
      "예매 연습이 정상적으로 완료되었습니다.\n실제 예매와 같은 방식으로 진행되었습니다.";
    modal.style.display = "flex";
  }, 2000);

  // 닫기 버튼 클릭 시 모달 닫기
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

});