@echo off
title Smart Canteen Management System
echo ========================================================
echo   Launching Smart Canteen Web App...
echo ========================================================
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
