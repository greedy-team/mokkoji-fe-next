set -e

echo "운영 환경 무중단 배포를 시작합니다"

if [ -f "nginx/active/prod-color.txt" ]; then
    CURRENT_COLOR=$(cat nginx/active/prod-color.txt)
else
    CURRENT_COLOR="blue"
    echo "blue" > nginx/active/prod-color.txt
fi

if [ "$CURRENT_COLOR" == "blue" ]; then
    NEW_COLOR="green"
    NEW_CONTAINER="mokkoji-prod-green"
    NEW_PORT=3002
    OLD_CONTAINER="mokkoji-prod-blue"
else
    NEW_COLOR="blue"
    NEW_CONTAINER="mokkoji-prod-blue"
    NEW_PORT=3001
    OLD_CONTAINER="mokkoji-prod-green"
fi

echo "현재 활성 컨테이너: $CURRENT_COLOR"
echo "새로 배포할 컨테이너: $NEW_COLOR"

echo ""
echo "$NEW_COLOR 컨테이너 시작"
docker-compose up -d app-prod-$NEW_COLOR

echo ""
echo "$NEW_COLOR 컨테이너의 헬스 체크 진행"
HEALTH_CHECK_URL="http://localhost:$NEW_PORT/api/health"

for i in {1..60}; do
    if curl -f $HEALTH_CHECK_URL > /dev/null 2>&1; then
        echo "헬스 체크 성공"
        break
    fi

    if [ $i -eq 60 ]; then
        echo "헬스 체크 실패"
        echo "$NEW_COLOR 컨테이너를 중지하고 $CURRENT_COLOR를 유지"
        docker-compose stop app-prod-$NEW_COLOR
        docker-compose logs --tail=50 app-prod-$NEW_COLOR
        exit 1
    fi

    echo "헬스 체크 ($i/60)"
    sleep 2
done

echo ""
echo "Nginx를 $NEW_COLOR로 전환"
echo "server $NEW_CONTAINER:3000;" > nginx/active/prod-upstream.conf

echo ""
echo "Nginx 리로드"
docker exec mokkoji-nginx nginx -s reload || echo "Nginx 리로드 실패"

echo ""
echo "기존 연결이 종료될 때까지 대기"
sleep 10

echo ""
echo "이전 $CURRENT_COLOR 컨테이너 중지"
docker-compose stop app-prod-$OLD_CONTAINER

echo $NEW_COLOR > nginx/active/prod-color.txt

echo ""
echo "배포 완료"
echo "활성 컨테이너: $NEW_COLOR ($NEW_CONTAINER)"
echo "중지된 컨테이너: $CURRENT_COLOR ($OLD_CONTAINER)"

echo ""
echo "현재 컨테이너 상태:"
docker-compose ps
