const Order = require("../models/order");
const mongoose = require("mongoose");

//Crear orden
//Eliminar orden
//Modificar datos de la orden solo accede guido si el comprador le manda un mensaje pidiendo modificar algun dato. [PRIVADO]
//Get orden particular (nro de orden) [PRIVADO]
//Get todas las ordenes [PRIVADO]

exports.order_get_all = (req, res, next) => {
  Order.find()
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
