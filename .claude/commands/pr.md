---
description: PR을 생성한다 (--draft 옵션으로 draft PR 가능)
argument-hint: [--draft (선택)]
allowed-tools: Bash, Read, Grep, Glob
---

# PR 생성 워크플로우

- 레포지토리: `greedy-team/mokkoji-fe-next`
- base 브랜치: 항상 `develop`

## 1. 현재 상태 확인

아래 명령을 **병렬로** 실행한다:

```bash
git status
git log --oneline develop..HEAD
git diff develop...HEAD --stat
```

- 커밋되지 않은 변경사항이 있으면 사용자에게 알리고 `/commit`을 먼저 실행할지 확인한다.
- `develop..HEAD`가 비어 있으면 PR로 만들 커밋이 없다는 뜻이다. 멈추고 알린다.

## 2. PR 본문 작성 — 레포 템플릿을 그대로 따른다

**`.github/PULL_REQUEST_TEMPLATE.md`를 Read로 직접 읽고, 그 파일의 섹션 구조를 그대로 채운다.**
이 커맨드에 템플릿 내용을 복사해두지 않는 이유는 템플릿이 바뀌어도 자동으로 따라가게 하기 위함이다.

채우는 규칙:

- **`## #️⃣연관된 이슈`** — 템플릿의 `> ex)` 안내 줄은 지우고 `closes #{이슈번호}` 를 쓴다.
  - 이슈 번호는 현재 브랜치명 앞부분에서 추출한다 (예: `541-feat-club-bookmark-api` → `closes #541`).
  - 브랜치명에 번호가 없으면 커밋 메시지의 `[#번호]`에서 찾는다.
  - 그래도 없으면 이 섹션은 비워두고, 사용자에게 "연관 이슈 없음"임을 알린다.
- **`## 📝작업 내용`** — 안내 인용줄은 지우고 실제 내용을 쓴다.
  - `develop..HEAD`의 **모든 커밋**을 근거로 작성한다. 마지막 커밋만 보지 않는다.
  - 무엇을 왜 바꿨는지 쓴다. 변경 파일 나열은 하지 않는다 (GitHub이 이미 보여준다).
  - 항목이 여러 개면 불릿으로 정리한다.
- **`### 스크린샷 (선택)`** — UI 변경이 없으면 섹션째로 지운다. 있으면 헤딩만 남기고 사용자에게 첨부를 안내한다.
- **`## 💬리뷰 요구사항(선택)`** — 특별히 봐줄 부분이 없으면 섹션째로 지운다. 빈 인용문만 남기지 않는다.

## 3. PR 제목

```
{type}: {한국어 요약}
```

- **제목에 `[#123]` 같은 이슈 번호 접두사를 붙이지 않는다.** 이슈 연결은 본문의 `closes #번호`가 담당한다.
- `type`은 커밋 컨벤션과 동일한 15개 중 하나: `build` · `chore` · `ci` · `comment` · `design` · `docs` · `feat` · `fix` · `hotfix` · `perf` · `refactor` · `remove` · `revert` · `style` · `test`
- 커밋이 여러 개면 PR 전체를 대표하는 type 하나를 고른다.
- 70자 이내.

```
# 올바른 예
feat: 카카오 AdFit을 Google AdSense로 교체
perf: 정적 자산을 해시 URL로 전환해 영구 캐싱 적용

# 잘못된 예
[#699] feat: 카카오 AdFit을 Google AdSense로 교체   ← 이슈 번호 접두사 금지
동아리 목록 수정                                     ← type 누락
```

> squash merge 시 GitHub이 제목 뒤에 `(#PR번호)`를 자동으로 붙인다. 직접 쓰지 않는다.

## 4. 승인 → Push → 생성

**제목과 본문 초안을 사용자에게 보여주고 멈춘다.** 수정 요청이 오면 반영해 다시 보여준다.

승인되면:

```bash
git push -u origin {현재브랜치명}
```

`$ARGUMENTS`에 `--draft`가 있으면 `--draft`를 붙여 생성한다:

```bash
gh pr create --repo greedy-team/mokkoji-fe-next --base develop \
  --title "{제목}" \
  --body "$(cat <<'EOF'
{PR 본문}
EOF
)"
```

생성된 PR URL을 사용자에게 보여준다.

## 안전 규칙

- `git push --force`는 절대 사용하지 않는다.
- PR 생성 전 반드시 사용자의 승인을 받는다.
- base 브랜치는 항상 `develop`이다. `main`으로 PR을 열지 않는다.
- `gh` 인증이 안 되어 있으면(`gh auth status` 실패) 사용자에게 `gh auth login`을 안내하고 멈춘다.
