const express = require("express");
const router = express.Router();
const moneda = require("../models/moneda");
const Moneda = require("../models/moneda");
const mongoose = require("mongoose");

//Ver las monedas con un get all done
//Patch de monedas particulares para cambiar su valor siendo admin
//Pedir moneda particular con un get one done
//Crear monedas con un post done
//Eliminar monedas

exports.moneda_get_all = (req, res, next) => {
  Moneda.find()
    .exec()
    .then((docs) => {
      const response = {
        monedas: docs.map((doc) => {
          return {
            doc,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
exports.moneda_get_one = (req, res, next) => {
  Moneda.find({ nombre: req.params.nombre })
    .exec()
    .then((docs) => {
      const response = {
        monedas: docs.map((doc) => {
          return {
            doc,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.moneda_crear = (req, res, next) => {
  Moneda.find({ nombre: req.body.nombre })
    .exec()
    .then((monedaExistente) => {
      if (monedaExistente.length > 0) {
        //si la moneda existe:
        return res.status(409).json({
          message: "Esta moneda ya existe en la tabla",
        });
      } else {
        //crear la moneda nueva
        const moneda = new Moneda({
          _id: new mongoose.Types.ObjectId(),
          nombre: req.body.nombre,
          valor: req.body.valor,
          visible: true,
        });
        moneda.save().then((result) => {
          res.status(201).json({
            message: "Moneda agregada exitosamente",
            nombre: result.nombre,
            valor: result.valor,
            visible: result.visible,
          });
        });
      }
    });
};

exports.moneda_delete_nombre = (req, res, next) => {
  Moneda.find({ nombre: req.params.nombre })
    .exec()
    .then((monedaEncontrada) => {
      if (monedaEncontrada.length > 0) {
        Moneda.remove({ nombre: req.params.nombre })
          .exec()
          .then((monedaExistente) => {
            res.status(200).json({
              message: "Moneda eliminada correctamente",
              result: monedaExistente,
            });
          });
      } else {
        return res.status(409).json({
          message: "No existe la moneda",
        });
      }
    });
};
