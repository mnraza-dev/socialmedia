const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res)=>{
    res.send("Hello World!")
})
app.get("/social", (req, res)=>{
    res.send("Welcome to LinkedIN World!")
})

app.get("/test", (req, res)=>{
    res.send("Welcome to Test World!")
})

app.listen(PORT,()=>{
    console.log(`I am able to listen at port ${PORT}`);
})