require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require('morgan')

app.use(morgan("dev"))

// Get all restaurants
app.get("/api/v1/restaurantes", (req, res,) => {
  console.log("yes")
  res.status(200).json({
    status: "success",
    data: {
      restaurant: ["macdonalds", "açai do monstro"],
    },
  });
});

// Get 1 restaurant
app.get("/api/v1/restaurantes/:id", (req, res) => {
  console.log(req.params.id);
});

// Create a new restaurant
app.post("/api/v1/restaurantes/:id", (req, res) => {
  console.log(req)
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is up at ${port}`);
});
