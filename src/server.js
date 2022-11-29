const express=require("express");
const bodyparser=require('body-parser');
const path=require('path');
const port=8000
const user_collection1=require('./userdatabase/userdata');
require("./userdatabase/mongoose_connection");
const app=express();
const bcrypt=require('bcryptjs')
app.use(bodyparser.urlencoded({
extended:true
})
)
app.use(express.json());

const mainfolder=path.join(__dirname,"../");

// const hashedpassword=async(password)=>{
//     const hashkey=await bcrypt.hash(password,8);
//     return hashkey;
// }

app.get('/',(req,res)=>{

})
app.get('/register',(req,res)=>{
    res.sendFile(mainfolder+"/register.html");
    
})
app.get('/login',(req,res)=>{
    res.sendFile(mainfolder+"/login.html");
    
})

app.post("/register",(req,res)=>{
   // console.log(req.body.fullname);
   let req_userdata=new user_collection1(req.body);
   if(req_userdata.password==req_userdata.confirm_password){
    req_userdata.save();
    res.send('registered Successfully!');
   }
   else{
    res.send("Password do not match")
   }
  
})

app.post("/login",async(req,res)=>{
    const usermail=req.body.email;
    let userpassword=req.body.password;


    // const mykey_password=await hashedpassword(userpassword);
    // console.log(mykey_password);
    let req_userdata=await user_collection1.findOne({email:usermail});
    if(req_userdata!=null)
    {
        const bcrypt_password=await bcrypt.compare(userpassword,req_userdata.password)
        if(bcrypt_password==true)
        {
            res.send("Successfully Logged in")
        }
        else{
            res.send("Incorrect Password")
        }
    }
    else{
        res.send("Email does not exists");
    }
    // console.log(usermail);
    // console.log(userpassword);
  
})

app.listen(port,()=>{
    console.log(`listening on port no ${port}`)
})

