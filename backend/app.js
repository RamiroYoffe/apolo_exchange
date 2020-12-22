const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();

//app.use("/users", usersRoutes); => Para agregar rutas

app.get("/", (req, res) => {
  res.end("Hello world");
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
