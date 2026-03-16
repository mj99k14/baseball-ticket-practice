window.appState = {
  date: null,
  time: null,
  area: null,
  home: null,
  away: null,
  seats: [],
  price: 0,
  delivery: null,
};

// ===== 공유 상수 =====
window.COMMISSION_FEE = 3000;
window.DELIVERY_FEE = 3000;
window.MAX_SEAT_COUNT = 4;

// 세션에서 공통 예매 정보를 읽어 반환
window.getBookingSession = function () {
  return {
    seatPrice: Number(sessionStorage.getItem("Seatprice")) || 0,
    seatCount: Number(sessionStorage.getItem("selectedSeatCount")) || 0,
    gameDate: sessionStorage.getItem("GameDate") || "날짜 정보 없음",
    selectedSeats: JSON.parse(sessionStorage.getItem("selectedSeats")) || [],
  };
};
