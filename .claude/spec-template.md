# 프로젝트 스펙: {기능명}

> 이 파일을 작성한 뒤 spec-parser에 전달하면 자동으로 개발됩니다.
> 이미 구현된 항목이 있어도 괜찮습니다 — spec-parser가 진행 상황을 파악하고 미완성 항목만 처리합니다.

---

## 개요

- **기능**: {기능 이름}
- **도메인**: {domain 이름 — features/{domain}, widgets/{domain}, views/{domain}에 사용됨}
- **라우트**: `/{경로}` (예: `/my/comments`, `/club/[id]`)
- **추가 스택**: {기본 스택 외 추가 라이브러리, 없으면 생략}

---

## API

> 외부 백엔드 API 호출. `features/{domain}/api/` 또는 `views/{domain}/api/`에 생성됩니다.

### GET {/endpoint}

- **설명**: {이 API가 반환하는 것}
- **인증**: {필요 / 불필요}
- **위치**: `features/{domain}/api/get{Resource}.ts`
- **Query Params**: `{param}: {타입}` — {설명} (없으면 생략)
- **응답**:
  ```ts
  {
    field: type;
    field: type;
  }
  ```
- **에러**: `{status}` — {상황 설명}

### POST {/endpoint}

- **설명**: {설명}
- **인증**: {필요 / 불필요}
- **위치**: `features/{domain}/api/{resource}-api.ts`
- **Request Body**:
  ```ts
  {
    field: type;
  }
  ```
- **성공 응답**: `{ ok: true, message: '{메시지}', status: 200 }`
- **에러**: `{status}` — {상황 설명}

### PATCH {/endpoint}

- **설명**: {설명}
- **인증**: {필요 / 불필요}
- **위치**: `features/{domain}/api/{resource}-api.ts`
- **Request Body**:
  ```ts
  {
    field: type;
  }
  ```

### DELETE {/endpoint}

- **설명**: {설명}
- **인증**: {필요 / 불필요}
- **위치**: `features/{domain}/api/{resource}-api.ts`

---

## 공유 컴포넌트

> 2개 이상의 domain에서 사용하는 원자 UI. `shared/ui/`에 단일 파일로 생성됩니다.
> [참고] 표시 항목은 이미 구현됨. 새로 필요한 컴포넌트에만 CSS를 첨부하세요.

### {ComponentName}

- **역할**: {설명}
- **CSS**: `.claude/figma/{feature}/{component}.txt` (없으면 "없음")

---

## 도메인 컴포넌트 (Block)

> 특정 도메인 전용 UI 컴포넌트. `features/{domain}/ui/`에 생성됩니다.
> props로만 동작하며 내부 fetch 금지.

### {ComponentName}

- **domain**: {domain}
- **역할**: {설명}
- **Props**:
  - `{propName}: {타입}` — {설명}
- **상태 variant**: `'{variant1}' | '{variant2}'` (없으면 생략)
- **CSS**: `.claude/figma/{feature}/{component}.txt` (없으면 "없음")

---

## 위젯

> 여러 Block을 조합한 복합 컴포넌트. `widgets/{domain}/ui/`에 생성됩니다.
> 내부 fetch 금지. 데이터는 views에서 props로 전달받습니다.

### {WidgetName}

- **domain**: {domain}
- **역할**: {설명}
- **사용할 Block**:
  - `{BlockName}`: {역할}
  - `{BlockName}`: {역할}
- **CSS**: `.claude/figma/{feature}/{widget}.txt` (없으면 "없음")

---

## 페이지

> FSD 뷰 + Next.js 라우트 쌍. `views/{domain}/` + `app/{route}/page.tsx`에 함께 생성됩니다.

### {ViewName}

- **domain**: {domain}
- **라우트**: `(main)/{path}` 또는 `(admin)/{path}`
- **설명**: {페이지 목적}
- **위젯**:
  - `{WidgetName}`: {배치 또는 역할}
- **동적 파라미터**: `[id]`, `[action]` 등 (없으면 생략)
- **데이터 페칭**:
  - `{함수명}({파라미터})`: {설명}
- **Suspense**: {있음 / 없음} — skeleton: `{SkeletonName}` (있을 경우)
- **generateMetadata**: {있음 / 없음}
- **CSS**: `.claude/figma/{feature}/{page}.txt` (없으면 "없음")

---

## 컴포넌트 CSS 목록

> Figma에서 위젯 variant 프레임 선택 → CSS 복사 (All layers) → `.claude/figma/{feature}/{name}.txt`로 저장.
> 위젯 variant 1개당 파일 1개. 경로만 나열합니다.

| 대상 | CSS 파일 경로 |
|------|-------------|
| {ComponentName} - 기본 | `.claude/figma/{feature}/{name}.txt` |
| {WidgetName} - 활성 상태 | `.claude/figma/{feature}/{name}-active.txt` |

---

## 타입 정의

> 새로 필요한 타입. `entities/{domain}/model/type.ts`에 추가됩니다.

```ts
export interface {TypeName} {
  id: number;
  // ...
}
```

---

## 참고사항

> 에이전트를 위한 추가 컨텍스트, 디자인 결정, 예외 처리 등.

- {자유 형식 메모}
