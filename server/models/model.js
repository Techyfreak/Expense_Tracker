const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//categories=>[type,color]
const categories_model = new Schema({
    type:{type:String, deault:"Investment"},
    color:{type:String, default:'#FCBE44'}
})

//transactions => [name,type,amount,date]
const transactions_module = new Schema({
    username:{type:String,required:true},
    name:{type:String,default:"Anonymous"},
    type:{type:String, default:"Investment"},
    amount:{type:Number},
    color:{type:String,default:"#FCBE44"},
    date:{type:Date,default:Date.now},
})

//userdetails => [name,email,password]
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max:20,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        max:50,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min:8,
    },
})

const Users = mongoose.model('users',userSchema)
const Categories = mongoose.model('categories',categories_model)
const Transactions = mongoose.model('transactions',transactions_module)

exports.default = Transactions;
module.exports={
    Categories,
    Transactions,
    Users
} 