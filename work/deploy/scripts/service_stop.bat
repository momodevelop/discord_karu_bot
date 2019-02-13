call env

@echo "Stopping"
plink %IP% -l %USER% -pw %PASS% bash %DEST%/src/stop.sh
pause