const Order = require("../models/order");
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.order_get_all = (req, res, next) => {
  Order.find()
    .exec()
    .then((docs) => {
      const response = {
        Orders: docs.map((doc) => {
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

exports.order_get_orderNumber = (req, res, next) => {
  Order.find({ orderNumber: req.params.orderNumber })
    .exec()
    .then((docs) => {
      const response = {
        Orders: docs.map((doc) => {
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

exports.order_get_mail = (req, res, next) => {
  Order.find({ mail: req.params.mail })
    .exec()
    .then((docs) => {
      const response = {
        Orders: docs.map((doc) => {
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

exports.order_delete_orderNumber = (req, res, next) => {
  Order.find({ orderNumber: req.params.orderNumber })
    .exec()
    .then((orderFound) => {
      if (orderFound.length > 0) {
        Order.remove({ orderNumber: req.params.orderNumber })
          .exec()
          .then((order) => {
            res.status(200).json({
              message: "Orden eliminada correctamente",
              result: order,
            });
          });
      } else {
        return res.status(409).json({
          message: "No existe la Orden",
        });
      }
    });
};

exports.order_create = (req, res, next) => {
  Order.find()
    .exec()
    .then((docs) => {
      const cant = docs.length; //nro de orden respeta la cantidad de ordenes

      User.findOne({ mail: req.body.mail })
        .exec()
        .then((usr) => {
          if (usr) {
            //Que pasa si el usuario existe?
            //Se autocompletan todos los datos con la info del usuario
            //Se modifica el usuario en el campo de orden y se agrega la orden en cuestion
            //La orden se agrega a la lista de ordenes
            //si existe el usuario, primero hay que revisar que sea el

            //ejemplo
            //   {
            //     "mail": "lucianoneimark@gmail.com",
            //     "orderNumber": "3",
            //     "cantidadEnvio": "1000",
            //     "cantidadRecibo": "500000",
            //     "monedaEnvio": "Bitcoin",
            //     "monedaRecibo": "Thether"
            //   }

            const token = req.headers.authorization;

            if (token === undefined) {
              return res.status(500).json({
                error: "Auth Failed",
              });
            }
            const decoded = jwt.verify(token, process.env.JWT_KEY);

            if (decoded.mail === req.body.mail) {
              //si el mail coincide con el del token:
              const orden = new Order({
                _id: new mongoose.Types.ObjectId(),
                cbu: usr.cbu,
                cuil: usr.cuil,
                account_name: usr.account_name,
                user_name: usr.user_name,
                mail: usr.mail,
                orderNumber: (cant + 1).toLocaleString("en-US", {
                  minimumIntegerDigits: 7,
                  useGrouping: false,
                }),
                amountSent: req.body.amountSent,
                amountRecieved: req.body.amountRecieved,
                currencySent: req.body.currencySent,
                currencyRecieved: req.body.currencyRecieved,
                system: req.body.system,
              });
              orden
                .save()
                .then((result) => {
                  res.status(201).json({
                    message: "Orden agregada exitosamente",
                    result,
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    error: err,
                    message: "Error - Invalid Order",
                  });
                });
              usr.orders.push(orden.orderNumber);
              usr.save();
            } else {
              return res.status(500).json({
                message: "Inicie sesion para continuar",
              });
            }
          } else {
            //ejemplo
            // {
            //   "cbu": "3453453643",
            //   "cuil": "878347585",
            //   "nombre_cuenta":"Martin Neimark",
            //   "nombre_usuario":"Martin Neimark",
            //   "mail": "Martinneimark@gmail.com",
            //   "cantidadEnvio":"20",
            //   "cantidadRecibo": "30",
            //   "monedaEnvio": "Bitcoin",
            //   "monedaRecibo": "Peso Argentino",
            //   "orderNumber": "2"
            // }

            const orden = new Order({
              _id: new mongoose.Types.ObjectId(),
              cbu: req.body.cbu,
              cuil: req.body.cuil,
              account_name: req.body.account_name,
              user_name: req.body.user_name,
              mail: req.body.mail,
              orderNumber: (cant + 1).toLocaleString("en-US", {
                minimumIntegerDigits: 7,
                useGrouping: false,
              }),
              amountSent: req.body.amountSent,
              amountRecieved: req.body.amountRecieved,
              currencySent: req.body.currencySent,
              currencyRecieved: req.body.currencyRecieved,
              system: req.body.system,
            });
            orden
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "Order created succesfully",
                  result,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                  message: "Error - Invalid Order",
                });
              });
          }
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
            message: "Auth Failed. Session expired",
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        message: "Error",
      });
    });
};
