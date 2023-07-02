const mongoose = require('mongoose');


const url = 'mongodb://127.0.0.1:27017/InformationCenter?directConnection=true'; // replace with your database URI

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(url, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error('Connection Error:',error.message);
      // process.exit(1);
    }
  }
  
module.exports = connectDB;
  
