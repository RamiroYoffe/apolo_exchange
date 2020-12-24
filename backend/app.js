const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const monedaRoutes = require("./api/routes/monedas.js");
const userRoutes = require("./api/routes/users");

app.use(morgan("dev"));

//app.use("/users", usersRoutes); => Para agregar rutas

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/", router);
app.use("/moneda", monedaRoutes);
app.use("/user", userRoutes);

app.use("/", router);
app.use("/moneda", monedaRoutes);

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

mongoose.connect(
  "mongodb+srv://lneimark:Og18505bC292835c@apolodb.tiimz.mongodb.net/apoloDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
module.exports = app;
