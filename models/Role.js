const mongoose=require('mongoose');
const Schema=mongoose.Schema;



// creating schema
const RoleSchema = new Schema({
	name:{
		type:String,
		required:true,
		unique: true
	},
	read:{
		type:Boolean,
		default:true
	},
	write:{
		type:Boolean,
		default:false
	},
	delete:{
		type:Boolean,
		default:false
	},
	date:{
		type:Date,
		default:Date.now
	},
})

module.exports=Role = mongoose.model('roles',RoleSchema);
