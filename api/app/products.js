const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('./config'); 
const Product=require('./models/Product');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});
const upload = multer({storage});

const createRouter=()=>{
    router.get('/',async (req,res)=>{
        const object={};
        if(req.query.category){
            object.category=req.query.category;
        }
        try {
            const products = await Product.find(object);
            res.send(products);
        } catch (e) {
            res.sendStatus(500);
        }
    });
    router.get('/:id',async (req,res)=>{
        try {
            const product = await Product.findById(req.params.id).populate('user');
            res.send(product);
        } catch (e) {
            res.sendStatus(500);
        }
    });
    router.post('/', upload.single('image'),auth, async (req,res)=>{
        try{
            const product=new Product(req.body);
            if(req.file) {
                product.image = req.file.filename;
            }
            if(product.price<0){
                return res.status(400).send({error:'Price must be positive'});
            }
            await product.save();
            res.send(product);
        }
        catch(e){
            res.status(400).send(e);
        }
    });

    router.delete('/:id',auth,async (req,res)=>{
        try {
            const product=await Product.findById(req.params.id).populate('user');
            if(req.body.user.username!==product.user.username){
                return res.status(403).send({error:'Invalid user'});
            }
            await Product.deleteOne({_id:req.params.id});
            res.send({message:'success'});
        } catch (e) {
            res.sendStatus(500);
        }
    });

    return router;
};

module.exports=createRouter;
