const mongoose=require('mongoose');


const connection=()=>{
    return mongoose.connect('mongodb://127.0.0.1:27017/Page')}

module.exports=connection;