# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run lint             # ESLint on javascript/
npm run validate-html    # Validate all HTML files
npm run format           # Prettier write
npm run format:check     # Prettier check only
```

## Page Flow

```
home.html → Select-date.html → Select-Seat.html → Select-Seat-area.html
→ Seat-check-price.html → Select-Delivery.html → Payment.html → Completion.html
```

파일은 `html/` 폴더에, CSS는 `css/` 폴더에, JS는 `javascript/` 폴더에 위치한다. 빌드 단계 없이 파일 시스템에서 직접 서빙된다.

## State Management

`window.appState` (defined in `javascript/state.js`)가 공유 전역 객체다. state를 읽거나 쓰는 모든 페이지에서 반드시 첫 번째로 로드해야 한다.

```html
<script src="../javascript/state.js" defer></script>
<script src="../javascript/PageScript.js" defer></script>
```

**appState 필드:** `date`, `time`, `area`, `home`, `away`, `seats[]`, `price`, `delivery`

페이지 간 데이터 전달은 `sessionStorage`로 이루어진다. 사용되는 키:

| 키 | 저장 위치 | 비고 |
|----|-----------|------|
| `GameDate`, `GameTime` | SelectDate.js | |
| `GanmeHome`, `GanmeAway` | SelectDate.js | **오타 주의** — "Ganme"가 소스의 실제 키 이름 |
| `GameArea` | SelectDate.js | |
| `selectedSeatCount`, `selectedSeats`, `Seatprice` | SelectSeat.js | `selectedSeats`는 JSON 배열 |
| `user-name`, `user-birthday` | SelectDelivery.js | Payment.js에서 카드 검증에 사용 |
| `finalTotalPrice` | SelectDelivery.js | |

## Pricing Logic

- 좌석 단가: 14,000원/석 (SelectSeat.js에 하드코딩)
- 수수료: 항상 +3,000원
- 배송(택배) 선택 시: 추가 +3,000원
- `Seatprice` = 좌석 단가 × 선택 좌석 수 (수수료 미포함)
- `finalTotalPrice` = `Seatprice` + 수수료 [+ 배송비]

> **주의:** `SelectDelivery.js`의 `displaySeatPrice1`은 `priceValue * countValue`로 계산한다. `Seatprice` sessionStorage 값이 이미 단가이므로 countValue를 곱하면 이중 계산이 발생한다. (기존 버그)

## Payment Flow

`payment.js`는 랜덤 카드 데이터(`generateRandomCard`)를 화면에 표시하고, 사용자가 해당 값을 입력해 검증하는 연습 결제 방식이다. 3회 실패 시 잠금(`isLocked = true`). CVC 입력 포커스 시 카드 3D 뒤집기 애니메이션 실행.

## CSS Structure

페이지별 CSS 파일 1:1 대응. 공유 유틸리티 클래스 없음. 카드 뒤집기 애니메이션은 `payment.css`에서 CSS 3D transform으로 구현.

## ESLint

`appState`가 전역으로 선언되어 있어 cross-page 접근 시 undefined 오류가 발생하지 않는다.
