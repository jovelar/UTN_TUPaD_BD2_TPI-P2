const { MongoClient, ObjectId } = require("mongodb");
const { createInterface } = require("node:readline/promises");

//Cliente por defecto, pero si falla hay que usar el formato viejo
//const cliente= new MongoClient("mongodb+srv://BD2TPI:admin1234@clusterm0.ggv0hxk.mongodb.net/?appName=ClusterM0");

//Formato viejo, utilizar si en el anterior se rechaza la coneccion
const cliente = new MongoClient("mongodb://BD2TPI:admin1234@ac-qqctg7w-shard-00-00.ggv0hxk.mongodb.net:27017,ac-qqctg7w-shard-00-01.ggv0hxk.mongodb.net:27017,ac-qqctg7w-shard-00-02.ggv0hxk.mongodb.net:27017/?ssl=true&replicaSet=atlas-131ots-shard-0&authSource=admin&appName=ClusterM0");

//para la lectura por teclado
const rl = createInterface({ input: process.stdin, output: process.stdout });
const db = cliente.db("taller");

// ===================== USUARIOS =====================
async function menuUsuarios() {
  const col = db.collection("usuarios");
  let opcionMenu;
  do {
    console.log("\n\n####### USUARIOS #######");
    console.log("\n1 Alta");
    console.log("2 Editar");
    console.log("3 Baja logica");
    console.log("4 Ver");
    console.log("0 Volver");
    opcionMenu = await rl.question("");

    if (opcionMenu === "1") {
      // ALTA
      console.log("Inserte el nombre: ");
      const nombre = await rl.question("");

      console.log("Inserte el apellido: ");
      const apellido = await rl.question("");

      console.log("Inserte el DNI: ");
      const DNI = parseInt(await rl.question(""), 10);

      console.log("Inserte el telefono: ");
      const telefono = await rl.question("");

      console.log("Inserte el email: ");
      const email = await rl.question("");

      console.log("Inserte la contrasena: ");
      const contrasena = await rl.question("");

      const roles = ["admin", "empleado"];
      roles.forEach((r, i) => {
        console.log(`${i + 1}) ${r}`);
      });
      console.log("Elija un numero de rol: ");
      const opRol = parseInt(await rl.question(""), 10);
      const rol = roles[opRol - 1];

      await col.insertOne({
        nombre, apellido, DNI, telefono, email, contrasena, rol,
        disponible: true,
      });

    } else if (opcionMenu === "2") {
      //EDITAR
      //Se muestra usuarios existentes
      const usuarios = await col.find({ disponible: true }).toArray();
      usuarios.forEach((u, i) => {
        console.log(`${i + 1}) ID ${u._id} NOMBRE ${u.nombre} EMAIL ${u.email}`);
      });

      console.log("Elija un numero: ");
      const opcion = parseInt(await rl.question(""), 10);

      const elegido = usuarios[opcion - 1];

      if (!elegido) {
        console.log("Opción inválida.");
      } else {
        const id = elegido._id.toString();
        const cambios = {};

        console.log("Nuevo nombre (ENTER = no cambiar): ");
        const nombre = await rl.question("");
        if (nombre) cambios.nombre = nombre;

        console.log("Nuevo apellido (ENTER = no cambiar): ");
        const apellido = await rl.question("");
        if (apellido) cambios.apellido = apellido;

        console.log("Nuevo DNI (ENTER = no cambiar): ");
        const DNI = await rl.question("");
        if (DNI) cambios.DNI = parseInt(DNI, 10);

        console.log("Nuevo telefono (ENTER = no cambiar): ");
        const telefono = await rl.question("");
        if (telefono) cambios.telefono = telefono;

        console.log("Nuevo email (ENTER = no cambiar): ");
        const email = await rl.question("");
        if (email) cambios.email = email;

        console.log("Nueva contrasena (ENTER = no cambiar): ");
        const contrasena = await rl.question("");
        if (contrasena) cambios.contrasena = contrasena;

        console.log("Nuevo rol admin/empleado (ENTER = no cambiar): ");
        const rol = await rl.question("");
        if (rol) cambios.rol = rol;

        await col.updateOne(
          { _id: new ObjectId(id), disponible: true },
          { $set: cambios }
        );
      }
    } else if (opcionMenu === "3") {
      //Baja Logica

      const usuarios = await col.find({ disponible: true }).toArray();
      usuarios.forEach((u, i) => {
        console.log(`${i + 1}) ID ${u._id} NOMBRE ${u.nombre} EMAIL ${u.email}`);
      });

      console.log("Elija un numero: ");
      const opcion = parseInt(await rl.question(""), 10);

      const elegido = usuarios[opcion - 1];

      if (!elegido) {
        console.log("Opción inválida.");
      } else {
        const id = elegido._id.toString();

        await col.updateOne(
          { _id: new ObjectId(id) },
          { $set: { disponible: false } }
        );
        console.log("Usuario eliminado (baja logica)")
      }
    } else if (opcionMenu === "4") {

      //console.log(await col.find({ disponible: true }).toArray());
      await verUsuarios(db.collection("usuarios"));
    }
  } while (opcionMenu !== "0");
}

