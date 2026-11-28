아래 가이드 전체를 마크다운 형식 그대로 사용자에게 출력해줘. 요약하거나 해석하지 말고 원문 그대로 보여줘.

---

# 모꼬지 에이전트 사용 가이드

모꼬지 프로젝트는 Claude Code 에이전트로 개발 워크플로우를 자동화합니다.
상황에 맞는 방법을 선택하세요.

---

## 상황 1 — 새 기능을 처음 개발할 때

요구사항을 대화창에 직접 전달하거나, 파일 기반 스펙이 필요할 때 `.claude/spec.md`를 작성한 뒤 입력:

```
spec-parser 실행해줘
```

spec-parser가 현재 구현과 검증 증거를 함께 확인해 `검증됨 / 검증 필요 / 미완성`으로 구분합니다. 파일이 있다는 이유만으로 완료 처리하지 않으며, 검증 필요·미완성 항목만 project-orchestrator에 전달합니다.

### spec.md 작성 방법

`.claude/spec-template.md`를 복사해 `.claude/spec.md`로 저장 후 채웁니다.

#### 개요 섹션
```
- 기능: 내가 작성한 댓글
- 도메인: my-comment          ← features/my-comment/, widgets/my-comment/ 경로에 사용됨
- 라우트: /my/comments        ← (main)/my/comments → 로그인 필요 페이지
```

#### API 섹션 — 반드시 포함해야 할 정보
```
### GET /members/me/comments

- 인증: 필요                  ← 필요 / 불필요 중 하나
- 응답:
  {
    id: number;
    content: string;
    createdAt: string;
  }
- 에러: 401 — 로그인 필요
```

> 인증 필요 → `auth-api` 클라이언트 사용, 불필요 → `server-api` 사용으로 자동 처리됩니다.

#### 컴포넌트 섹션 — 공유 vs 도메인 구분

| 구분 | 기준 | 위치 |
|------|------|------|
| 공유 컴포넌트 | 2개 이상 domain에서 사용 | `shared/ui/` |
| 도메인 컴포넌트 | 이 기능에서만 사용 | `features/{domain}/ui/` |

```
## 공유 컴포넌트
### CommentCard
- 역할: 댓글 카드 (다른 domain에서도 사용)
- CSS: .claude/figma/my-comment/comment-card.txt

## 도메인 컴포넌트 (Block)
### MyCommentItem
- domain: my-comment
- 역할: 내 댓글 목록 아이템 (my-comment에서만 사용)
- CSS: .claude/figma/my-comment/my-comment-item.txt
```

#### 위젯 섹션

```
### MyCommentWidget
- domain: my-comment
- 사용할 Block:
  - MyCommentItem: 댓글 아이템 반복 렌더링
```

#### 페이지 섹션

```
### MyCommentPage
- 라우트: (main)/my/comments    ← 라우트 그룹 포함해서 작성
- 위젯: MyCommentWidget
- 데이터 페칭: getMyComments()
```

라우트 그룹은 파일 구성 힌트일 뿐 인증 근거가 아닙니다. 실제 `route.ts`, middleware, layout/handler 가드와 확정 AC를 확인해 인증 동작과 테스트를 정합니다.

#### Figma CSS 추출 방법

1. Figma에서 컴포넌트/위젯 프레임 선택
2. 우측 패널 → "Copy as CSS" (All layers)
3. `.claude/figma/{feature}/{component-name}.txt`로 저장
4. 스펙 문서의 CSS 항목에 경로 기입

> CSS가 없어도 개발은 됩니다. 있으면 Figma 디자인과 더 정확하게 일치시킵니다.

---

## 상황 2 — 컴포넌트/위젯/페이지를 하나만 만들 때

전체 파이프라인 없이 에이전트를 직접 호출합니다.

### 공통 컴포넌트 (shared/ui)

```
CommentCard 컴포넌트 만들어줘
CSS: (Figma CSS 붙여넣기 또는 파일 경로)
```

