const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//To hash our password indatabase fro safety
const bcrypt = require('bcrypt');


const User = require('../models/user');

router.post('/signup',(req,res,next) => {
  //to check that a unique hash exists
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if(user.length >=1) {
      return res.status(409).json({ //conflict
        message: 'Mail exists'

      }) ;
    } else{
      //only if we are able to incript a password then will we create a user
      bcrypt.hash(req.body.password ,10, (err,hash) =>{ // 10 is the number of saulting(adding randome strings to make the password more secure) added to password
          if(err) {
            return res.status(500).json({
              error:err
            });
          } else {
            const user = new User({
              _id: mongoose.Schema.Types.ObjectId(),
              email: { type: String, required: true },
              password: { type: String, required: true }
            });
      user
      .save()
      .then(result => {
      console.log(result);
        res.status(201).json({
          message: 'User created'
        });
      })
      .catch( err =>{
        console.log(err);
        res.status(500).json({
          error: err
        });

      })
          }
        })
      })


      });


    }
  })



module.export= router
