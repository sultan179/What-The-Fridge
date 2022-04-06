const mongoose = require("mongoose");



const connectDB = (url) => {  //connectDB is a function which takes in a url as an argument and returns mongoose.connect(url,{options})
  return mongoose.connect(url, {});
};

module.exports = connectDB;
