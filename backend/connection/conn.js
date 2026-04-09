const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://coder:suman12345@cluster0.f5ynyxz.mongodb.net/Bookstore?retryWrites=true&w=majority&appName=Cluster0"
).then(()=> console.log("Connected")).catch((err) => console.log("MongoDB connection failed:", err.message));
