const mongoose=require('mongoose');
const user_collection1=require('./userdata');
mongoose.connect('mongodb://localhost:27017/Registrations')
.then(()=>{
    console.log('connection successfull')
})
.catch((err)=>{
    console.log(err);
})