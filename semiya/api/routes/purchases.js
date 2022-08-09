const express= require('express')
const nodemailer = require("nodemailer");
const {Purchases, Users}=require('../models');

const purchasesRouter=express.Router();


purchasesRouter.post("/:id", (req, res, next) => {
const id =req.params.id
// let testAccount;
// let transporter;
Users.findByPk(id)
.then((user)=> 
    Purchases.create(req.body)
      .then((purchase) => purchase.setAuthor(user))
      .then(()=>{ transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'magdalena.wisoky@ethereal.email',//fake email
          pass: 'SgSzqGsAqhwD2Sf3PW', // generated ethereal password
        },
      });})
      .then(()=>transporter.sendMail({
        from: 'magdalena.wisoky@ethereal.email', // sender address
        to: 'tomaspintokramer@hotmail.com', // list of receivers
        subject: `Tu orden de SemiYA está en camino.`, // Subject line
        text: `Hola ${req.body.name}, tu pedido llegara a ${req.body.shippingAdress} en tan solo tres dias. Esperamos que disfrutes de tu compra!`, // plain text body
     
      },(error, info)=>{
        if(error){
          res.status(500).send(error.message);
        }else{
          console.log('Email enviado')
          res.status(200).jsonp(req.body);
        }
      }))
      .then((purchase) => res.send(purchase))
      .catch(next))
    .catch(next)
  });
  
  purchasesRouter.get('/:id', (req,res, next)=>{
    const id =req.params.id
    Purchases.findAll({where:{authorId: id}}) 
    .then((purchases) => res.send(purchases))
    .catch(next)
  })

  module.exports=purchasesRouter;