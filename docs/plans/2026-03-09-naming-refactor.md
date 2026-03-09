# Naming Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 프로젝트 전체의 비직관적 변수명/타입명/함수명을 도메인에 맞는 직관적인 이름으로 리팩토링

**Architecture:** FSD 레이어별로 하위→상위 순서로 리팩토링. shared → entities → features → widgets → views → app 순서.

**Tech Stack:** Next.js 15, TypeScript 5.8, pnpm

---

### Task 1: 철자 오류 및 명백한 버그 수정

**Files:**
- Rename: `src/shared/ui/calender/` → `src/shared/ui/calendar/`
- Rename: `src/entities/club-detail/util/convetLinkText.ts` → `convertLinkText.ts`
- Modify: `src/widgets/club-detail/api/deleteRecruitment.ts` (성공 메시지 버그)
- Modify: `src/app/(main)/my/page.tsx` (`page` → `Page`)

**변경 사항:**
1. `calender` 폴더명 → `calendar`, 내부 파일명의 `calender` → `calendar`
2. 프로젝트 전체에서 `calender` import 경로 업데이트
3. `useCalender` → `useCalendar`, `isCalenderOpen` → `isCalendarOpen` 등 변수명 수정
4. `convetLinkText.ts` → `convertLinkText.ts` 파일명 + import 수정
5. deleteRecruitment 성공 메시지: `'등록이 완료되었습니다.'` → `'삭제가 완료되었습니다.'`
6. `function page()` → `function Page()`

**검증:** `pnpm build` 성공

---

### Task 2: shared 레이어 타입명/변수명 개선

**Files:**
- `src/shared/model/type.ts`: `ClubType` → `Club`, `ClubInfoType` → `ClubDetail`, `Type` 접미사 제거, 중복 상수 통합
- `src/shared/ui/*.tsx`: `Props` → `{Component}Props`
- `src/shared/lib/error-message.ts`: `ErrorMessage` → `getHttpErrorMessage`, `ErrorHandler` → `createErrorResponse`
- `src/shared/lib/getKeyByValue.ts`: `obj` → `record`, `value` → `targetValue`
- `src/shared/lib/session-context.tsx`: state `data` → `session`
- `src/shared/model/useScrollUp.tsx`: `visible` → `isVisible`
- `src/shared/ui/safe-form.tsx`: `title` prop → `submitLabel`, `reRender` → `forceUpdateToggle`
- `src/shared/ui/nav-button.tsx`, `nav-bottom-button.tsx`: `navProps` → `className`
- `src/shared/ui/manage-modal.tsx`: `menu: string` → `manageAction: 'register' | 'recruitment'`
- `src/shared/ui/calender/calender-body.tsx`: `dir` → `monthOffset`, `allDate.map(data)` → `dates.map(dateCell)`
- `src/shared/lib/search-search-params.ts`: `q` → `keyword`
- catch 변수 `e` → `error` (전체)

**검증:** `pnpm build` 성공

---

### Task 3: entities 레이어 네이밍 개선

**Files:**
- `src/entities/club/model/type.ts`: `favorite: boolean` → `isFavorite`
- `src/entities/club-detail/model/type.ts`: `ClubDetailType` → `ClubDetail`, `CommentType` → `ClubComment`, `time` → `createdAt`
- `src/entities/club/util/getDateUtil.ts`: `getDateUtil` → `isRecruitEndDateEndOfYear`, `formatToMonthDay` → `formatDateDotted`
- `src/entities/home/ui/home-body.tsx`: `HomeBody` → `HomeSearchBar`
- `src/entities/home/ui/scroll-item.tsx`, `scroll-section.tsx`: `ScrollItem` → `PopularClubItem` 등
- `src/entities/favorite/ui/format-navigation.tsx`: → `DateNavigation`
- `src/entities/my/model/useEmailEdit.tsx`: `submitting` → `isSubmitting`, `open` → `isDialogOpen`
- `src/entities/favorite/ui/favorite-item.tsx`: `ClubItemProps` → `FavoriteItemProps`
- Boolean 접두사 누락 수정

**검증:** `pnpm build` 성공

---

### Task 4: features 레이어 네이밍 개선

**Files:**
- `src/features/*/model/type.ts`: `StateProp` → `{Domain}FormState`, `Action` → `{Domain}FormAction`, `FormField` → `{Domain}FormField`
- `src/features/*/model/reducer/*.ts`: `reducer` → `{domain}FormReducer`
- `src/features/club-detail/ui/*.tsx`: `value` → `commentContent`, `edit` → `editingCommentId`
- `src/features/club-detail/api/postComment.ts` → `comment-api.ts`
- `src/features/login/ui/login-form.tsx`: `confirmed` → `isTermsConfirmed`, `showPassword` → `isPasswordVisible`
- `src/features/header/ui/*.tsx`: `showDropdown` → `isDropdownOpen`, `showSearch` → `isSearchVisible`
- Boolean/이벤트 핸들러 네이밍 통일
- `src/features/home/ui/card-slider.tsx`: `item` → `club`, `movePx` → `slideWidthPx`
- `src/features/admin-recruitment/model/type.ts`: `Step = '1' | '2'` → 설명적 리터럴, `'postinfo'` → `'postInfo'`

**검증:** `pnpm build` 성공

---

### Task 5: widgets/views/app 레이어 네이밍 개선

**Files:**
- `src/widgets/*/`: `res` → `{domain}Response`, `data` → 도메인 변수명
- `src/widgets/club-detail/ui/club-detail-tabs.tsx`: `id` → `clubId`, `recruit` → `selectedRecruitmentId`
- `src/widgets/recruit/api/getClubList.ts` → `getRecruitList.ts`
- `src/app/api/auth/login/route.ts`: `loginRes` → `loginResponse`, `loginData` → `loginResponseBody` 등
- `src/app/api/sentry-webhook/route.ts`: 한 글자 변수 전체 수정, `extract` → `extractSentryAlertData`
- `src/app/(main)/club/search-params.ts`: `RecruitSearchParams` → `ClubSearchParams`

**검증:** `pnpm build` 성공
