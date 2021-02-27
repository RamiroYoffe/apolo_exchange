const express = require("express");

const System = require("../models/system");
const mongoose = require("mongoose");

exports.system_get_all = (req, res, next) => {
  System.find()
    .exec()
    .then((docs) => {
      const response = {
        Systems: docs.map((doc) => {
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

exports.system_get_one = (req, res, next) => {
  System.find({ value: req.params.value })
    .exec()
    .then((docs) => {
      const response = {
        systems: docs.map((doc) => {
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

exports.system_get_currency = (req, res, next) => {
  System.find({ currency: req.params.currency })
    .exec()
    .then((docs) => {
      const response = {
        Currencies: docs.map((doc) => {
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

exports.system_create = (req, res, next) => {
  System.find({ value: req.body.value })
    .exec()
    .then((systemExistente) => {
      if (systemExistente.length > 0) {
        //si el system existe:
        return res.status(409).json({
          message: "This system already exists",
        });
      } else {
        //crear el system nueva
        const system = new System({
          _id: new mongoose.Types.ObjectId(),
          value: req.body.value,
          label: req.body.label,
          currency: req.body.currency,
          fields: req.body.fields,
          minimum: req.body.minimum,
          visible: true,
        });
        system
          .save()
          .then((result) => {
            res.status(201).json({
              message: "System succesfully added",
              value: result.value,
              label: result.label,
              currency: result.currency,
              fields: result.fields,
              minimum: req.body.minimum,
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

exports.system_delete_value = (req, res, next) => {
  System.find({ value: req.params.value })
    .exec()
    .then((systemEncontrada) => {
      if (systemEncontrada.length > 0) {
        System.remove({ value: req.params.value })
          .exec()
          .then((systemExistente) => {
            res.status(200).json({
              message: "System succesfully eliminated",
              result: systemExistente,
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
          message: "System not found",
        });
      }
    });
};

exports.system_modify_value = (req, res, next) => {
  const value = req.params.value;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  System.find({ value: req.params.value });
  System.update({ value: value }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "System Updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.system_get_id = (req, res, next) => {
  System.find({ _id: req.params.id })
    .exec()
    .then((docs) => {
      const response = {
        systems: docs.map((doc) => {
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
