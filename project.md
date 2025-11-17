# 아키텍처 문서

음력 생일 계산기 애플리케이션의 기술 아키텍처 및 설계 결정 사항을 설명합니다.

## 목차

- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [설계 결정](#설계-결정)
- [컴포넌트 아키텍처](#컴포넌트-아키텍처)
- [데이터 흐름](#데이터-흐름)
- [스타일링 전략](#스타일링-전략)
- [테스트 전략](#테스트-전략)

## 기술 스택

### 핵심 기술

- **React 19**: 최신 React 버전, Hooks API 활용
- **TypeScript 5.9**: Strict mode로 타입 안전성 보장
- **Vite 6**: 빠른 개발 환경 및 최적화된 프로덕션 빌드
- **Tailwind CSS 3.4**: Utility-first CSS 프레임워크
- **shadcn/ui**: 재사용 가능한 컴포넌트 라이브러리 기반

### 개발 도구

- **Biome 1.9**: 통합 린터/포매터 (ESLint + Prettier 대체)
- **Vitest 2.1**: 빠른 단위 테스트 프레임워크
- **React Testing Library 16**: 컴포넌트 테스팅
- **Storybook 8.6**: 컴포넌트 문서화 및 개발 환경
- **pnpm 8**: 효율적인 패키지 관리

### 핵심 라이브러리

- **holiday-kr 0.1.5**: 한국 음력/양력 변환 라이브러리
- **clsx**: 조건부 className 관리
- **tailwind-merge**: Tailwind 클래스 충돌 방지

## 프로젝트 구조

```
lunar-calc/
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── DateInput/       # 날짜 입력 관련 컴포넌트
│   │   │   ├── CalendarTypeSelector.tsx
│   │   │   ├── DateInputForm.tsx
│   │   │   └── LeapMonthCheckbox.tsx
│   │   ├── Timeline/        # 타임라인 관련 컴포넌트
│   │   │   ├── Timeline.tsx
│   │   │   └── TimelineItem.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LunarDisplay.tsx
│   │   └── ErrorMessage.tsx
│   ├── hooks/              # Custom React Hooks
│   │   ├── useLunarCalculator.ts
│   │   ├── useBirthdayTimeline.ts
│   │   └── index.ts
│   ├── utils/              # 유틸리티 함수
│   │   ├── dateParser.ts
│   │   ├── dateValidator.ts
│   │   ├── dateFormatter.ts
│   │   ├── dateConverter.ts
│   │   └── index.ts
│   ├── types/              # TypeScript 타입 정의
│   │   ├── lunar.types.ts
│   │   ├── holiday-kr.d.ts
│   │   └── index.ts
│   ├── lib/                # 라이브러리 유틸리티
│   │   └── utils.ts        # cn() 함수
│   ├── styles/             # 스타일 파일
│   │   └── app.css
│   ├── assets/             # 정적 자산
│   │   └── img/
│   ├── App.tsx             # 메인 앱 컴포넌트
│   └── main.tsx            # 진입점
├── public/                 # 정적 파일
├── .storybook/            # Storybook 설정
├── docs/                  # GitHub Pages 빌드 출력
└── tests/                 # 테스트 파일
```

## 설계 결정

### 1. 상태 관리

**결정**: Local State + Custom Hooks
**이유**:
- 애플리케이션이 단순하고 전역 상태가 필요 없음
- Redux/Zustand 같은 외부 상태 관리 라이브러리 불필요
- Custom Hooks로 비즈니스 로직과 UI 분리 가능

**장점**:
- 번들 크기 최소화
- 학습 곡선 낮음
- 컴포넌트 간 의존성 최소화

### 2. CSS 프레임워크: Tailwind CSS + shadcn/ui

**결정**: Tailwind CSS 3.4 + shadcn/ui
**이전**: Bootstrap 5.3
**마이그레이션 날짜**: 2025-11-17

**이유**:
- **개발자 경험**: Utility-first 접근으로 빠른 개발
- **번들 크기**: PurgeCSS로 미사용 스타일 제거
- **커스터마이징**: 테마 시스템으로 쉬운 디자인 토큰 관리
- **현대적**: 2025년 기준 업계 표준 (70% 시장 점유율)
- **shadcn/ui**: 복사 가능한 컴포넌트로 라이브러리 의존성 최소화

**마이그레이션 결과**:
- 번들 크기: 218.56 kB (gzipped: 70.60 kB) - Bootstrap과 유사
- 모든 테스트 통과
- 시각적 일관성 유지

### 3. 타입 안전성

**결정**: TypeScript Strict Mode
**이유**:
- 런타임 에러 사전 방지
- IDE 자동완성 및 리팩토링 지원
- 코드 문서화 효과

**주요 타입**:
```typescript
type CalendarType = 'solar' | 'lunar';
interface LunarDate {
  year: number;
  month: number;
  day: number;
  leapMonth: boolean;
}
interface BirthdayItem {
  year: number;
  age: number;
  solarDate: string;
  lunarDate: string;
}
```

### 4. 컴포넌트 구조

**결정**: Atomic Design 영감의 계층 구조
**이유**:
- 재사용성 극대화
- 테스트 용이성
- 유지보수성 향상

**계층**:
- **Atoms**: CalendarTypeSelector, LeapMonthCheckbox
- **Molecules**: DateInputForm, TimelineItem
- **Organisms**: Timeline, LunarDisplay
- **Templates**: App

### 5. 날짜 처리

**결정**: 문자열 파싱 방식
**이전 문제**: `new Date()` 사용 시 타임존 이슈
**해결**:
```typescript
// Before (문제 있음)
const date = new Date(dateString);

// After (해결)
const [year, month, day] = dateString.split('-').map(Number);
```

**이유**:
- 브라우저 타임존 차이 제거
- 일관된 날짜 처리
- 음력 계산 정확도 향상

## 컴포넌트 아키텍처

### 컴포넌트 책임

#### App.tsx (Container)
- 전체 애플리케이션 레이아웃
- Custom Hooks 통합
- 컴포넌트 조합

#### useLunarCalculator (Business Logic)
- 폼 상태 관리
- 음력/양력 변환 로직
- 유효성 검증
- 에러 처리

#### useBirthdayTimeline (Data Processing)
- 100년 타임라인 생성
- 메모이제이션으로 성능 최적화

### 데이터 흐름

```
User Input → DateInputForm
    ↓
useLunarCalculator (validation)
    ↓
dateConverter (holiday-kr)
    ↓
State Update (lunar)
    ↓
useBirthdayTimeline (compute)
    ↓
Timeline Rendering
```

## 스타일링 전략

### Tailwind CSS 구성

**CSS 변수 기반 테마**:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... */
}
```

**커스텀 애니메이션**:
```css
@keyframes cd-bounce-1 {
  0% { opacity: 0; transform: scale(0.5); }
  60% { opacity: 1; transform: scale(1.2); }
  100% { transform: scale(1); }
}
```

**플러그인**:
- `@tailwindcss/forms`: 폼 요소 기본 스타일 개선

### 반응형 디자인

- 모바일 우선 접근
- 최대 너비: 320px (컨테이너)
- 유틸리티 클래스로 반응형 조정

## 테스트 전략

### 단위 테스트 (Vitest)

**대상**: 유틸리티 함수
- `dateParser.test.ts`: 날짜 파싱 로직
- `dateValidator.test.ts`: 유효성 검증
- `dateFormatter.test.ts`: 날짜 포맷팅

**커버리지**: 핵심 유틸리티 100%

### 컴포넌트 테스트 (RTL)

**대상**: UI 컴포넌트
- `Header.test.tsx`: 렌더링 및 이미지 속성
- `Footer.test.tsx`: 링크 속성
- `ErrorMessage.test.tsx`: 에러 메시지 표시

**접근법**: 사용자 중심 테스팅

### Storybook (문서화)

**대상**: 재사용 가능한 컴포넌트
- `Header.stories.tsx`
- `ErrorMessage.stories.tsx`

**용도**:
- 컴포넌트 개발 환경
- 시각적 문서화
- 디자인 시스템 구축

## 성능 최적화

### React 최적화

1. **React.memo**: TimelineItem (100개 항목)
2. **useMemo**: Timeline 계산 캐싱
3. **useCallback**: 이벤트 핸들러 메모이제이션

### 번들 최적화

- **Code Splitting**: 동적 import 가능
- **Tree Shaking**: ES6 모듈
- **CSS Purging**: Tailwind PurgeCSS

**결과**:
- 메인 번들: 218.56 kB (70.60 kB gzipped)
- CSS: 14.74 kB (3.79 kB gzipped)

## 접근성 (a11y)

### 현재 구현

- **시맨틱 HTML**: `<label>`, `<input>` 연결
- **Alt 텍스트**: 모든 이미지
- **키보드 네비게이션**: Enter 키 지원
- **포커스 관리**: `:focus` 스타일

### 개선 필요 사항

- ARIA 라벨 추가
- 스크린 리더 테스트
- 색상 대비 검증
- 키보드 전용 네비게이션 개선

## 보안

### 구현된 보안 조치

- **XSS 방지**: React의 자동 이스케이핑
- **의존성 검증**: pnpm lock file
- **타입 안전성**: TypeScript strict mode

### 검증 완료

- 사용자 입력 검증 (dateValidator)
- SQL Injection 불가 (API 없음)
- Command Injection 불가 (서버 없음)

## 빌드 & 배포

### 빌드 프로세스

```bash
pnpm build
# 1. TypeScript 컴파일 (tsc)
# 2. Vite 번들링
# 3. Tailwind CSS 처리 (PostCSS)
# 4. 산출물 → docs/
```

### GitHub Pages 배포

- **브랜치**: `main`
- **디렉토리**: `/docs`
- **베이스 경로**: `/lunar-calc`
- **자동화**: GitHub Actions

## 향후 개선 사항

### 단기 (1-2주)
- [ ] E2E 테스트 추가 (Playwright)
- [ ] 접근성 개선 (WCAG 2.1 AA)
- [ ] 다크 모드 지원

### 중기 (1-2개월)
- [ ] 국제화 (i18n)
- [ ] PWA 변환
- [ ] LocalStorage 데이터 저장

### 장기 (3개월+)
- [ ] 소셜 공유 기능
- [ ] 캘린더 이벤트 내보내기
- [ ] 음력 기념일 알림

## 레퍼런스

- [React 19 Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Vitest Documentation](https://vitest.dev/)
