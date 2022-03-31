const express = require("express"); //setup a basic express server
const app = express(); //initialize a variable ,app is an express function with built in methods like app.use() app.get
const port = process.env.PORT||3000; //get an available port else take 3000

const recipe = require("./routes/recipe"); //all similar tasks routes should be imported
const connectDB = require("./db/connect"); //connect to db

require('dotenv').config()  //

app.use(express.json()); //parses incoming data to req.body


app.use("/api/v1", recipe); //REPLACE THE ENDPOINT WITH SPOONACULAR'S ROUTE





const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI); //connect to database first before starting server,uri is in .env file and await the connection
   
    app.listen(port, console.log(`server is listenin on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};
start()