// ===================== CLIENTES =====================
async function menuClientes() {
  const col = db.collection("clientes");
  let opcionMenu;
  do {
    console.log("\n\n####### CLIENTES #######");
    console.log("\n1 Alta");
    console.log("2 Editar");
    console.log("3 Baja logica");
    console.log("4 Ver");
    console.log("5 Vehiculos");
    console.log("0 Volver");
    opcionMenu = await rl.question("");

    if (opcionMenu === "1") {
      // ALTA
      console.log("Inserte el nombre: ");
      const nombre = await rl.question("");

      console.log("Inserte el apellido: ");
      const apellido = await rl.question("");

      console.log("Inserte el DNI: ");
      const DNI = parseInt(await rl.question(""), 10);

      console.log("Inserte el domicilio: ");
      const domicilio = await rl.question("");

      console.log("Inserte el telefono: ");
      const telefono = await rl.question("");

      console.log("Inserte el email: ");
      const email = await rl.question("");

      // SE DEBE INGRESAR INICIALMENTE 1
      console.log("Inserte la marca del vehiculo: ");
      const marca = await rl.question("");

      console.log("Inserte el modelo: ");
      const modelo = await rl.question("");

      console.log("Inserte la patente: ");
      const patente = await rl.question("");

      console.log("Inserte el kilometraje: ");
      const kilometraje = parseInt(await rl.question(""), 10);

      await col.insertOne({
        nombre, apellido, DNI, domicilio, telefono, email,
        disponible: true,
        vehiculos: [{ _id: new ObjectId(), marca, modelo, patente, kilometraje }],
      });
    } else if (opcionMenu === "2") {
      // actualiza datos (solo del cliente, no los vehiculos)

      //Array para facilitar la seleccion de usuarios poir id
      const clientes = await col.find({ disponible: true }).toArray();
      clientes.forEach((c, i) => {
        console.log(`${i + 1}) ID ${c._id} NOMBRE ${c.nombre} ${c.apellido} EMAIL ${c.email}`);
      });

      console.log("Elija un numero: ");
      const opcion = parseInt(await rl.question(""), 10);

      const elegido = clientes[opcion - 1];   // -1 porque mostraste desde 1

      if (!elegido) {
        console.log("Opción inválida.");
      } else {
        const id = elegido._id.toString();
          const cambios = {};

          console.log("Nuevo nombre (ENTER = no cambiar): ");
          const nombre = await rl.question("");
          if (nombre) cambios.nombre = nombre;

          console.log("Nuevo apellido (ENTER = no cambiar): ");
          const apellido = await rl.question("");
          if (apellido) cambios.apellido = apellido;

          console.log("Nuevo DNI (ENTER = no cambiar): ");
          const DNI = await rl.question("");
          if (DNI) cambios.DNI = parseInt(DNI, 10);

          console.log("Nuevo domicilio (ENTER = no cambiar): ");
          const domicilio = await rl.question("");
          if (domicilio) cambios.domicilio = domicilio;

          console.log("Nuevo telefono (ENTER = no cambiar): ");
          const telefono = await rl.question("");
          if (telefono) cambios.telefono = telefono;

          console.log("Nuevo email (ENTER = no cambiar): ");
          const email = await rl.question("");
          if (email) cambios.email = email;

          await col.updateOne(
            { _id: new ObjectId(id), disponible: true },
            { $set: cambios }
          );
      }
    } else if (opcionMenu === "3") {
      // DELETE (baja lógica)
      const clientes = await col.find({ disponible: true }).toArray();
      clientes.forEach((c, i) => {
        console.log(`${i + 1}) ID ${c._id} NOMBRE ${c.nombre} ${c.apellido} EMAIL ${c.email}`);
      });

      console.log("Elija un numero: ");
      const opcion = parseInt(await rl.question(""), 10);

      const elegido = clientes[opcion - 1];

      if (!elegido) {
        console.log("Opción inválida.");
      } else {
        const id = elegido._id.toString();

        await col.updateOne(
          { _id: new ObjectId(id) },
          { $set: { disponible: false } }
        );
      }

    } else if (opcionMenu === "4") {
      // Muestra solo activos

      await verClientesYVehiculos(col);
    } else if (opcionMenu === "5") {


      // submenu de vehiculos 
      const clientes = await col.find({ disponible: true }).toArray();
      clientes.forEach((c, i) => {
        console.log(`${i + 1}) ID ${c._id} NOMBRE ${c.nombre} ${c.apellido} EMAIL ${c.email}`);
      });

      console.log("Elija un numero: ");
      const opcion = parseInt(await rl.question(""), 10);

      //validacion del formato de ID
      const cli = clientes[opcion - 1];

      if (!cli) {
        console.log("Opción inválida.");
      } else {
        const idCliente = cli._id.toString();
        let opcionAuto;
        do {
          console.log("\n####### VEHICULOS #######");
          console.log("\n1 Agregar");
          console.log("2 Editar");
          console.log("3 Borrar");
          console.log("4 Ver");
          console.log("0 Volver");
          opcionAuto = await rl.question("");

          if (opcionAuto === "1") {
            // alta de vehiculo ($push agrega al array)
            console.log("Inserte la marca: ");
            const marca = await rl.question("");

            console.log("Inserte el modelo: ");
            const modelo = await rl.question("");

            console.log("Inserte la patente: ");
            const patente = await rl.question("");

            console.log("Inserte el kilometraje: ");
            const kilometraje = parseInt(await rl.question(""), 10);

            await col.updateOne(
              { _id: new ObjectId(idCliente) },
              { $push: { vehiculos: { _id: new ObjectId(), marca, modelo, patente, kilometraje } } }
            );

          } else if (opcionAuto === "2") {
            // edita un vehiculo
            const actual = await col.findOne({ _id: new ObjectId(idCliente) });
            actual.vehiculos.forEach((v, i) => {
              console.log(`${i + 1}) ID ${v._id} MARCA ${v.marca} MODELO ${v.modelo} PATENTE ${v.patente} KM ${v.kilometraje}`);
            });

            console.log("Elija un numero: ");
            const opcion = parseInt(await rl.question(""), 10);

            const vehiculo = actual.vehiculos[opcion - 1];

            if (!vehiculo) {
              console.log("Opción inválida.");
            } else {
              const idAuto = vehiculo._id.toString();

              console.log("Inserte el nuevo kilometraje: ");
              const kilometraje = parseInt(await rl.question(""), 10);

              await col.updateOne(
                { _id: new ObjectId(idCliente), "vehiculos._id": new ObjectId(idAuto) },
                { $set: { "vehiculos.$.kilometraje": kilometraje } }
              );
            }

          } else if (opcionAuto === "3") {
            // baja de vehiculo ($pull saca del array)
            const actual = await col.findOne({ _id: new ObjectId(idCliente) });
            actual.vehiculos.forEach((v, i) => {
              console.log(`${i + 1}) ID ${v._id} MARCA ${v.marca} MODELO ${v.modelo} PATENTE ${v.patente} KM ${v.kilometraje}`);
            });

            console.log("Elija un numero: ");
            const opcion = parseInt(await rl.question(""), 10);

            const vehiculo = actual.vehiculos[opcion - 1];

            if (!vehiculo) {
              console.log("Opción inválida.");
            } else {
              const idAuto = vehiculo._id.toString();

              await col.updateOne(
                { _id: new ObjectId(idCliente) },
                { $pull: { vehiculos: { _id: new ObjectId(idAuto) } } }
              );
            }

          } else if (opcionAuto === "4") {
            // ver vehiculos del cliente
            const actual = await col.findOne({ _id: new ObjectId(idCliente) });
            verVehiculos(actual)
          }
        } while (opcionAuto !== "0");
      }

    }
  } while (opcionMenu !== "0");
}

