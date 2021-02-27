const express = require("express");

const Transaction = require("../models/transaction");
const mongoose = require("mongoose");

exports.transaction_get_all = (req, res, next) => {
  Transaction.find()
    .exec()
    .then((docs) => {
      const response = {
        Transactions: docs.map((doc) => {
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

exports.transaction_get_one = (req, res, next) => {
  Transaction.find({ name: req.params.name })
    .exec()
    .then((docs) => {
      const response = {
        Transaction: docs.map((doc) => {
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

exports.transaction_create = (req, res, next) => {
  Transaction.find({ name: req.body.name })
    .exec()
    .then((transactionExistente) => {
      if (transactionExistente.length > 0) {
        //si el transaction existe:
        return res.status(409).json({
          message: "This transaction already exists",
        });
      } else {
        //crear el system nueva
        const transaction = new Transaction({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          system1: req.body.system1,
          system2: req.body.system2,
          value: req.body.value,
        });
        transaction
          .save()
          .then((result) => {
            res.status(201).json({
              message: "Transaction succesfully added",
              name: result.name,
              system1: result.system1,
              system2: result.system2,
              value: result.value,
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

exports.transaction_delete_name = (req, res, next) => {
  Transaction.find({ name: req.params.name })
    .exec()
    .then((transactionEncontrada) => {
      if (transactionEncontrada.length > 0) {
        Transaction.remove({ name: req.params.name })
          .exec()
          .then((transactionExistente) => {
            res.status(200).json({
              message: "Transaction succesfully eliminated",
              result: transactionExistente,
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
          message: "Transaction not found",
        });
      }
    });
};

exports.transaction_modify_value = (req, res, next) => {
  const name = req.params.name;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Transaction.find({ name: req.params.name });
  Transaction.update({ name: name }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Transaction Updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.transaction_get_id = (req, res, next) => {
  Transaction.find({ _id: req.params.id })
    .exec()
    .then((docs) => {
      const response = {
        Transactions: docs.map((doc) => {
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
