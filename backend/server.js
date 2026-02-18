const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const cookie=require('cookie-parser');
const userroutes=require('./routes/userroutes');
const blogroutes=require('./routes/blogroutes');
const app=express();
require("dotenv").config();
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}));
app.use(express.json());
app.use(cookie());

mongoose
  .connect(process.env.DB_STRING)
  .then(()=>console.log("MongoDB connected"))
  .catch((err)=>console.error(err));

const User=require('./models/user');
const Blog=require('./models/blog');

app.use('/api/users',userroutes);
app.use('/api/blog',blogroutes);

app.listen(5000,()=>{
    console.log("server running at 5000");
})