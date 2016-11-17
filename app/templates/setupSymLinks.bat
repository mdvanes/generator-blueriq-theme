::::::::::::::::::::::::::::::::::::::::::::
:: Automatically check & get admin rights V2
::::::::::::::::::::::::::::::::::::::::::::
@echo off
CLS

ECHO.
ECHO =============================
ECHO Running Admin shell
ECHO =============================

:init
setlocal DisableDelayedExpansion
set "batchPath=%~0"
for %%k in (%0) do set batchName=%%~nk
set "vbsGetPrivileges=%temp%\OEgetPriv_%batchName%.vbs"
setlocal EnableDelayedExpansion

:checkPrivileges
NET FILE 1>NUL 2>NUL
if '%errorlevel%' == '0' ( goto gotPrivileges ) else ( goto getPrivileges )

:getPrivileges
if '%1'=='ELEV' (echo ELEV & shift /1 & goto gotPrivileges)
ECHO.
ECHO **************************************
ECHO Invoking UAC for Privilege Escalation
ECHO **************************************

ECHO Set UAC = CreateObject^("Shell.Application"^) > "%vbsGetPrivileges%"
ECHO args = "ELEV " >> "%vbsGetPrivileges%"
ECHO For Each strArg in WScript.Arguments >> "%vbsGetPrivileges%"
ECHO args = args ^& strArg ^& " "  >> "%vbsGetPrivileges%"
ECHO Next >> "%vbsGetPrivileges%"
ECHO UAC.ShellExecute "!batchPath!", args, "", "runas", 1 >> "%vbsGetPrivileges%"
"%SystemRoot%\System32\WScript.exe" "%vbsGetPrivileges%" %*
exit /B

:gotPrivileges
setlocal & pushd .
cd /d %~dp0
if '%1'=='ELEV' (del "%vbsGetPrivileges%" 1>nul 2>nul  &  shift /1)

::::::::::::::::::::::::::::
::START
::::::::::::::::::::::::::::
REM Run shell as admin (example) - put here code as you like
REM ECHO %batchName% Arguments: %1 %2 %3 %4 %5 %6 %7 %8 %9

:attribution
echo This script will have tried to elevate itself to admin through UAC. This is required to be able to mklink the STG file. The themedir mklink can be made without admin rights.
echo.
echo Script to run as admin from: http://winaero.com/blog/how-to-auto-elevate-a-batch-file-to-run-it-as-administrator/
echo.

:banner
echo /-----------------------------------\
echo ^| ______ _                 _        ^|
echo ^| ^| ___ \ ^|               (_)       ^|
echo ^| ^| ^|_/ / ^|_   _  ___ _ __ _  __ _  ^|
echo ^| ^| ___ \ ^| ^| ^| ^|/ _ \ '__^| ^|/ _` ^| ^|
echo ^| ^| ^|_/ / ^| ^|_^| ^|  __/ ^|  ^| ^| (_^| ^| ^|
echo ^| \____/^|_^|\__,_^|\___^|_^|  ^|_^|\__, ^| ^|
echo ^|                               ^| ^| ^|
echo ^|                               ^|_^| ^|
echo ^|       Theme SymLink Maker         ^|
echo \-----------------------------------/
echo.

:makelinks
echo Enter the full path of aquima.home, where this theme will run.
set /p configPath="Path: "
pushd "%configPath%" 2>NUL && popd
if %ERRORLEVEL% neq 0 (
	ECHO ERROR: No aquima.home found at %configPath%. Enter the path including aquima.home. This script will now exit.
	pause
	exit /B
)
echo You selected this path: %configPath%.

REM replaced with the themename by yeoman
set THEMENAME=<%= projectName %>

REM Make themedir symlink
@echo on
mklink /J "%configPath%\webresources\mvc\v2\themes\%THEMENAME%" "%~dp0\webresources\mvc\v2\themes\%THEMENAME%" 
@echo off
echo.

REM Make STG symlink
rem echo TODO it should make symlinks to this projects UI/../[themename].stg and webresources/../[themename]/
@echo on
mklink "%configPath%\UI\mvc\v2\%THEMENAME%.stg" "%~dp0\UI\mvc\v2\%THEMENAME%.stg"
@echo off
echo.

echo Script completed
pause