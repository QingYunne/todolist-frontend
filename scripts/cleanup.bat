@echo off
REM ============== Colors & Setup ==============
setlocal enabledelayedexpansion
chcp 65001 >nul

REM ============== Title ==============
cls
echo.
echo ======================================
echo Docker Compose Cleanup Script
echo ======================================
echo.

REM ============== Down all containers + volumes ==============
echo [1/3] Stopping and removing containers + volumes...
docker compose down -v >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Containers and volumes removed
) else (
    echo [WARN] No docker-compose found or already down
)
echo.

REM ============== Remove project images ==============
set /p confirm_project="[2/3] Remove project images (backend, frontend)? [y/N] "
if /i "%confirm_project%"=="y" (
    echo Removing project images...
    docker rmi ghcr.io/qingyunne/todolist-backend:latest 2>nul
    docker rmi ghcr.io/qingyunne/todolist-frontend:latest 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo [OK] Project images removed
    ) else (
        echo [WARN] Some images not found (OK if not built yet)
    )
)
echo.

REM ============== Remove database images ==============
set /p confirm_db="[3/3] Remove database image (postgres:16-alpine)? [y/N] "
if /i "%confirm_db%"=="y" (
    echo Removing database images...
    docker rmi postgres:16-alpine 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo [OK] Database image removed
    ) else (
        echo [WARN] Database image not found (OK)
    )
)
echo.

REM ============== Summary ==============
echo ======================================
echo Cleanup complete!
echo ======================================
echo.
echo Next steps:
echo   1. Build images:   docker-compose build
echo   2. Run stack:      docker-compose up -d
echo   3. Check logs:     docker-compose logs -f
echo.
pause