const express  = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRoutes = require('./api/routes/products');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
mongoose.connect('mongodb://zastrine:pranav@123@ds159025.mlab.com:59025/zastrine',
  {
    useMongoClient: true
  }
);
// the below code is used to avoid corss error (basiclly when one file runing on 3000 asks something from a file runing on 400 or so on)
app.use((req,res,next) =>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', '*') //* -> put post get patch delete etc this tells what what request the browser is allowed to accept
return res.status(200).json({});
  }
} );
app.use(morgan('dev'))
app.use('/products',productRoutes);
// if you are reaching the next line that means you a=were not able to go through the above request
app.use((req,res,next) =>{
  const error = new Error('Not Found');
  error.status(404);
  next(error); //reqest
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
res.json({
  error: {
    message: error.message
  }
})
});
module.exports = app;
