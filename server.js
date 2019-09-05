const express =require('express');
const mongoose =require('mongoose');
const bodyParser=require('body-parser')
const passport=require('passport');
const cors=require('cors');



const app = express();



const usersvar=require('./routes/api/users');
const profilevar=require('./routes/api/profile');
const postsvar=require('./routes/api/posts')

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
.then(()=>console.log("Db connected"))
.catch((err)=>console.log(err))

// Routes
app.use('/api/users',usersvar);
app.use('/api/profile',profilevar);
app.use('/api/posts',postsvar);


app.listen(port,()=>console.log(`server is running at ${port}`));
app.get('/',(req,res) => res.send("kitni bar yahi karoge?"));