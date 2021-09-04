
const User=require('../models/User')



// const {API_KEY}=require('../keys')
// const nodemailer=require('nodemailer');
// const sendgridTransport=require('nodemailer-sendgrid-transport');
// const transporter=nodemailer.createTransport(sendgridTransport({
//     auth:{
//      api_key:"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",
//      api_user:"traviskaterherron@gmail.com"
//     }

// module.exports.signup_post=async(req,res)=>{
//     const {email,password,fullname}=req.body;
//     try{
//         const user=await User.create({
//             email,password,fullname
//         })
//     const token =  cretaetoken(user._id);
   
   
//         res.status(200).json({user:user,token:token})
        
//         res.send("done post")
       

 
//     }
//     catch(err){
//         const error=handleerror(err)
//         res.status(422).json({error:error})
//       //   res.send(err.code)
//       }
// }
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}



module.exports.signup_post=(req,res)=>{
    const {email,password,fullname,referralCode}=req.body;
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
         return    res.status(422).json({error:"Email Already Exists"})
        }
        // if code exists 
       else if(referralCode.length>1){
                         
        User.findOne({referralCode:referralCode}).then((foundUser)=>{
            if(foundUser){
                //if userrefercode found
                User.findOneAndUpdate({_id:foundUser._id},{
                    $set: {totalAmount:foundUser.totalAmount+5
                     
                 }
                 },{new:true},(err,userNew)=>{
                   if (err){
                       //not found
                      console.log("not found")
                   }
                   else{
                    bcrypt.hash(password,7)
                    .then(hashedpassword=>{
                        const referralCode=makeid(8)
                        const user=new User({
                            email,
                            password:hashedpassword,
                            fullname,
                            referralCode,
                            nfcGet:1
                        }) 
                        user.save()
                        .then(user=>{
                            saveToAdmin(user._id);
                            const token = cretaetoken(user._id);
                            res.status(200).json({user:user,token:token,userNew:userNew})
                        }).catch(err=>console.log('err'))})
                   }
       ///  found
                 })
            }
            // not found refercode user
           else{
            bcrypt.hash(password,7)
            .then(hashedpassword=>{
                const referralCode=makeid(8)
                const user=new User({
                    email,
                    password:hashedpassword,
                    fullname,
                    referralCode
                }) 
                user.save()
                .then(user=>{
                    saveToAdmin(user._id);
                    const token = cretaetoken(user._id);
                    res.status(200).json({user:user,token:token})
                }).catch(err=>console.log('err'))
            })
           }

        }
      ).catch(err=>console.log('wrong'))
            
  } // if code and email user does not exist
        else {   bcrypt.hash(password,7)
        .then(hashedpassword=>{
            const referralCode=makeid(8)
            const user=new User({
                email,
                password:hashedpassword,
                fullname,
                referralCode
            }) 
            user.save()
            .then(user=>{

                saveToAdmin(user._id);
                const token = cretaetoken(user._id);
                res.status(200).json({user:user,token:token})
            }).catch(err=>console.log('err'))
        })
        }
}).catch(err=>console.log('err'))
}













// module.exports.signin_post=async(req,res)=>{
//     const {email,password}=req.body;
//     try{
//         const user= await User.login(email,password);
//         const token=cretaetoken(user._id);
//         console.log('yes yes',user)
//         // res.cookie('jwt',token,{httpOnly:true,maxAge:3*24*60*60*1000})
//         // const user= await User.findById(usercreate._id).select("email fullname data account").populate("data","bio gender")

//         res.status(200).json({user:user,token:token})        
//       }
//     catch(err){
//         const error=handleerror(err)
//         res.status(422).json({error}) 
//       //   res.send(err.code)
//       }


//  }

 module.exports.signin_post=(req,res)=>{
    const {email,password}=req.body;
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            return    res.status(422).json({error:"Invalid Email Or Password"})  
        }
        bcrypt.compare(password,user.password)
        .then(doMatch=>{
            if (doMatch){
                const token =  cretaetoken(user._id); 
                res.status(200).json({user:user,token:token})
            }
            else{
                return    res.status(422).json({error:"Invalid Email Or Password"}) 
            }
        }).catch(err=>{
            console.log('err')
        })
    }).catch(err=>console.log('err'))


 } 

   


 


