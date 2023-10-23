require("dotenv").config();

const express = require("express");

const app = express();

app.get("/getRestaurant", (req, res) => {
  res.json({
    status: "success",
    restaurant: "macdonalds",
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is up at ${port}`);
});
