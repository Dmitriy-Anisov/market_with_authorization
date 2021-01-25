const mongoose=require('mongoose');
const config=require('./app/config');
const {nanoid}=require('nanoid');
const User=require('./app/models/User');
const Category=require('./app/models/Category');
const Product =require('./app/models/Product');

mongoose.connect(config.db.url+'/'+config.db.name);

const db=mongoose.connection;

db.once('open',async()=>{
    try{
        await db.dropCollection('users');
        await db.dropCollection('categories');
        await db.dropCollection('products');
    }
    catch(e){
        console.log('Collection not found. Drop collections skiped');
    }

    const [admin,user]= await User.create({
        username:"admin",
        password:"123456",
        token:nanoid(),
        name:"Jhon",
        phone:"+7(701)011-1020"
    },{
        username:"user",
        password:"123456",
        token:nanoid(),
        name:"Patrick",
        phone:"+7(701)011-2020"
    });

    const [computerCategory,carCategory,animalCategory]=await Category.create({
        name:"Computers"
    },{
        name:"Cars"
    },{
        name:"Animals"
    });

    await Product.create({
        title:"New CPU",
        user:admin._id,
        description:"Intel Core i7",
        image:"cpu.jpg",
        category:computerCategory._id,
        price:300
    },{
        title:"HDD",
        user:user._id,
        description:"Seagate BarraCuda 1TB",
        image:"hdd.jpg",
        category:computerCategory._id,
        price:150
    },{
        title:"BMW",
        user:user._id,
        description:"New BMW x7",
        image:"bmw.jpg",
        category:carCategory._id,
        price:100000
    },{
        title:"VOLGA",
        user:admin._id,
        description:"Rare Volga",
        image:"volga.jpg",
        category:carCategory._id,
        price:10000
    },{
        title:"Cat",
        user:user._id,
        description:"Litle kitten",
        image:"cat.jpg",
        category:animalCategory._id,
        price:100
    },{
        title:"Dog",
        user:admin._id,
        description:"Litle dog",
        image:"dog.jpg",
        category:animalCategory._id,
        price:200
    });

    

    await db.close();
});