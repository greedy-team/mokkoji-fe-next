#!/bin/bash
if [ "$VERCEL_GIT_COMMIT_REF" = "main" ]; then
  exit 1
elif [ "$VERCEL_GIT_COMMIT_REF" = "develop" ] && echo "$VERCEL_GIT_COMMIT_MESSAGE" | grep -q "\[deploy\]"; then
  exit 1
else
  exit 0
fi