// ===================== TRABAJOS =====================
async function menuTrabajos() {
  const col = db.collection("trabajos");
  let opcionMenu;
  do {
    console.log("\n\n####### TRABAJOS #######");
    console.log("\n1 Alta");
    console.log("2 Editar");
    console.log("3 Baja logica");
    console.log("4 Ver");
    console.log("0 Volver");
    opcionMenu = await rl.question("");

    if (opcionMenu === "1") {
      // Alta
      const colClientes = db.collection("clientes");
      const colUsuarios = db.collection("usuarios");

      // seleccion de cliente
      const clientes = await colClientes.find({ disponible: true }).toArray();
      clientes.forEach((c, i) => {
        console.log(`${i + 1}) ID ${c._id} NOMBRE ${c.nombre} ${c.apellido} EMAIL ${c.email}`);
      });

      console.log("Elija un numero de cliente: ");
      const opCliente = parseInt(await rl.question(""), 10);
      const cli = clientes[opCliente - 1];

      if (!cli) {
        console.log("Opción inválida.");
      } else {
        const id_cliente = cli._id;

        // seleccion de vehiculo del cliente
        cli.vehiculos.forEach((v, i) => {
          console.log(`${i + 1}) ID ${v._id} MARCA ${v.marca} MODELO ${v.modelo} PATENTE ${v.patente} KM ${v.kilometraje}`);
        });

        console.log("Elija un numero de vehiculo: ");
        const opVehiculo = parseInt(await rl.question(""), 10);
        const vehiculo = cli.vehiculos[opVehiculo - 1];

        if (!vehiculo) {
          console.log("Opción inválida.");
        } else {
          const vehiculo_id = vehiculo._id;

          // seleccion de usuario (mecanico)
          const usuarios = await colUsuarios.find({ disponible: true }).toArray();
          usuarios.forEach((u, i) => {
            console.log(`${i + 1}) ID ${u._id} NOMBRE ${u.nombre} EMAIL ${u.email}`);
          });

          console.log("Elija un numero de usuario: ");
          const opUsuario = parseInt(await rl.question(""), 10);
          const usu = usuarios[opUsuario - 1];

          if (!usu) {
            console.log("Opción inválida.");
          } else {
            const id_usuario = usu._id;

            console.log("Inserte la fecha de ingreso (AAAA-MM-DD): ");
            const fecha_ingreso = new Date(await rl.question(""));

            console.log("Inserte la fecha de entrega (AAAA-MM-DD): ");
            const fecha_entrega = new Date(await rl.question(""));

            console.log("Inserte el problema: ");
            const problema = await rl.question("");

            console.log("Inserte el diagnostico: ");
            const diagnostico = await rl.question("");

            console.log("Inserte el total: ");
            const total = parseFloat(await rl.question(""));

            // seleccion de forma de pago
            const formasPago = ["efectivo", "transferencia", "tarjeta", "débito"];
            formasPago.forEach((f, i) => {
              console.log(`${i + 1}) ${f}`);
            });

            console.log("Elija un numero de forma de pago: ");
            const opPago = parseInt(await rl.question(""), 10);
            const forma_de_pago = formasPago[opPago - 1];

            console.log("Inserte la factura: ");
            const factura = await rl.question("");

            // seleccion de estado
            const estados = ["recibido", "en trabajo", "terminado", "entregado"];
            estados.forEach((e, i) => {
              console.log(`${i + 1}) ${e}`);
            });

            console.log("Elija un numero de estado: ");
            const opEstado = parseInt(await rl.question(""), 10);
            const estado = estados[opEstado - 1];

            const repuestos = [];
            let nombreRep;
            do {
              console.log("-- Repuesto (ENTER en el nombre para terminar) --");
              console.log("Inserte el nombre del repuesto: ");
              nombreRep = await rl.question("");

              if (nombreRep) {
                console.log("Inserte la descripcion: ");
                const descripcion = await rl.question("");

                console.log("Inserte la cantidad: ");
                const cantidad = parseInt(await rl.question(""), 10);

                console.log("Inserte el precio unitario: ");
                const precio_unitario = parseFloat(await rl.question(""));

                repuestos.push({ _id: new ObjectId(), nombre: nombreRep, descripcion, cantidad, precio_unitario });
              }
            } while (nombreRep);

            await col.insertOne({
              id_cliente, id_usuario, vehiculo_id,
              fecha_ingreso, fecha_entrega,
              problema, diagnostico, total, forma_de_pago, factura, estado,
              disponible: true,
              repuestos,
            });
          }
        }
      }

    } else if (opcionMenu === "2") {
      // Editar
      const trabajos = await col.find({ disponible: true }).toArray();
      trabajos.forEach((t, i) => {
        console.log(`${i + 1}) ID ${t._id} PROBLEMA ${t.problema} ESTADO ${t.estado}`);
      });

      console.log("Elija un numero: ");
      const opcion = parseInt(await rl.question(""), 10);

      const elegido = trabajos[opcion - 1];

      if (!elegido) {
        console.log("Opción inválida.");
      } else {
        const id = elegido._id.toString();
        const cambios = {};

        const usuarios = await db.collection("usuarios").find({ disponible: true }).toArray();
        usuarios.forEach((u, i) => {
          console.log(`${i + 1}) ID ${u._id} NOMBRE ${u.nombre} EMAIL ${u.email}`);
        });
        console.log("Nuevo usuario (mecanico), elija un numero (ENTER = no cambiar): ");
        const opUsuario = await rl.question("");
        if (opUsuario && usuarios[parseInt(opUsuario, 10) - 1]) cambios.id_usuario = usuarios[parseInt(opUsuario, 10) - 1]._id;

        console.log("Nueva fecha de entrega AAAA-MM-DD (ENTER = no cambiar): ");
        const fecha_entrega = await rl.question("");
        if (fecha_entrega) cambios.fecha_entrega = new Date(fecha_entrega);

        console.log("Nuevo problema (ENTER = no cambiar): ");
        const problema = await rl.question("");
        if (problema) cambios.problema = problema;

        console.log("Nuevo diagnostico (ENTER = no cambiar): ");
        const diagnostico = await rl.question("");
        if (diagnostico) cambios.diagnostico = diagnostico;

        console.log("Nuevo total (ENTER = no cambiar): ");
        const total = await rl.question("");
        if (total) cambios.total = parseFloat(total);

        const formasPago = ["efectivo", "transferencia", "tarjeta", "débito"];
        formasPago.forEach((f, i) => {
          console.log(`${i + 1}) ${f}`);
        });
        console.log("Nueva forma de pago, elija un numero (ENTER = no cambiar): ");
        const opPago = await rl.question("");
        if (opPago && formasPago[parseInt(opPago, 10) - 1]) cambios.forma_de_pago = formasPago[parseInt(opPago, 10) - 1];

        console.log("Nueva factura (ENTER = no cambiar): ");
        const factura = await rl.question("");
        if (factura) cambios.factura = factura;

        const estados = ["recibido", "en trabajo", "terminado", "entregado"];
        estados.forEach((e, i) => {
          console.log(`${i + 1}) ${e}`);
        });
        console.log("Nuevo estado, elija un numero (ENTER = no cambiar): ");
        const opEstado = await rl.question("");
        if (opEstado && estados[parseInt(opEstado, 10) - 1]) cambios.estado = estados[parseInt(opEstado, 10) - 1];

        await col.updateOne(
          { _id: new ObjectId(id), disponible: true },
          { $set: cambios }
        );
      }

    } else if (opcionMenu === "3") {
      // Baja logoica
      const trabajos = await col.find({ disponible: true }).toArray();
      trabajos.forEach((t, i) => {
        console.log(`${i + 1}) ID ${t._id} PROBLEMA ${t.problema} ESTADO ${t.estado}`);
      });

      console.log("Elija un numero: ");
      const opcion = parseInt(await rl.question(""), 10);

      const elegido = trabajos[opcion - 1];

      if (!elegido) {
        console.log("Opción inválida.");
      } else {
        const id = elegido._id.toString();

        await col.updateOne(
          { _id: new ObjectId(id) },
          { $set: { disponible: false } }
        );
      }

    } else if (opcionMenu === "4") {
      // Mostrar
      await verTrabajos(col);
    }
  } while (opcionMenu !== "0");
}

