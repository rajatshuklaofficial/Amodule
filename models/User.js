const mongoose=require('mongoose');
const Schema=mongoose.Schema;



// creating schema
const UserSchema = new Schema({
	name:{
		type:String,
		required:true,
		unique: true
	},
	email:{
		type:String,
		required:true
	},
	phone:{
		type:Number,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	roles:{
		type:[],
		default:['jobseeker']
	},
	avatar:{
		type:String
	},
	date:{
		type:Date,
		default:Date.now
	},
})

module.exports=User = mongoose.model('users',UserSchema);
