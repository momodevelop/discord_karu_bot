call env

plink %IP% -l %USER% -pw %PASS% bash %DEST%/src/run.sh
pause