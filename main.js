const { MongoClient, ObjectId } = require("mongodb");
const { createInterface } = require("node:readline/promises");


//const client = new MongoClient("mongodb+srv://BD2TPI:admin1234@clusterm0.ggv0hxk.mongodb.net/");
const cliente= new MongoClient("mongodb+srv://BD2TPI:admin1234@clusterm0.ggv0hxk.mongodb.net/?appName=ClusterM0");
const rl = createInterface({ input: process.stdin, output: process.stdout });

async function main() {
  await cliente.connect();
  const col = cliente.db("taller").collection("usuarios");

  let opcionMenu;
  do {
    console.log("####### USUARIOS #######");
    console.log("\n1 Agregar");
    console.log("2 Editar");
    console.log("3 Borrar");
    console.log("4 Ver");
    console.log("0 Salir");
    opcionMenu = await rl.question("");

    if (opcionMenu === "1") {
      // CREATE
      console.log("Inserte el nombre: ");
      const nombre = await rl.question("");

      console.log("Inserte el apellido: ");
      const apellido = await rl.question("");

      console.log("Inserte el DNI: ");
      const DNI = parseInt(await rl.question(""), 10);

      console.log("Inserte el telefono ");
      const telefono = await rl.question("");

      console.log("Inserte el email: ");
      const email = await rl.question("");

      console.log("Inserte la contrasena: ");
      const contrasena = await rl.question("");

      console.log("Inserte el rol (admin / empleado): ");
      const rol = await rl.question("");

      await col.insertOne({
        nombre, apellido, DNI, telefono, email, contrasena, rol,
        disponible: true,
      });

    } else if (opcionMenu === "2") {
      // UPDATE
      const id = await rl.question("");
      const telefono = await rl.question("");
      await col.updateOne(
        { _id: new ObjectId(id), disponible: true },
        { $set: { telefono } }
      );

    } else if (opcionMenu === "3") {
      // DELETE (baja lógica)
      const id = await rl.question("");
      await col.updateOne(
        { _id: new ObjectId(id) },
        { $set: { disponible: false } }
      );

    } else if (opcionMenu === "4") {
      // READ (solo activos)
      console.log(await col.find({ disponible: true }).toArray());
    }
  } while (opcionMenu !== "0");

  rl.close();
  await cliente.close();
}

main();