const express = require("express");
const nodemailer = require("nodemailer");
const { Purchases, Users } = require("../models");
const transporter = require("../utils/nodemailerConfig.js");
const purchasesRouter = express.Router();

purchasesRouter.post("/:id", (req, res, next) => {
  const id = req.params.id;
  console.log(
    "🚀 ~ file: purchases.js ~ line 15 ~ purchasesRouter.post ~ req.body",
    req.body
  );
  Users.findByPk(id)
    .then((user) =>
      Purchases.create(req.body)
        .then((purchase) => purchase.setAuthor(user))
        .then(() => {
          transporter.sendMail(
            {
              from: "tomaspintokramer@gmail.com", // sender address
              to: req.body.email, // list of receivers
              subject: `Tu orden de SemiYA está en camino.`, // Subject line
              text: `Hola ${req.body.name},

       Gracias por elegirnos! 
      Tu pedido llegara a ${req.body.shippingAdress} en tan solo tres dias.

      Tu compra:

          ${req.body.cart.map(
            (item, i) => `${i + 1}- ${item.name} 
          
          `
          )}

      Esperamos que disfrutes de tu compra!
      SemiYita `, // plain text body
            },
            (error, info) => {
              if (error) {
                res.status(500).send(error.message);
              } else {
                console.log("Email enviado");
                res.status(200).jsonp(req.body);
              }
            }
          );
        })
        // )
        .then((purchase) => res.send(purchase))
        .catch(next)
    )
    .catch(next);
});

purchasesRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Purchases.findAll({ where: { authorId: id } })
    .then((purchases) => res.send(purchases))
    .catch(next);
});

module.exports = purchasesRouter;
