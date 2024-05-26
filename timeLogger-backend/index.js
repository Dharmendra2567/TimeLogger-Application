const express = require('express')
const app = express();
require('dotenv').config();
require('./Database/Connection');

//import router
const UserRoute = require('./route/UserRoute')
const ActivityRoute = require('./route/ActivityRoute')

const port = process.env.PORT;
//middleware
const cors = require('cors')
const bodyParser = require('body-parser')
const Morgan = require('morgan')
const cookieParser = require('cookie-parser')

//use middleware
app.use(bodyParser.json())
app.use(Morgan('dev'))
app.use(cors())
app.use(cookieParser())

//use router
app.use('/api',UserRoute);
app.use('/api',ActivityRoute)


app.listen(port,()=>{
    console.log(`Server started at port: ${port}`);
})