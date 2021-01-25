const User=require('../app/models/User');

const auth= async(req,res,next)=>{
    const token = req.get('Authorization');
    if (!token) {
      return req.status(401).send({error: 'Token not provided!'});
    }
    const user = await User.findOne({token});
    if (!user) {
        return res.status(401).send({error:'No such user'});
    } 

    req.body.user = user;

    next();
  
};

module.exports=auth;