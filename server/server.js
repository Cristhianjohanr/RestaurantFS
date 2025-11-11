/* import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json()); */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
console.log("🔐 Supabase URL:", process.env.SUPABASE_URL);
import { supabase } from "./db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

/*
// GET sirve para consulta de platos
app.get("/api/dishes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM dishes ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo platos" });
  }
});

// POST sirve para insertar platos
app.post("/api/dishes", async (req, res) => {
  const { name, price } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO dishes (name, price) VALUES ($1, $2) RETURNING *",
      [name, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando plato" });
  }
}); */

/* app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
}); */

// GET: obtener platos
/*app.get("/api/dishes", async (req, res) => {
  const { data, error } = await supabase.from("dishes").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});*/

app.get("/api/dishes", async (req, res) => {
  try {
    const { data, error } = await supabase.from("dishes").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("🔥 Error en GET /api/dishes:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST: crear plato
app.post("/api/dishes", async (req, res) => {
  const { name, price } = req.body;
  const { data, error } = await supabase
    .from("dishes")
    .insert([{ name, price }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Servidor en http://localhost:${PORT}`));