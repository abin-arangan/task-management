var express = require("express");
const cors=require("cors");

var routes = require('./routes');
var connectDB = require('./db/dbConnect');

var app=express();

const corsOptions = {
    // origin: "http://localhost:3000"
    orgin:[]
};
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use("/",routes);

connectDB();

module.exports = app;
const portNo = 8000;
app.listen(portNo,() =>{
    
    console.log(`Server running on port ${portNo}`)
});