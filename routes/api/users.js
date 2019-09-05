const express=require('express')
const router=express.Router();
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const passport=require('passport');
var cors=require('cors'); 

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const User1=require('../../models/User');
const key=require('../../config/keys');
// API


router.get('/test',(req,res)=>res.json({good:"good"}))

router.post('/register',cors(corsOptions),(req,res)=>{
	User1.findOne({email:req.body.email})
	.then(user =>{
		if (user) {
			return res.status(400).json({email:'Email Already exists '})
		}
		else{
			const avatar= gravatar.url(req.body.email,{
				s:200,
				r:'pg',
				d:'mm'
			})
			const newuser= new User1({
				name:req.body.name,
				email:req.body.email,
				avatar,
				password:req.body.password

			});
			bcrypt.genSalt(10,(err,salt)=>{
				bcrypt.hash(newuser.password,salt,(err,hash)=>{
					console.log(newuser)
					if(err) throw err;
					newuser.password=hash;
					newuser.save()
					.then(user=>res.json(user)).catch(err=>console.log(err));
				})
			})
		}
	})

})

router.post('/login',(req,res)=> {
	// body...
	const email=req.body.email
	const password=req.body.password
	User1.findOne({email:email})
	.then(user =>{
		if (!user) {
			res.status(404).json({email:'Email not found'})
		}
		bcrypt.compare(password,user.password)
		.then(isMatch=>{
			if (isMatch) {
			const payload={id:user.id,name:user.name,avatar:user.avatar}

			jwt.sign(payload,key.secret,{expiresIn:3600},(err,token)=>{
				res.json({
					success:true,
					token:'Bearer '+token
				})
			})
		   }
		   else{
		   	res.status(400).json({Password:"Password incorrect"})
		   }
		})
	})
})

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
	res.json({
		id:req.user.id,
		name:req.user.name,
		email:req.user.email
	})

})



module.exports = router;