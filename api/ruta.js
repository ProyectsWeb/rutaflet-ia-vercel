import { db } from "../src/config/db.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const [rows] = await db.execute(
      `SELECT NO, CONTRATO, NOMBRE, DIRECCION, COLONIA, COORDENADAS 
       FROM ubicaciones WHERE visitado = 0`
    );

    return res.status(200).json(rows);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error en ruta" });
  }
}