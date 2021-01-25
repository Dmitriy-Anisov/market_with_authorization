const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
   title: {
       type: String,
       required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    price:{
        type:Number,
        required:true
    }
}, {
    versionKey: false
});


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;