call env

@SET SRC=package/**
@echo "Stopping"
plink %IP% -l %USER% -pw %PASS% bash %DEST%/run.sh
pause