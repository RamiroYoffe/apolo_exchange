const Order = require("../models/order");
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

exports.order_crear = (req, res, next) => {
  Order.find()
    .exec()
    .then((docs) => {
      const cant = docs.length; //nro de orden respeta la cantidad de ordenes
      return cant;
    });

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
        //     "numeroOrden": "3",
        //     "cantidadEnvio": "1000",
        //     "cantidadRecibo": "500000",
        //     "monedaEnvio": "Bitcoin",
        //     "monedaRecibo": "Thether"
        //   }

        const token = req.headers.authorization;
        console.log(token);
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
            nombre_cuenta: usr.nombre_cuenta,
            nombre_usuario: usr.nombre_usuario,
            mail: usr.mail,
            numeroOrden: req.body.numeroOrden,
            cantidadEnvio: req.body.cantidadEnvio,
            cantidadRecibo: req.body.cantidadRecibo,
            monedaEnvio: req.body.monedaEnvio,
            monedaRecibo: req.body.monedaRecibo,
          });
          orden.save().then((result) => {
            res.status(201).json({
              message: "Moneda agregada exitosamente",
              nombre: result.nombre,
              valor: result.valor,
              visible: result.visible,
            });
          });
        } else {
          return res.status(500).json({
            message: "Inicie sesion para continuar",
          });
        }
      } else {
        Order.find()
          .exec()
          .then((docs) => {
            const cant = docs.length; //nro de orden respeta la cantidad de ordenes
          });
        //Que pasa si el usuario no existe?
        //Si el usuario no existe los datos hay que completarlos a mano
        //La orden se agrega a la lista de ordenes

        //ejemplo
        // {
        //   "cbu": "3453453643",
        //   "cuil": "878347585",
        //   "nombre_cuenta":"Luciano Neimark",
        //   "nombre_usuario":"Luciano Neimark",
        //   "mail": "lucianoneimark@gmail.com",
        //   "cantidadEnvio":"20",
        //   "cantidadRecibo": "30",
        //   "monedaEnvio": "Bitcoin",
        //   "monedaRecibo": "Peso Argentino",
        //   "numeroOrden": "2"
        // }

        const orden = new Order({
          _id: new mongoose.Types.ObjectId(),
          cbu: req.body.cbu,
          cuil: req.body.cuil,
          nombre_cuenta: req.body.nombre_cuenta,
          nombre_usuario: req.body.nombre_usuario,
          mail: req.body.mail,
          numeroOrden: req.body.numeroOrden,
          cantidadEnvio: req.body.cantidadEnvio,
          cantidadRecibo: req.body.cantidadRecibo,
          monedaEnvio: req.body.monedaEnvio,
          monedaRecibo: req.body.monedaRecibo,
        });
        orden.save().then((result) => {
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