// ===================== MENU PRINCIPAL =====================
async function main() {
  await cliente.connect();

  let opcionPrincipal;
  do {
    console.log("\n======= TALLER MECANICO =======");
    console.log("1 Usuarios");
    console.log("2 Clientes");
    console.log("3 Trabajos");
    console.log("0 Salir");
    opcionPrincipal = await rl.question("");

    if (opcionPrincipal === "1") {
      await menuUsuarios();
    } else if (opcionPrincipal === "2") {
      await menuClientes();
    } else if (opcionPrincipal === "3") {
      await menuTrabajos();
    }
  } while (opcionPrincipal !== "0");

  rl.close();
  await cliente.close();
}


//#################### FUNCIONES GENERALES ####################

//Muestra datos de usuarios y clientes, parametro col como db.usuarios("nombreColeccion")
async function verUsuarios(col) {
  const usuarios = await col.find({ disponible: true }).toArray();
  for (const u of usuarios) {
    console.log(`ID ${u._id} NOMBRE ${u.nombre} EMAIL ${u.email} ROL ${u.rol}`);
  }
}



//#################### FUNCIONES MENU CLIENTES ####################

async function verClientes(col) {
  const clientes = await col.find({ disponible: true }).toArray();
  for (const c of clientes) {
    console.log(`ID ${c._id} \nNOMBRE ${c.nombre} ${c.apellido} DNI ${c.DNI} \DOMICILIO ${c.domicilio} TEL ${c.telefono} EMAIL ${c.email}`);
  }
}

