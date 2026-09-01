---
description: 변경사항을 커밋한다
argument-hint: [커밋 대상 힌트 (선택)]
allowed-tools: Bash, Read, Grep, Glob
---

# 커밋 워크플로우

## 1. 현재 상태 확인

아래 명령을 **병렬로** 실행한다:

```bash
git status
git diff --staged
git diff
git log --oneline -5
```

## 2. 스테이징

- `git add -A`나 `git add .`는 **절대 사용하지 않는다.** 항상 파일을 명시해서 스테이징한다.
- 변경된 파일을 분석해 **작업 단위별로** 스테이징한다.
- `.env*`, `credentials`, `.claude/settings.local.json` 등 민감·개인 파일은 제외한다.

## 3. 커밋 메시지 작성

이 레포의 커밋 컨벤션은 `commitlint.config.js`가 강제한다. 헤더는 아래 정규식을 **반드시** 만족해야 한다:

```
^\[(#\d+|no-issue)\] (type): (subject)$
```

즉 형식은:

```
[#{이슈번호}] {type}: {subject}
[no-issue] {type}: {subject}
```

- **이슈 번호**: 현재 브랜치명 앞부분에서 추출한다 (예: `541-feat-club-bookmark-api` → `#541`).
  브랜치명에 번호가 없으면 `no-issue`를 쓴다. 대괄호는 생략할 수 없다.
- **type**: 아래 15개 중 하나. (`commitlint.config.js`의 `type-enum`과 동일)

  `build` · `chore` · `ci` · `comment` · `design` · `docs` · `feat` · `fix` · `hotfix` · `perf` · `refactor` · `remove` · `revert` · `style` · `test`

- **subject**: 한국어로 간결하게. 무엇을 했는지가 드러나게 쓴다. 마침표는 붙이지 않는다.

```
# 올바른 예
[#727] fix: sitemap 클럽 페이지네이션 0-based 오류 수정
[no-issue] hotfix: 카카오 로그인 요청에 universityCode 누락 수정

# 잘못된 예
fix: 오류 수정                      ← [#번호] 누락, commitlint 실패
[#727] fix - 오류 수정              ← 콜론 아님, commitlint 실패
[#727] fixed: 오류를 수정했습니다.   ← type-enum 밖, 마침표
```

## 4. 커밋 실행

본문이 필요 없으면 한 줄로 커밋한다:

```bash
git commit -m "[#{이슈번호}] {type}: {subject}"
```

본문이 필요하면 heredoc을 쓴다:

```bash
git commit -m "$(cat <<'EOF'
[#{이슈번호}] {type}: {subject}

{본문 — 왜 이렇게 바꿨는지. 무엇을 바꿨는지는 diff가 말해준다.}
EOF
)"
```

- **`Co-Authored-By` 트레일러를 붙이지 않는다.** 어떤 형태로도 추가하지 않는다.
- 커밋 메시지에 모델명·에이전트 서명·생성 도구 표기를 넣지 않는다.

## 5. 작업 단위 분리

- 작업 종류(기능 추가, 리팩터링, 버그 수정, 설정 변경 등)가 다르면 커밋을 분리한다.
- FSD 레이어 단위가 아니라 **작업 단위**로 쪼갠다.
- 사용자에게 분리 방안을 제안하고 확인받은 뒤 진행한다.

## 안전 규칙

- 커밋 전 반드시 `git status`로 스테이징 내용을 확인한다.
- hook 실패 시 원인을 파악하고 수정한 뒤 **새 커밋**을 만든다. `--amend`하지 않는다.
- `--no-verify`는 사용하지 않는다.
- `develop`·`main`에 직접 커밋하지 않는다. 해당 브랜치라면 사용자에게 알리고 `/create_issue`로 브랜치를 먼저 만든다.
