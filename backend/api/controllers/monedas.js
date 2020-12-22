const express = require("express");
const router = express.Router();
const Moneda = require("../models/moneds.js");
const mongoose = require("mongoose");

//Ver las monedas con un get all
//Patch de monedas particulares para cambiar su valor siendo admin
//Pedir moneda particular con un get one
//Crear monedas con un post
//Eliminar monedas

exports.moneda_crear = (req, res, next) => {
  Moneda.find({ nombre: req.body.nombre })
    .exec()
    .then((moneda) => {
      if (moneda.length > 0) {
        return res.status(409).json({
          message: "Esta moneda ya existe en la tabla",
        });
      } else {
        //crear la moneda nueva
      }
    });
};
