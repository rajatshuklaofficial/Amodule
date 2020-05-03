const express =require('express');
const mongoose =require('mongoose');
const bodyParser=require('body-parser')
const passport=require('passport');
const cors=require('cors');



const app = express();

app.use(cors())


const usersvar=require('./routes/api/users');
const profilevar=require('./routes/api/profile');
const postsvar=require('./routes/api/posts')
const user = require("./models/User");

// Database url
const db=require('./config/keys').mongoURI
const port = process.env.PORT || 5000;
// body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// passport middleware
app.use(passport.initialize());
require('./config/passport')(passport)



// Connect to Mongodb
mongoose
.connect(db)
.then(()=>
console.log("Db connected"))
// INSERT INTO bootstrap
bootStrap()
// Routes
app.use('/api/users',usersvar);
app.use('/api/profile',profilevar);
app.use('/api/posts',postsvar);


app.listen(port,()=>console.log(`server is running at ${port}`));
app.get('/',(req,res) => res.send("kitni bar yahi karoge?"));

// Adding comment for testing git
// Super users to be inserted here.
function bootStrap(){
const conn = mongoose.connection;
const userList = [{ name: 'admin', email: "admin@rojgar.com", password: "admin@123", date: new Date() }, 
{ name: 'admin1', email: "admin1@rojgar.com", password: "admin@1234", date: new Date()}, { name: 'admin2', email: "admin2@rojgar.com", password: "admin@123", date: new Date() }]
const collection = conn.collection("users").insertMany(userList, function(err, res) {
     if(err)
	console.log("Record already Exist");
	 else
    console.log("Record inserted", res);
  });

}