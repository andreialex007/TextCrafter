@echo off
setlocal

:: Get current date and time in YYYYMMDD_HHMMSS format
for /f "tokens=2 delims==" %%I in ('"wmic os get localdatetime /value"') do set datetime=%%I
set datetime=%datetime:~0,8%_%datetime:~8,6%

:: Run Alembic with the generated timestamp
alembic -c alembic.ini revision --autogenerate -m "%datetime%"

endlocal
