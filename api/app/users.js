const express=require('express');
const router=express.Router();
const User=require('./models/User');
const bcrypt=require('bcrypt');
const {nanoid}=require('nanoid');
const auth=require('../middleware/auth');

const createRouter=()=>{
    router.post('/',async (req,res)=>{
        try{
            const user=new User(req.body);
            user.token=nanoid();
            await user.save();
            res.send(user);
        }
        catch(e){
            res.status(400).send(e);
        }
    });

    router.post('/sessions', async (req,res)=>{
        const user= await User.findOne({username:req.body.username});
        if(!user){
            return res.status(400).send({error:'Username not found'});
        }
        const isMatch=await bcrypt.compare(req.body.password, user.password);

        if(!isMatch){
            return res.status(400).send({error:'Wrong password'});
        }
        user.generateToken();
        await user.save({validateBeforeSave: false});
        res.send(user);
    });

    router.delete('/sessions',auth, async (req,res)=>{
        const user=req.body.user;
        const message={message:'Success'};
        user.token='';
        await user.save({validateBeforeSave: false});
        res.send(message);
    });


    return router;
};

module.exports=createRouter;
