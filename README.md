# MeM · My Emotional Museum

감정 기록 달력 서비스입니다. Rheina(감정 기반 작품 추천)에서 담아둔 작품과 한 줄 메모를 날짜별로 모아 보여줍니다.

감정 분석과 작품 추천(Rheina)은 별도 저장소에 있습니다. 이 저장소에는 MeM 화면만 있습니다.

## 화면

| 경로 | 화면 |
|---|---|
| `/` | `/mem` 으로 이동 |
| `/mem` (`/calendar`) | 감정 기록 달력. 로그인하지 않았으면 로그인 화면이 먼저 뜸 |
| `/login` | 이메일·카카오 로그인 |
| `/profile` | 마이페이지 (닉네임·프로필 사진, 로그아웃, 회원 탈퇴) |
| `/privacy` | 개인정보처리방침 |

앱 안의 "오늘의 마음 남기기" 같은 Rheina 링크는 Rheina 주소(`https://yournest-today-d2a73.web.app`)로 넘어가며, 이때 로그인 상태가 함께 전달됩니다 (`src/utils/siteDomain.ts`, `src/components/DomainGuard.tsx`).

## 데이터

Rheina와 같은 Firebase 프로젝트 `yournest-today-d2a73`의 `mydb` 데이터베이스를 그대로 사용합니다 (`src/firebase.ts`).

| 컬렉션 | 내용 |
|---|---|
| `diaryEntries` | 사용자·날짜별 기록 (담아둔 작품, 한 줄 메모, 날씨) |
| `profiles` | 사용자가 바꾼 닉네임·프로필 사진 |
| `users`, `sessions` | 회원 정보와 방문 통계 |
| `firstdata` | 작품 원본 (담아둔 작품의 참고 링크 조회용, 읽기만 함) |

## 실행

```bash
npm install
cp .env.example .env   # VITE_KAKAO_JS_KEY 에 카카오 JavaScript 키 입력
npm run dev            # http://localhost:3000
```

## 배포

`.firebaserc` 의 기본 프로젝트는 `mem-memory` 입니다 (`https://mem-memory.web.app`).

```bash
npm run build
firebase deploy --only hosting
```

카카오 로그인을 쓰려면 배포 주소를 카카오 개발자 콘솔의 JavaScript SDK 도메인과 Redirect URI(`<주소>/login`)에 등록해야 합니다.
