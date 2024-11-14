@echo off
:loop
npm run launch_prod
if %errorlevel% neq 0 (
    timeout /t 5 /nobreak >nul
    goto :loop
)
echo Command executed successfully!