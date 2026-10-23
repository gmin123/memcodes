// MeM 단독 앱 - 감정 분석·작품 추천(Rheina)은 별도 서비스(yournest-today)에 있음
// - 첫 화면: /mem (달력). 로그인하지 않았으면 로그인 화면이 먼저 뜸 (CalendarPage)
// - 앱 안의 '/' · '/emotion' · '/result' 링크(오늘의 마음 남기기 등)는 Rheina 주소로 넘김 (DomainGuard)
// 데이터·로그인은 Rheina 와 같은 yournest-today Firebase 프로젝트를 그대로 사용 (src/firebase.ts)
const RHEINA_ORIGIN = 'https://yournest-today-d2a73.web.app';
const RHEINA_JOURNEY_PATHS = ['/', '/emotion', '/result'];

// 앱 첫 로드(새로고침·직접 URL 접근 포함) 시 한 번만 호출. 루트(/)로 들어오면 /mem 으로 바꿔줌.
// 라우트에서 '/' 를 /mem 으로 고정하지 않는 이유: 앱 안의 '/' 링크는 Rheina 를 가리키므로 DomainGuard 가 넘겨야 함
export function applyDomainEntryRoute(): void {
  const { pathname, search, hash } = window.location;
  if (pathname === '/' || pathname === '') {
    window.history.replaceState(null, '', `/mem${search}${hash}`);
  }
}

// Rheina 감정 여정 경로면 Rheina 주소를 돌려줌 (그 외는 MeM 안에서 처리)
export function crossSiteUrl(pathname: string, search = ''): string | null {
  return RHEINA_JOURNEY_PATHS.includes(pathname) ? `${RHEINA_ORIGIN}${pathname}${search}` : null;
}

// 로그인 후 / 로그아웃 후 기본으로 돌아갈 화면
export function siteHomePath(): string {
  return '/mem';
}
