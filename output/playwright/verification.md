# 디자인무드 웹페이지 수정 검증

2026-10-15, Chromium / Playwright CLI. 로컬 배포용 빌드: http://127.0.0.1:4175/

- 원인: 15~60평 선형 슬라이더 아래에 15/24/32/45/60 눈금을 등간격으로 배치. 기존 32평 눈금은 중앙(실제 약 37평)에 표시됨.
- 수정: 20px 손잡이의 실제 이동 범위에 맞춰 눈금과 트랙을 정렬. 눈금 클릭 및 접근 가능한 이름/키보드 조작 지원.
- 약도: 기존 PNG 표시를 SVG 컴포넌트로 교체. 기존 원본에서 확인한 도로 및 주요 지점의 상대 위치를 바탕으로 정리. 베이지·브라운 색상, 얇은 건물 윤곽, 단일 도착 표시, 비율 유지, 텍스트 설명 적용.
- 320/390/768/1440px에서 5개 눈금 위치 오차 최대 0.014px 미만. 클릭, 37평 포인터 선택, 드래그, 방향키/Home/End, 평수/㎡/예상 견적 갱신, 공간 유형 변경 후 값 유지, 상담 입력 전달 검사 통과.
- 약도 비율 및 두 카드의 가로 넘침 검사 통과. 기존 네이버·카카오 지도 링크의 주소 유지 확인.
- build 성공. lint 오류 없음. 기존 미사용 변수/인자 경고 4건 유지.
- 외부 상담 전송 및 운영 사이트 배포는 실행하지 않음. 주변 상호의 현재 영업 여부·도보 시간은 이번 작업에서 검증하지 않음.

재실행 (프로젝트 폴더에서 미리보기 서버 실행 후):

```powershell
npx --yes --package @playwright/cli playwright-cli -s=designmood open http://127.0.0.1:4175/
npx --yes --package @playwright/cli playwright-cli -s=designmood run-code --filename=output/playwright/verify-controls.js
npx --yes --package @playwright/cli playwright-cli -s=designmood eval '() => window.__designMoodVerification'
```

상세 결과: verification.json. 최종 화면: slider-desktop.png, slider-mobile.png, map-desktop.png, map-mobile.png.
