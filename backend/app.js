const express= require("express");
const app=express();
const cors=require("cors");
const bookRoute=require("./routes/booksRoute");
require("./connection/conn");
app.use(cors());
app.use(express.json());
app.use("/api/v1",bookRoute);

module.exports = app;
