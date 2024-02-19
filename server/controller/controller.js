const  model = require("../models/model");

//POST : http://localhost:8080/api/category
async function create_Categories(req,res){
    const Create = new model.Categories({
        type: "Savings",
        color:"#1F3B5C",
    })

    await Create.save(function(err){
        if(!err) return res.json(Create)
        return res.status(400).json({message:`Error while creating categories ${err}`})
;    })
}


//GET:http://localhost:8080/api/category
async function get_Categories(req,res){
    let data = await model.Categories.find({})
    let filter = await data.map(v=>Object.assign({},{type:v.type,color: v.color}))
    return res.json(filter);
    
}


//POST : http://localhost:8080/api/transaction
async function create_Trasactions(req,res){
    if(!req.body) return res.status(400).json("Post HTTP Data not Provided");
    let {username,name,type,amount,color} = req.body;
    const Create = new model.Transactions({
        username,
        name,
        type,
        amount,
        color,
        date : new Date()
    })

    await Create.save(function(err){
        if(!err) return res.json(Create)
        return res.status(400).json({message:`Error while creating transcations ${err}`})
    })
}


//GET : http://localhost:8080/api/transaction
async function get_Transactions(req,res){
    let data = await model.Transactions.find({})
    //let filter = await data.map(v=>Object.assign({},{type:v.type,color: v.color}))
    return res.json(data);
}


//DELETE : http://localhost:8080/api/transaction
async function delete_Transaction(req,res){
    if(!req.body) return res.status(400).json({message:"Request body not found"});
    await model.Transactions.deleteOne(req.body,function(err){
        if(!err) return res.json("Record Deleted..!");
    }).clone().catch(function(err){res.json("Error while deleting the Transaction")})
}


//GET : http://localhost:8080/api/labels
async function get_labels(req,res){
    model.Transactions.aggregate([
        {
            $lookup:{
                from: "users",
                localField:"username",
                foreignField:"username",
                as:"user_info"
            }
        },
        {
            $unwind:"$user_info"
        }
    ]).then(result=>{
        let data = result.map(v=>Object.assign({},{_id:v._id,name:v.name,username:v.username,type:v.type,color:v.color,amount:v.amount}))
        res.json(data);
        
    }).catch(error=>{
        res.status(400).json("Lookup Collection Error")
    })
}


//POST : http://localhost:8080/api/users
async function create_user(req,res){
    if(!req.body) return res.status(400).json("Post HTTP Data not Provided");
    let {username,email,password} = req.body;
    const Create = new model.Users({
        username,
        email,
        password
    })

    await Create.save(function(err){
        if(!err) return res.json(Create)
        return res.status(400).json({message:`Error while creating transcations ${err}`})
    })
}


//GET : http://localhost:8080/api/users
async function get_user(req,res,next){
    try{
        const {username,password} = req.body;
        const user = await model.Users.findOne({username});
        if(!user)
            return res.json({msg:"Incorrect username or password",status:false});
        if(password!=user.password)
            return res.json({msg:"Incorrect password or username",status:false});
        return res.json({status:true,user});
    }catch(ex){
        next(ex);
    }
    //let data = await model.Users.find({})
    //let filter = await data.map(v=>Object.assign({},{type:v.type,color: v.color}))
    
}


module.exports = {
    create_Categories,
    get_Categories,
    create_Trasactions,
    get_Transactions,
    delete_Transaction,
    get_labels,
    create_user,
    get_user
}