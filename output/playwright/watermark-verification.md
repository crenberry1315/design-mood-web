# 사진별 워터마크 ON/OFF 검증 기록

검증일: 2026-10-23 (한국 시간)

## 구현 결과

- 시공 사례와 메인 슬라이드쇼에서 업로드 전 기본값 ON/OFF 선택, 업로드 후 사진별 변경.
- 선택한 사진 미리보기에 즉시 반영하고, 명시적인 저장 후 공개 화면에 반영.
- `images[].watermark` 및 `slides[].watermark`를 boolean으로 저장. 기존 데이터의 누락 값은 OFF.
- 사진 순서 변경·저장·새로고침에도 사진별 설정 유지. 워터마크만 바꿔도 미저장 변경으로 감지.
- 메인 사진을 교체하면 해당 사진의 기존 ON/OFF 유지.
- 홈페이지 메인·대표 썸네일·상세보기·화면 맞춤 및 100% 확대에 동일 설정 적용.
- 첨부 PNG를 사진 중앙에 별도 레이어로 표시. 사진 파일에 합성하지 않음.
- 전체 보기에서 생기는 여백은 제외하고 실제 사진 영역에 맞춤. 100% 스크롤 시 사진과 함께 이동.
- 작은 사진은 화면 맞춤에서 원래 크기 이상으로 확대하지 않는 기존 동작 유지.

## 검증 결과와 경계

아래 표는 운영 배포 전 수행한 로컬 검증 시점의 결과입니다. 운영 반영 진행 상태는 아래 ‘파일 보존과 배포 준비’에 별도로 기록합니다.

| 항목 | 결과 | 검증 환경 |
| --- | --- | --- |
| 모델·데이터베이스 권한·저장 검증 | 23/23 PASS | `npm test`, PGlite에서 001~004 마이그레이션 실행 |
| lint | 새 경고 없음, 기존 경고 4개 | `npm run lint` |
| 공개 홈페이지 빌드 | PASS | `npm run build` |
| 관리자 빌드 | PASS | `npm run build:admin` |
| 관리자 업로드 ON/OFF·개별 변경·저장 후 재조회 | PASS | Chromium, 로컬 API 모의 응답 |
| 메인 사진 추가·교체·사진별 저장 후 재조회 | PASS | Chromium, 로컬 API 모의 응답 |
| PC 1440×1000 / 모바일 390×844 | PASS | 실제 React 화면, Chromium viewport |
| 사진 영역과 레이어의 정렬 | 11가지 상태 PASS, 오차 1px 미만 | 가로·세로·화면 맞춤·100%·스크롤 |
| 작은 사진 표시 | 240×160 유지 PASS | 합성 SVG 이미지 응답 |
| OFF인 사진의 썸네일·상세·확대 레이어 부재 | PASS | 실제 DOM 확인 |
| 페이지 JavaScript 예외 | 0 | 브라우저 `pageerror` 수집 |
| 운영 Supabase 004 적용 | 로컬 검증 당시 미실행 | 이 표의 검증 범위에 포함하지 않음 |
| 운영 관리자 저장·공개 사이트 확인 | 로컬 검증 당시 미실행 | 이 표의 검증 범위에 포함하지 않음 |

브라우저에서는 인증·데이터·저장소 API만 모의 응답으로 대체하고 실제 앱 소스 및 업로드 변환을 실행했습니다. API 모의 응답에서 저장한 데이터의 재조회는 확인했으나, 이를 운영 Supabase 저장 검증으로 해석하면 안 됩니다. 실제 SQL 제약 및 권한은 별도로 PGlite에서 검증했습니다.

브라우저 상세 수치: [watermark-browser-verification.json](watermark-browser-verification.json)

## 화면 증거

- [관리자 개별 ON](watermark-admin-on.png)
- [관리자 세로 사진](watermark-admin-portrait.png)
- [관리자 모바일](watermark-admin-mobile.png)
- [메인 슬라이드 관리자](watermark-hero-admin.png)
- [공개 메인](watermark-public-hero.png)
- [썸네일 ON](watermark-thumbnail-on.png) / [썸네일 OFF](watermark-thumbnail-off.png)
- [PC 확대보기](watermark-lightbox-desktop.png)
- [PC 100% 확대보기](watermark-lightbox-natural.png) / [PC 세로 사진](watermark-lightbox-portrait.png)
- [모바일 가로 사진](watermark-lightbox-mobile.png) / [모바일 세로 사진](watermark-lightbox-mobile-portrait.png)
- [모바일 상세](watermark-detail-mobile.png)
- [작은 사진 크기 유지](watermark-small-photo.png)

실사 검증 사진은 기존 `public/hero/hero-site-1-crisp.jpg`를 사용했습니다. 이 사진에는 하단 로고가 이미 포함되어 있습니다. 이번 기능이 추가하는 중앙 레이어와 구분해야 합니다. 세로 사진과 작은 사진 검증에는 SVG 모의 이미지를 사용했습니다.

## 파일 보존과 배포 준비

원본 `D:/Design Mood/워터마크.png`를 변경 없이 `src/assets/watermark.png`에 복사했습니다. 두 파일의 SHA-256은 `9DA83D8DD03E9056B267C01B4C3ACF26CD9B64CA34E7FF2109A503DFAC0A5D88`로 일치합니다. PNG는 공개·관리자 양쪽 빌드의 해시 자산에 포함됩니다.

2026-10-23 운영 배포를 진행 중이며 SQL 004 적용과 관리자 Netlify 배포를 완료했습니다. SQL 004 적용 후 사례 4개·메인 설정 1개·저장소 사진 21개의 전체 체크섬이 배포 전 기록과 일치했고, 관리자 HTTP·빌드 자산·워터마크 PNG·보안 헤더를 확인했습니다. 004는 기존 검증 함수만 교체하며 기존 사진·문구 데이터를 수정하지 않습니다. 공개 홈페이지 배포, 실제 관리자 계정의 ON/OFF 저장·재조회, 익명 공개 화면 표시와 최종 데이터 보존 대조는 별도 완료 조건입니다. 이 로컬 검증 기록으로 해당 운영 검증 완료를 주장하지 않습니다. 절차는 [설정·배포 문서](../../docs/portfolio-admin-setup.md)를 참고하세요.

## 로컬 브라우저 검증 재현

개발 서버를 5173(공개), 5176(관리자)에서 실행하고, 별도 Playwright CLI 세션에서 다음 순서로 실행합니다. 테스트 스크립트는 운영 API 요청을 가로채므로 다른 세션이나 운영 검증용 브라우저에 적용하지 않습니다.

```powershell
npx --package @playwright/cli playwright-cli -s=watermark open http://127.0.0.1:5176 --headed
npx --package @playwright/cli playwright-cli -s=watermark run-code --filename output/playwright/watermark-mock-setup.cjs
```

사례를 선택하고 ‘사진 1 워터마크’를 ON으로 바꾼 뒤 `watermark-admin-qa.cjs`를 실행합니다. 그 후 같은 페이지를 `http://127.0.0.1:5173`으로 이동해 `watermark-public-qa.cjs`, `watermark-small-photo-qa.cjs` 순으로 실행합니다. 저장·삭제·업로드 요청은 모의 응답에만 반영됩니다.
