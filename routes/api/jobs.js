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
const Job=require('../../models/Jobs');
const key=require('../../config/keys');
// API


router.get('/test',(req,res)=>res.json({good:"Job"}))

router.post('/postjob',cors(corsOptions),passport.authenticate('jwt',{session:false}),(req,res)=>{
	Job.findOne({ user: req.user.id }).then(job => {
      const newJob = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        description: req.body.description,
        status:req.body.status
      };

      // Add to exp array
      job.unshift(newJob);

      job.save().then(job => res.json(job));
    });
})

router.post('/addrole',cors(corsOptions),(req,res)=>{
	Roles.findOne({name:req.body.name})
	.then(user =>{
		if (user) {
			return res.status(400).json({Role:'Role Already exists '})
		}
		else{
			const newrole= new Roles({
				name:req.body.name,
				read:req.body.read,
				write:req.body.write,
			});
			newrole.save()
			.then(user=>res.json(user)).catch(err=>console.log(err));
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
