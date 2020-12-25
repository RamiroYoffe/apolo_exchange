const Order = require("../models/order");
const mongoose = require("mongoose");
const User = require("../models/user");
//Crear orden
//Eliminar orden
//Modificar datos de la orden solo accede guido si el comprador le manda un mensaje pidiendo modificar algun dato. [PRIVADO]
//Get orden particular (nro de orden) [PRIVADO]
//Get todas las ordenes [PRIVADO]

function getNumber {
  
}

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

  Order
  .find()
  .exec

  User.findOne({ mail: req.body.mail })
    .exec()
    .then((usr) => {
      if (usr) {
        //Que pasa si el usuario existe?
        //Se autocompletan todos los datos con la info del usuario
        //Se modifica el usuario en el campo de orden y se agrega la orden en cuestion
        //La orden se agrega a la lista de ordenes

        const orden = new Orden({
          cbu: usr.cbu,
          cuil: usr.cuil,
          nombre_cuenta: usr.nombre_cuenta,
          nombre_usuario: usr.nombre_usuario,
          mail: usr.mail,
          numero_orden: user

        });
      } else {
        //Que pasa si el usuario no existe?
        //Si el usuario no existe los datos hay que completarlos a mano
        //La orden se agrega a la lista de ordenes
      }
    });

  // Order.find({ nombre: req.body.nombre })
  //   .exec()
  //   .then((OrderExistente) => {
  //     //crear la moneda nueva
  //     const order = new Order({
  //       _id: new mongoose.Types.ObjectId(),
  //       nombre: req.body.nombre,
  //       valor: req.body.valor,
  //       visible: true,
  //     });
  //     order.save().then((result) => {
  //       res.status(201).json({
  //         message: "Moneda agregada exitosamente",
  //         nombre: result.nombre,
  //         valor: result.valor,
  //         visible: result.visible,
  //       });
  //     });
  //   });
};
