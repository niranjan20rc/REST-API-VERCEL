const express = require('express');
const app = express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Hello from Server")
})
app.listen(5000,()=>{console.log("server running")});