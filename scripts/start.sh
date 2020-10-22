# Start up the local DB
echo "Checking if DB is already started...\n"
docker logs ticket-project-api_db_1 &> /dev/null
if [ $? -ne 0 ]; then
  echo "DB is not up, starting now...\n"
  docker-compose up -d
  echo "\nWaiting for DB to be ready...\n"
  sleep 15s
  echo "DB is ready, starting server!\n"
else
  echo "DB is already started!\n"
fi

# Start up the app
node server/app.js