const express =  require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/',(req,res,next) => {
Product.find() //We can also use remove ,update,or other tags based on Mongoose library
.exec() //this can be limit or query also based on the what we want as per the Mongoose library
.then(docs => {
  const response = {
    count: docs.length,
    products:docs.map(doc => {
//to make a disciptive api
      return {
        name: doc.name,
        price: doc.price,
        _id: doc._id,
        request: {
          type: 'GET',
          url: 'http://localhost:300/products/'+ doc._id
        }
      }
    })
  }
})
.catch(err =>{
  console.log(err);
  res.status(500).json({
    error:err
  });
})
});

router.post('/',(req,res,next) =>{
/*  const product = {
    name: req.body.name, //this is possible only because of body-parsen
  }
  */ //this is the old product
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name:req.body.name,
    price:req.body.price
  });
  product.save().then(result=>{
    console.log(result);
  })
  .catch(err => console.log(err));
  res.status(200).json({
    message: 'Handling Post requests to /products'
  });
});

router.get('/:productId',(req,res,next)=>{
  /*
  const id= req.params.productId;
  if(id === 'special'){
    res.status(200).json({
      message: 'You discoveres the special ID'
    });
  } else{
    res.status(200).json({
      message: "you passed an ID"
    })
  }
  */
  const id = req.params.productId;
  Product.findById(id) //Mongoose library method
  .exec()
  .then(doc =>{
    console.log("from the Database",doc);
    if(doc) {
      res.status(200).json(doc);
    }
    else {
      res.status(404).json({message: 'No'})
    }
  })
  .catch(err => console.log(err));
  res.status(500).json({error: err});
});

module.exports = router;
