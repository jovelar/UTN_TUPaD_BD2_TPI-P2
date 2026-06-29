# TPI Bases de Datos II - Parte 2

Grupo 87 - Paschetta Gaston / Ovelar Isaias Javier

Aplicacion de consola en Node.js que conecta a MongoDB Atlas y permite el CRUD
(con baja logica) del dominio taller mecanico: usuarios, clientes y trabajos.

## Requisitos

- Node.js 18 o superior
- Conexion a internet (la base esta en MongoDB Atlas)

## Instalacion

Parado en la carpeta del proyecto:

```
pnpm install
```

(o `npm install`). Esto baja el driver `mongodb`.

## Ejecucion

```
node main.js
```

## Menu

El menu principal permite elegir entre las tres colecciones:

```
1 Usuarios
2 Clientes
3 Trabajos
0 Salir
```

Cada uno abre su propio ABM:

- Alta: inserta un documento nuevo (nace con disponible: true)
- Editar: selecciona por numero y modifica campos (ENTER = no cambiar)
- Baja logica: marca disponible: false (no borra el documento)
- Ver: lista solo los activos (disponible: true)

Clientes tiene ademas un submenu de Vehiculos (alta, edicion y baja de los
vehiculos embebidos en cada cliente).

## Notas

- La baja logica nunca elimina datos: cambia el campo disponible a false, y los
  listados filtran disponible: true.
- Los campos con valores fijos (rol, forma de pago, estado) se eligen de un
  selector numerado para respetar el validator de la base.
- Las referencias entre colecciones (un trabajo apunta a un cliente, un usuario
  y un vehiculo) se guardan por ObjectId.

## Backup

El resguardo de la base se realiza con el script `backup.bat`, que usa
`mongodump` para descargar la base dentro de `resguardos_tpi\<fecha>`.
