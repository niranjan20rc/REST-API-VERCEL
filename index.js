const express = require('express');
const app = express();
app.use(express.json());
app.get("/get",(req,res)=>{
    res.send("GET")
})
app.post("/post",(req,res)=>{
    res.send("POST")
})
app.put("/put",(req,res)=>{
    res.send("PUT");
})
app.del("/delete",(req,res)=>{
    res.send("DELETE");
})
app.listen(5000,()=>{console.log("server running")});