# 디자인무드 웹사이트

디자인무드 홈페이지와 별도 관리자 화면을 제공하는 React/Vite 프로젝트입니다. 이 문서는 버전 `0.1.2` 변경사항을 포함합니다.

홈페이지에서는 공간 유형별 시공 사례와 사진 상세보기를 확인할 수 있습니다. 관리자는 현장 정보와 사진을 등록하고, 비공개 초안으로 저장하거나 홈페이지에 공개할 수 있습니다. 시공 평수 계산기는 15~60평의 눈금·입력값·견적·상담 내용을 연결하며, 오시는 길은 반응형 SVG 약도로 표시합니다.

공개 제목은 ‘아파트 인테리어’처럼 주소를 포함하지 않는 이름을 사용하며, 위치 입력과 공개 위치 표시는 제공하지 않습니다. 관리자는 사진 탭마다 제목 200자와 줄바꿈을 포함한 부연설명 2,000자를 입력할 수 있습니다. 홈페이지 상세보기의 ‘사진 설명’·‘시공 소개’ 탭에서 내용을 확인하고, 사진을 누르면 화면 맞춤 또는 저장된 사진의 100% 크기로 확대해 볼 수 있습니다. 업로드 시 긴 변을 최대 2,400px로 줄이므로 100% 보기가 업로드 원본의 더 높은 해상도를 복원하지는 않습니다.

관리자 화면의 ‘메인 슬라이드쇼’ 메뉴에서는 홈페이지 첫 화면 사진 1~10장을 추가·교체·정렬·제거하고, 짧은 제목 80자와 사진 문구 200자, 프레임 채우기·사진 전체 보기 방식을 설정할 수 있습니다. 저장하기 전에는 공개되지 않습니다. 초기값은 기존 사진 4장이며 공개 화면은 새로 열 때, 창으로 돌아올 때와 표시 중 60초마다 저장 설정을 확인합니다. 설정을 처음 불러오지 못하면 기본 사진 4장을 표시하고, 이후 갱신 실패 시에는 현재 슬라이드쇼를 유지합니다.

## 문서

- [관리자 사용안내](docs/관리자_사용안내.md): 로그인, 시공 사례와 메인 슬라이드쇼 사진 관리
- [관리자 서비스 설정·배포](docs/portfolio-admin-setup.md): Supabase 권한, 환경 변수, GitHub Pages와 Netlify 배포
- [변경 이력](CHANGELOG.md)

## 로컬 실행

Node.js 24와 npm을 사용합니다.

```powershell
npm ci
Copy-Item .env.example .env.local
```

이미 `.env.local`이 있다면 덮어쓰지 않습니다. 해당 Supabase 프로젝트의 URL과 publishable key를 입력합니다. 이 파일은 Git에서 제외됩니다. 서버 전용 secret/service-role key를 브라우저 환경 변수에 넣지 마세요.

```powershell
npm run dev
npm run dev:admin
```

홈페이지는 기본 Vite 개발 주소, 관리자 화면은 `http://localhost:5176`에서 실행됩니다. 관리자 화면은 승인된 Supabase 계정으로 로그인해야 합니다. 홈페이지와 관리자 화면은 서로 다른 origin의 세션을 공유하지 않습니다.

## 검증과 빌드

```powershell
npm test
npm run lint
npm run build
npm run build:admin
```

`npm test`는 모델 입력 검증과 PGlite에서의 데이터베이스 권한 정책을 검사합니다. 실제 Supabase, 이메일 수신, DNS, 배포 후 브라우저 검증은 별도로 수행해야 합니다.

| 명령 | 결과 |
| --- | --- |
| `npm run build` | 공개 홈페이지 `dist/` |
| `npm run build:admin` | 관리자 화면 `dist-admin/`, 환경 변수 확인 및 보안 헤더 포함 |
| `npm run preview` | 로컬 공개 빌드 미리보기 |

## 배포

공개 홈페이지 [designmood.kr](https://designmood.kr)는 `main` 푸시 시 GitHub Actions에서 검사·빌드 후 GitHub Pages로 배포합니다. Supabase URL과 publishable key는 GitHub 저장소의 `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` 변수로 설정합니다.

관리자 화면은 별도로 빌드한 `dist-admin/`을 기존 Netlify 사이트 [design-mood-admin-2120.netlify.app](https://design-mood-admin-2120.netlify.app)에 수동 배포합니다. 홈페이지를 푸시해도 관리자 화면이 함께 갱신되지는 않습니다. `netlify.toml`과 `dist-admin/_headers`에 관리자 보안 헤더가 정의되어 있습니다.

공개 홈페이지와 [admin.designmood.kr](https://admin.designmood.kr)의 DNS·HTTPS·인증 연결, Supabase 마이그레이션 001·002·003과 첫 관리자 권한, GitHub 연결 변수가 적용되어 있습니다. `0.1.1`의 사진별 설명·확대보기는 운영 화면에서 확인했습니다. `0.1.2` 관리자도 운영 배포 후 로그인 유지·메뉴·기존 사진 4장과 문구 보존·미저장 이동 확인·순서 변경·표시 방식·사진 교체 업로드·실제 저장을 검증했습니다. 자동 테스트 20개와 공개·관리자 빌드를 통과했으며, 공개 홈페이지는 배포 후 [설정·배포 문서](docs/portfolio-admin-setup.md)의 절차로 화면과 갱신 동작을 확인합니다. 사용자 지정 SMTP는 설정되지 않았고 비밀번호 재설정 이메일 수신은 검증되지 않았습니다.
