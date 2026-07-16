---
description: 변경사항을 커밋한다
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

- `git add -A`나 `git add .`는 **절대 사용하지 않는다.**
- 변경된 파일을 분석해 **작업 단위별로** 스테이징한다.
- `.env`, `credentials`, `settings.local.json` 등 민감 파일은 제외한다.

## 3. 커밋 메시지 작성

이 레포의 커밋 컨벤션을 따른다:

```
[#{이슈번호}|no-issue] {type}: {subject}
```

- type: `feat`, `fix`, `refactor`, `chore`, `style`, `docs`, `test`, `hotfix`, `design`, `comment`, `remove`, `revert`, `perf`, `build`, `ci`
- subject: 한국어 또는 영어, 간결하게
- 현재 브랜치명에서 이슈 번호를 추출한다. 없으면 `no-issue`를 사용한다.

## 4. 커밋 실행

```bash
git commit -m "$(cat <<'EOF'
[#{이슈번호}|no-issue] {type}: {subject}

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

## 5. 작업 단위 분리

- 작업 종류(기능 추가, 리팩터링, 버그 수정, 설정 변경 등)가 다르면 커밋을 분리한다.
- 사용자에게 분리 방안을 제안하고 확인받은 뒤 진행한다.

## 안전 규칙

- 커밋 전 반드시 `git status`로 스테이징 내용을 확인한다.
- hook 실패 시 원인을 파악하고 수정한 뒤 **새 커밋**을 만든다. `--amend`하지 않는다.
- `--no-verify`는 사용하지 않는다.
