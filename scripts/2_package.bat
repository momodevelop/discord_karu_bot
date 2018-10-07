@echo "Packaging..."
cd..
rmdir package /s /q
mkdir package
mkdir package\src
mkdir package\img
mkdir package\node_modules
xcopy /S /Y out package\src /EXCLUDE:scripts\package_exclude_list.txt
xcopy /S /Y inc package\src /EXCLUDE:scripts\package_exclude_list.txt
xcopy /S /Y img package\img /EXCLUDE:scripts\package_exclude_list.txt
xcopy /S /Y node_modules package\node_modules /EXCLUDE:scripts\package_exclude_list.txt