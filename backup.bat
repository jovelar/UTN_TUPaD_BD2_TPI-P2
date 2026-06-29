@echo off
REM backup_cmd.bat - Resguardo de la base del TPI con mongodump (CMD puro).
REM Ejecutar parado en la raiz del proyecto: backup_cmd.bat
REM NOTA: la fecha se arma desde %DATE%, asumiendo formato DD/MM/AAAA.
REM Si tu Windows muestra la fecha en otro orden, ajustar los indices de abajo.

REM %DATE% suele venir como "DD/MM/AAAA". Tomamos cada parte.
set dia=%DATE:~0,2%
set mes=%DATE:~3,2%
set anio=%DATE:~6,4%
set fecha=%anio%-%mes%-%dia%

REM Carpeta destino con rutas relativas: resguardos_tpi\<fecha>
set destino=resguardos_tpi\%fecha%
if not exist "%destino%" mkdir "%destino%"

REM Conexion a Atlas. La base "taller" va en el path del URI.
set uri=mongodb://BD2TPI:admin1234@ac-qqctg7w-shard-00-00.ggv0hxk.mongodb.net:27017,ac-qqctg7w-shard-00-01.ggv0hxk.mongodb.net:27017,ac-qqctg7w-shard-00-02.ggv0hxk.mongodb.net:27017/taller?ssl=true^&replicaSet=atlas-131ots-shard-0^&authSource=admin

mongodump --uri="%uri%" --out="%destino%"

echo Backup completado en: %destino%