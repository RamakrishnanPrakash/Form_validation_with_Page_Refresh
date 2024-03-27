const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const usersSchema=new Schema({

    name:{type:String,unique:true},
    email:{type:String,unique:true},
    password:{type:String}
})

const User=mongoose.model('User',usersSchema);
module.exports=User