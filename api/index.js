const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// MongoDB connection URI (with DB name)
const LINK = "mongodb+srv://niranjanrc20:niranjan1234@cluster0.a5adkms.mongodb.net/mern_dbs?retryWrites=true&w=majority&appName=Cluster0";

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

mongoose.connection.on('error', (err) => {
    console.error("❌ Mongoose runtime error:", err.message);
});

// Schema & Model
const my_schema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
});

const MERN_DB = mongoose.model("MERN_DB", my_schema);

// Routes
app.get("/users", async (req, res) => {
    try {
        const users = await MERN_DB.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/users", async (req, res) => {
    try {
        const newUser = new MERN_DB(req.body);
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await MERN_DB.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete("/users/:id", async (req, res) => {
    try {
        const deletedUser = await MERN_DB.findByIdAndDelete(req.params.id);
        res.json(deletedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Export the app (no listen)
module.exports = app;
