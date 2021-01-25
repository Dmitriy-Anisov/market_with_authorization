const express=require('express');
const router=express.Router();
const Category=require('./models/Category');

const createRouter=()=>{
    router.get('/',async (req,res)=>{
        try {
            const categories = await Category.find();
            res.send(categories);
        } catch (e) {
            res.sendStatus(500);
        }
    });
    router.get('/:id',async (req,res)=>{
        try {
            const category = await Category.findById(req.params.id);
            res.send(category);
        } catch (e) {
            res.sendStatus(500);
        }
    });


    return router;
};

module.exports=createRouter;
