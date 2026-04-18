try {
    require("dotenv").config();
} catch (e) {
    // Ignore error if dotenv is missing in production since Vercel handles env vars natively
}
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("Connected")).catch((err) => console.log("MongoDB connection failed:", err.message));
} else {
    console.log("No MONGO_URI found, keeping backend alive for mock data fallback.");
}
