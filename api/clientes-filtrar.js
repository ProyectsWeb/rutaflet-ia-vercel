import { db } from "../src/config/db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { contratos } = req.body;

    if (!contratos || contratos.length === 0) {
      return res.json([]);
    }

    const placeholders = contratos.map(() => '?').join(',');

    await db.execute(
      `UPDATE ubicaciones SET visitado = 0 WHERE CONTRATO IN (${placeholders})`,
      contratos
    );

    const [rows] = await db.execute(
      `SELECT NO, CONTRATO, NOMBRE, DIRECCION, COLONIA, COORDENADAS, visitado 
       FROM ubicaciones WHERE CONTRATO IN (${placeholders})`,
      contratos
    );

    return res.status(200).json(rows);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error en clientes-filtrar" });
  }
}