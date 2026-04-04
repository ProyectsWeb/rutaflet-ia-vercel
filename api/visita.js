import { db } from "../src/config/db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    let { contratos } = req.body;

    if (typeof contratos === "string") {
      contratos = contratos.split(",").map(c => c.trim());
    }

    const placeholders = contratos.map(() => '?').join(',');

    const [result] = await db.execute(
      `UPDATE ubicaciones 
       SET visitado = 1, fecha_visita = NOW() 
       WHERE CONTRATO IN (${placeholders})`,
      contratos
    );

    return res.json({ ok: true, affected: result.affectedRows });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al actualizar" });
  }
}