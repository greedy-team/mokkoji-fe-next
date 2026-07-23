---
description: PR을 생성한다 (--draft 옵션으로 draft PR 가능)
argument-hint: [--draft (선택)]
allowed-tools: Bash, Read, Grep, Glob
---

# PR 생성 워크플로우

## 1. 현재 상태 확인

아래 명령을 **병렬로** 실행한다:

```bash
git status
git log --oneline develop..HEAD
git diff develop...HEAD --stat
```

- 커밋되지 않은 변경사항이 있으면 사용자에게 알리고 `/commit`을 먼저 실행할지 확인한다.
- push되지 않은 커밋이 있으면 push가 필요함을 알린다.

## 2. PR 초안 작성

모든 커밋의 변경사항을 분석해 아래 형식으로 초안을 작성한다:

```markdown
## #️⃣연관된 이슈

> closes #{이슈번호}

## 📝작업 내용

{변경사항 요약. 무엇을 왜 바꿨는지 구체적으로.}

### 스크린샷 (선택)

{UI 변경이 있으면 스크린샷 첨부 안내}

## 💬리뷰 요구사항(선택)

{리뷰어가 특히 봐줬으면 하는 부분}
```

- 이슈 번호는 브랜치명에서 추출한다. 없으면 해당 섹션을 비운다.
- **초안을 사용자에게 보여주고 멈춘다.** 수정 요청이 오면 반영한다.

## 3. Push + PR 생성

승인되면 실행한다:

```bash
git push -u origin {현재브랜치명}
```

`$ARGUMENTS`에 `--draft`가 포함되어 있으면 draft PR로 생성한다:

```bash
gh pr create --base develop --title "{제목}" --draft --body "$(cat <<'EOF'
{PR 본문}
EOF
)"
```

`--draft`가 없으면 일반 PR로 생성한다:

```bash
gh pr create --base develop --title "{제목}" --body "$(cat <<'EOF'
{PR 본문}
EOF
)"
```

- PR 제목은 커밋 컨벤션과 동일한 형식: `{type}: {한국어 요약}` (70자 이내)
- 생성된 PR URL을 사용자에게 보여준다.

## 안전 규칙

- `git push --force`는 절대 사용하지 않는다.
- PR 생성 전 반드시 사용자의 승인을 받는다.
- base 브랜치는 항상 `develop`이다.
