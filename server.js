const express =require('express');
const mongoose=require('mongoose')
const app=express();
const router=require('./routes/authroute');

app.use(express.json());

const mongouri='mongodb+srv://userSimon:SimonntHJ3322@cluster0.ckww6.mongodb.net/userData?retryWrites=true&w=majority';


mongoose.connect(mongouri,{
    useNewUrlParser:true,useUnifiedTopology:true
}).then((result)=>{
console.log('mongo connected');
})
.catch((err)=>{console.log(err)});
app.get('/',(req,res)=>{
    res.send('yes got it');
    // console.log('done')

})

const port=process.env.PORT || 5000;
app.listen(port,()=>{console.log(`server run at ${port}`)})
app.use(router)