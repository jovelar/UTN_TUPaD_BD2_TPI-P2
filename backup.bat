@echo off
REM backup_cmd.bat - Resguardo de la base del TPI con mongodump (CMD puro).
REM Ejecutar parado en la raiz del proyecto: backup_cmd.bat

echo ===================================================
echo Iniciando proceso de backup...

REM Fecha y hora garantizada usando WMIC
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set dt=%%I
set anio=%dt:~0,4%
set mes=%dt:~4,2%
set dia=%dt:~6,2%
set hora=%dt:~8,2%
set min=%dt:~10,2%

set fecha=%anio%-%mes%-%dia%
set hora_fmt=%hora%-%min%

echo Obteniendo fecha del sistema: %fecha% %hora_fmt%

REM 2. Carpeta destino con rutas relativas: resguardos_tpi\<fecha>_<hora>
set destino=resguardos_tpi\%fecha%_%hora_fmt%
echo Verificando directorio de destino: %destino%
if not exist "%destino%" (
    echo Creando directorio: %destino%
    mkdir "%destino%"
)

echo.
echo Conectando a MongoDB Atlas...
REM Conexion a Atlas. La base "taller_mecanico" va en el path del URI.
set uri=mongodb+srv://BD2TPI:admin1234@clusterm0.ggv0hxk.mongodb.net/taller_mecanico

mongodump --uri="%uri%" --out="%destino%"

echo.
echo ===================================================
REM 3. Validacion de salida del comando
if %errorlevel% equ 0 (
    echo [EXITO] Backup completado y guardado en %destino%
) else (
    echo [ERROR] Hubo un problema al realizar el backup con mongodump.
)
echo ===================================================
pause