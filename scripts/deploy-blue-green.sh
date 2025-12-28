set -e

echo "=== Blue-Green Deployment Script ==="

if [ -f "nginx/active/color.txt" ]; then
    CURRENT_COLOR=$(cat nginx/active/color.txt)
else
    CURRENT_COLOR="blue"
    echo "blue" > nginx/active/color.txt
fi

if [ "$CURRENT_COLOR" == "blue" ]; then
    NEW_COLOR="green"
    NEW_CONTAINER="mokkoji-green"
    NEW_PORT=3002
    OLD_CONTAINER="mokkoji-blue"
else
    NEW_COLOR="blue"
    NEW_CONTAINER="mokkoji-blue"
    NEW_PORT=3001
    OLD_CONTAINER="mokkoji-green"
fi

echo "Current active: $CURRENT_COLOR"
echo "Deploying to: $NEW_COLOR"

echo ""
echo "Step 1: Starting $NEW_COLOR container..."
docker-compose up -d app-$NEW_COLOR

echo ""
echo "Step 2: Waiting for $NEW_COLOR to be healthy..."
HEALTH_CHECK_URL="http://localhost:$NEW_PORT/api/health"

for i in {1..60}; do
    if curl -f $HEALTH_CHECK_URL > /dev/null 2>&1; then
        echo "Health check passed on attempt $i!"
        break
    fi

    if [ $i -eq 60 ]; then
        echo "❌ Health check failed after 60 attempts!"
        echo "Stopping $NEW_COLOR and keeping $CURRENT_COLOR active..."
        docker-compose stop app-$NEW_COLOR
        docker-compose logs --tail=50 app-$NEW_COLOR
        exit 1
    fi

    echo "Attempt $i/60... (waiting 2s)"
    sleep 2
done

echo ""
echo "Step 3: Switching Nginx to $NEW_COLOR..."
echo "server $NEW_CONTAINER:3000;" > nginx/active/upstream.conf
echo "$NEW_COLOR" > nginx/active/color.txt

echo ""
echo "Step 4: Reloading Nginx..."
docker exec mokkoji-nginx nginx -t && docker exec mokkoji-nginx nginx -s reload

echo ""
echo "Step 5: Waiting for existing connections to drain (10s)..."
sleep 10

echo ""
echo "Step 6: Stopping old $CURRENT_COLOR container..."
docker-compose stop app-$CURRENT_COLOR

echo ""
echo "=== Deployment Complete! ==="
echo "Active container: $NEW_COLOR ($NEW_CONTAINER)"
echo "Stopped container: $CURRENT_COLOR ($OLD_CONTAINER)"
echo ""
echo "Current status:"
docker-compose ps
