const express = require("express");
const cors = require("cors");                                        //auth for all fields
const mongoose = require("mongoose");

const authRoutes = require("./authroute");
const cookieParser = require("cookie-parser");          // puts the cookie information on req object in the middleware.
// It will decrypt signed cookies provided 

const app = express();
app.get("/", async (res, req) => {});                                              
app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {  
    console.log("Server Started Successfully.");
  }
});

//connected mongoose

mongoose
  .connect(
    "mongodb+srv://jack:hiijack@cluster0.hi582.mongodb.net/pass?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } 
  )
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

//cors
app.use(
  cors({
    origin: ["http://localhost:3000"],            //parses cookies and puts the cookie information on req object in the middleware.
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
