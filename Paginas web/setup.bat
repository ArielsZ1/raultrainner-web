@echo off
REM Script de instalación rápida del backend para Windows
REM Ejecutar como: setup.bat

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║   Raúl Lencina - Setup Backend para Formulario de Contacto     ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ✗ ERROR: Node.js no está instalado
    echo.
    echo Por favor descarga e instala Node.js desde: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js detectado
node --version
echo.

REM Verificar si npm está disponible
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ✗ ERROR: npm no está disponible
    pause
    exit /b 1
)

echo ✓ npm detectado
npm --version
echo.

REM Instalar dependencias
echo ════════════════════════════════════════════════════════════════
echo Instalando dependencias...
echo ════════════════════════════════════════════════════════════════
echo.

call npm install

if %errorlevel% neq 0 (
    echo.
    echo ✗ Error durante la instalación de dependencias
    pause
    exit /b 1
)

echo.
echo ════════════════════════════════════════════════════════════════
echo ✓ ¡Instalación completada!
echo ════════════════════════════════════════════════════════════════
echo.
echo PRÓXIMOS PASOS:
echo.
echo 1. Abre el archivo .env con un editor de texto
echo 2. Reemplaza los valores con tu información:
echo    - ADMIN_EMAIL: tu email de Gmail
echo    - EMAIL_USER: el mismo email
echo    - EMAIL_PASSWORD: contraseña de aplicación generada en Google
echo.
echo    Para generar contraseña de aplicación:
echo    https://myaccount.google.com/security
echo.
echo 3. Guarda el archivo .env
echo.
echo 4. Para iniciar el servidor, ejecuta:
echo    npm start
echo.
echo    O en modo desarrollo (con auto-reload):
echo    npm run dev
echo.
echo 5. Abre SETUP-GUIDE.html en tu navegador para instrucciones detalladas
echo.
echo ════════════════════════════════════════════════════════════════
echo.

pause
