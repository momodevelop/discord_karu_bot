call env

cd..

@SET SRC_SRC=package/src/**
@echo "Deploying"
plink %IP% -l %USER% -pw %PASS% rm -rf %DEST%; mkdir %DEST%
pscp -r -pw %PASS% %SRC_SRC% %USER%@%IP%:%DEST%
plink %IP% -l %USER% -pw %PASS% bash %DEST%/install_for_deploy.sh
