@echo off
:loop
call npm run launch_dev
if %errorlevel% neq 0 (
    timeout /t 5 /nobreak >nul
    goto :loop
)
echo Command executed successfully!