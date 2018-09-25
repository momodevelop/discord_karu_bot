call env

@SET SRC=package/src/**
@echo "Deploying"
pscp -r -pw %PASS% %SRC% %USER%@%IP%:%DEST%/
