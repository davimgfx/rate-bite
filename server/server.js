require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const morgan = require("morgan");
const db = require("./db");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Get all restaurants
app.get("/api/v1/restaurantes", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM restaurantes_avaliacoes");
    res.status(200).json({
      status: "success",
      results: result.rows.length,
      data: {
        restaurantes: result.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Get 1 restaurant
app.get("/api/v1/restaurantes/:id", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM restaurante WHERE id_restaurante = $1",
      [req.params.id]
    );
    const reviewFood = await db.query(
      "SELECT * FROM avaliacoes_pratos WHERE restaurante_id = $1",
      [req.params.id]
    );
    const reviewService = await db.query(
      "SELECT * FROM avaliacoes_atendimento WHERE restaurante_id = $1",
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurante: result.rows[0],
        reviewFood: reviewFood.rows,
        reviewService: reviewService.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Create a new restaurant
app.post("/api/v1/restaurantes", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurante (nome, localizacao, cidade, estado, logo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        req.body.nome,
        req.body.localizacao,
        req.body.cidade,
        req.body.estado,
        req.body.logo,
      ]
    );
    console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        restaurante: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Update a restaurant
app.put("/api/v1/restaurantes/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurante SET nome = $1, localizacao = $2, cidade = $3, estado= $4, logo = $5 WHERE id_restaurante = $6 RETURNING *",
      [
        req.body.nome,
        req.body.localizacao,
        req.body.cidade,
        req.body.estado,
        req.body.logo,
        req.params.id,
      ]
    );
    console.log(results);
    res.status(200).json({
      status: "success",
      data: {
        restaurante: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete a restaurant

app.delete("/api/v1/restaurantes/:id", async (req, res) => {
  try {
    const results = await db.query(
      "DELETE FROM restaurante WHERE id_restaurante = $1 RETURNING *",
      [req.params.id]
    );
    console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        restaurante: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is up at ${port}`);
});
