const express = require("express");

const Currency = require("../models/currency");
const mongoose = require("mongoose");

exports.currency_get_all = (req, res, next) => {
  Currency.find()
    .exec()
    .then((docs) => {
      const response = {
        currencies: docs.map((doc) => {
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
exports.currency_get_one = (req, res, next) => {
  Currency.find({ name: req.params.name })
    .exec()
    .then((docs) => {
      const response = {
        currencies: docs.map((doc) => {
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

exports.currency_get_system = (req, res, next) => {
  Currency.find({ system: req.params.system })
    .exec()
    .then((docs) => {
      const response = {
        currencies: docs.map((doc) => {
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

exports.currency_create = (req, res, next) => {
  Currency.find({ name: req.body.name })
    .exec()
    .then((currencyExistente) => {
      if (currencyExistente.length > 0) {
        //si la currency existe:
        return res.status(409).json({
          message: "This currency already exists",
        });
      } else {
        //crear la currency nueva
        const currency = new Currency({
          _id: new mongoose.Types.ObjectId(),
          code: req.body.code,
          name: req.body.name,
          value: req.body.value,
          system: req.body.system,
          visible: true,
        });
        currency
          .save()
          .then((result) => {
            res.status(201).json({
              message: "Currency succesfully added",
              name: result.name,
              code: result.code,
              value: result.value,
              system: result.system,
              visible: result.visible,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.currency_delete_name = (req, res, next) => {
  Currency.find({ name: req.params.name })
    .exec()
    .then((currencyEncontrada) => {
      if (currencyEncontrada.length > 0) {
        Currency.remove({ name: req.params.name })
          .exec()
          .then((currencyExistente) => {
            res.status(200).json({
              message: "currency succesfully eliminated",
              result: currencyExistente,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      } else {
        return res.status(409).json({
          message: "Currency not found",
        });
      }
    });
};

exports.currency_modify_value = (req, res, next) => {
  const name = req.params.name;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Currency.find({ name: req.params.name });
  Currency.update({ name: name }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Currency Updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.currency_modify_value = (req, res, next) => {
  const name = req.params.name;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Currency.find({ name: req.params.name });
  Currency.update({ name: name }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Currency Updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.currency_get_code = (req, res, next) => {
  Currency.find({ code: req.params.code })
    .exec()
    .then((docs) => {
      const response = {
        currencies: docs.map((doc) => {
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

exports.currency_get_id = (req, res, next) => {
  Currency.find({ _id: req.params.id })
    .exec()
    .then((docs) => {
      const response = {
        currencies: docs.map((doc) => {
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
