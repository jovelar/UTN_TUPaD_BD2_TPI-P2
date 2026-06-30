# Informe Parte 2 - TPI Bases de Datos 2

## Análisis RTO y RPO (Backup y Restauración)

En el marco del sistema de gestión para el Taller Mecánico, se ha analizado el impacto ante una eventual pérdida de datos o caída del servicio para definir objetivos de recuperación:

**RTO:** Se define un RTO de **24 horas**. Un taller mecánico tradicional puede operar de forma temporal mediante registros manuales sin que su negocio se detenga por completo. Un tiempo de recuperación de un día permite al admin restaurar la base de datos a partir del último backup.

**RPO:** Se define un RPO de **24 horas**. Dado el volumen de operaciones diarias (alta de clientes, asignación de trabajos y facturación), la pérdida de más de un día de información implicaría mucho trabajo administrativo para volver a cargar los datos. Por lo tanto, el script `backup.bat` se deberá ejecutar diariamente asegurando que, en el peor de los casos, solo se pierda la carga de datos del último día.

## Conclusión

La implementación de la conexión Cliente-Servidor mediante Node.js y MongoDB Atlas (nube) representó un desafío inicial en cuanto al manejo de la asincronía. Comprender que las lecturas y escrituras no son instantáneas, sino que dependen de la red y requieren el uso de Promesas `async/await`, fue fundamental para el correcto flujo en la aplicación de consola.

Por otro lado, a pesar de usar herramientas NoSQL donde el esquema es flexible, aprendimos que la responsabilidad de validar los tipos de datos (como evitar insertar valores `NaN` o fechas inválidas) recae fuertemente del lado del servidor. 

Finalmente, el resguardo mediante `mongodump` demostró ser una solución sencilla y robusta para asegurar la persistencia en la nube ante escenarios de pérdida de credenciales o datos en la DB, ya sea por error humano o fallos del sistema, sobretodo si se ejecutan respetando el RPO y RTO definidos.
