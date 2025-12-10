echo "restarting docker-compose up in background ..." 
nohup docker compose up > logfile.log 2>&1 &