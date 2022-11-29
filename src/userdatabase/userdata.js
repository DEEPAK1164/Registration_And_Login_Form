const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const users_schema1=new mongoose.Schema({
fullname:{
type:String,
required:true,
lowercase:true
},
email:{
    type:String,
    required:true,
    unique:true
},
phone:{
    type:Number,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
confirm_password:{
    type:String,
    requird:true

}
})
users_schema1.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,8)
    this.confirm_password=await bcrypt.hash(this.confirm_password,8)
})

const user_collection1=new mongoose.model('users_collections1',users_schema1);
module.exports=user_collection1;