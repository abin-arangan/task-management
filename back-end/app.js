var express = require("express");
const cors=require("cors");
var routes = require('./routes');
var connectDB = require('./db/dbConnect');

var app=express();

const corsOptions = {
    orgin:[]
};
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use("/",routes);

connectDB();

module.exports = app;
const port = 8000;


app.listen(port,() =>{
    
    console.log(`Server running on port ${port}`)
});