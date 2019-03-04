const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
name:String,
  //price: Number this works fine for normal data but if we sont enter this field then also it works to review that
  price:{ type: Nmuber, required: true}
});
//First is the name of the model
module.exports = mongoose.model('Product',productSchema);