async function verVehiculos(cliente) {
  console.log(`VEHICULOS`)
  for (const v of cliente.vehiculos) {
    console.log(`ID ${v._id} \nMARCA ${v.marca} MODELO ${v.modelo} PATENTE ${v.patente} KM ${v.kilometraje}`);
  }
}

async function verClientesYVehiculos(col) {
  const clientes = await col.find({ disponible: true }).toArray();
  for (const c of clientes) {
    console.log(`\nID ${c._id} \nNOMBRE ${c.nombre} ${c.apellido} DNI ${c.DNI} \nDOMICILIO ${c.domicilio} TEL ${c.telefono} EMAIL ${c.email}`);
    await verVehiculos(c);
  }
}

//#################### FUNCIONES MENU TRABAJOS ####################

async function verTrabajos(col) {
  const trabajos = await col.find({ disponible: true }).toArray();
  for (const t of trabajos) {
    const cli = await db.collection("clientes").findOne({ _id: t.id_cliente });
    const usu = await db.collection("usuarios").findOne({ _id: t.id_usuario });
    const nombreCli = cli ? `${cli.nombre} ${cli.apellido}` : "-";
    const nombreUsu = usu ? `${usu.nombre} ${usu.apellido}` : "-";
    console.log(`\nID ${t._id} \nCLIENTE ${nombreCli} \nMECANICO ${nombreUsu}`);
    const ingreso = t.fecha_ingreso ? t.fecha_ingreso.toLocaleDateString("es-AR") : "-";
    const entrega = t.fecha_entrega ? t.fecha_entrega.toLocaleDateString("es-AR") : "-";
    console.log(`   INGRESO ${ingreso} ENTREGA ${entrega}`);
    console.log(`   PROBLEMA ${t.problema} DIAGNOSTICO ${t.diagnostico}`);
    console.log(`   TOTAL ${t.total} PAGO ${t.forma_de_pago} FACTURA ${t.factura} ESTADO ${t.estado}`);
    console.log(`   REPUESTOS`);
    for (const r of t.repuestos) {
      console.log(`   ID ${r._id} \n   NOMBRE ${r.nombre} DESC ${r.descripcion} \n   CANT ${r.cantidad} PRECIO ${r.precio_unitario}`);
    }
  }
}






main();