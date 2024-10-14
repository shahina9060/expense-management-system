const express = require('express');
const dotenv = require('dotenv')
const connection = require('./connection/config')
const app = express();
const routes = require('./routes/userRoutes')
const cors = require('cors')

const path = require('path');

// Serve static files from the 'files' directory
app.use('/files', express.static(path.join(__dirname, 'files')));


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    orogin: "http://localhost/3000",
    Credentials: true
}))

//  db connection
dotenv.config();
connection(process.env.MONGO_URL)

// route
app.use(routes)

app.listen(8081,"localhost",(error)=>{
    if(error){
        console.log(error)
    }
    console.log("server is running on port 8081")
})