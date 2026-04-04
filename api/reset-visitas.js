import { db } from "../src/config/db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    await db.execute(`UPDATE ubicaciones SET visitado = 1`);
    return res.json({ ok: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al resetear" });
  }
}