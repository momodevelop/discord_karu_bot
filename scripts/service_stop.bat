call env

@SET DEST=/home/pi/Projects/discord-karu-bot
@SET SRC=package/**
@echo "Stopping"
plink %IP% -l %USER% -pw %PASS% bash %DEST%/stop.sh
pause