→ `component-builder` 자동 실행. Storybook stories도 함께 생성됩니다.

### 도메인 컴포넌트 (features/{domain}/ui)

```
my-comment 도메인에 MyCommentItem 블록 만들어줘
역할: 내 댓글 아이템 카드
CSS: .claude/figma/my-comment/my-comment-item.txt
```

### 위젯 (widgets/{domain}/ui)

```
my-comment 위젯 만들어줘
위젯명: MyCommentWidget
사용할 Block: MyCommentItem
```

### 페이지 (views + app/page.tsx)

```
my-comment 페이지 만들어줘
라우트: (main)/my/comments
뷰 이름: MyCommentPage
위젯: MyCommentWidget
```

---

## 상황 3 — 기존 코드가 바뀌었을 때

타입, API 응답 구조, 컴포넌트 props가 바뀌면 import하는 파일들을 연쇄 수정해야 합니다.

```
Comment 타입에 clubName 필드가 추가됐어
영향 범위 분석해줘
```

또는

```
src/entities/my-comment/model/type.ts 바뀌었어
impact-analyzer 실행해줘
```

→ `impact-analyzer`가 변경 파일을 import하는 모든 파일을 추적해 수정 목록을 보여줍니다.
수정 진행 여부를 확인 후 FSD 의존 순서(entities → features → widgets → views)로 자동 수정합니다.

---

## 상황 4 — Notion 회의록에서 개발 작업을 만들 때

회의록 또는 작업 페이지 URL을 전달하고 요청합니다.

```
이 Notion 회의록에서 프론트 개발 작업을 정리하고 구현 계획을 세워줘
```

→ `plan-from-notion`이 팀 `notion-team` MCP로 지정한 한 페이지와 필요한 하위 내용만 읽습니다. 확정 결정·제안·보류·충돌을 출처와 함께 구분하고, 선택한 작업의 AC와 테스트 전략을 `verification-loop`로 전달합니다. 일반 회의 요약에는 개발 파이프라인을 강제하지 않습니다.

Notion 쓰기, 이슈·PR 생성, 푸시는 별도 요청 없이는 수행하지 않습니다.

---

## 구현 검증 흐름

기능·버그 수정·동작 리팩터링은 구현 전에 `verification-loop`를 적용합니다.

```
요구사항·출처 확인 → AC·테스트 전략 승인
  → RED 또는 정당한 기준선 → 최소 구현 → GREEN → regression
  → pnpm verify + 영향에 필요한 build/E2E/브라우저 검증
  → 검증된 작업 단위 커밋
```

테스트 파일 생성, lint 또는 build 성공만으로 동작 완료를 선언하지 않습니다. 필수 검사가 실패하거나 막히면 미검증 범위를 포함해 부분 완료 또는 차단으로 보고합니다.

---

## 에이전트 자동 연결 흐름

```
spec-parser
  └→ project-orchestrator
       ├→ AC별 테스트 작성·RED 확인
       ├→ api-builder       (features/{domain}/api/)
       ├→ component-builder (shared/ui/) → storybook-writer
       ├→ block-builder     (features/{domain}/ui/)
       ├→ widget-builder    (widgets/{domain}/ui/) → storybook-writer
       ├→ page-builder      (views/{domain}/ui/ + app/{route}/page.tsx)
       ├→ 선택된 E2E 실행 및 통합 회귀
       └→ pnpm verify + 필요한 build 검증

각 builder 완료 후 자동 검증:
  GREEN 확인 → structure-validator → css-validator (CSS 있을 때) → semantic-validator
```

---

## 검증 에이전트 단독 실행

```
구조 검증해줘                          → structure-validator
Figma CSS랑 비교해줘                   → css-validator
시맨틱 태그 검증해줘                    → semantic-validator
PR 작성해줘                           → pr-writer
스토리북 만들어줘 (파일 경로)           → storybook-writer
```
