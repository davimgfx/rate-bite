require("dotenv").config();
const express = require("express");

const app = express();

const morgan = require("morgan");
const db = require("./db");

app.use(morgan("dev"));

// Get all restaurants
app.get("/api/v1/restaurantes", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM restaurantes_avaliacoes");
    res.status(200).json({
      status: "success",
      results: result.rows.length,
      data: {
        restaurantes: result,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Get 1 restaurant
app.get("/api/v1/restaurantes/:id", (req, res) => {
  console.log(req.params.id);
});

// Create a new restaurant
app.post("/api/v1/restaurantes/:id", (req, res) => {
  console.log(req);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is up at ${port}`);
});
