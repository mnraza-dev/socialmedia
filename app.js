const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res)=>{
    res.send("Hello World!")
})
app.get("/social", (req, res)=>{
    res.send("Welcome to LinkedIN World!")
})

app.get("/insta", (req, res)=>{
    const insta = {
        userName:"hiteshsir",
        followers:70,
        follow:200,
    };
    res.status(200).json({insta})
})
app.get("/twitter", (req, res)=>{
    const twitter = {
        userName:"hiteshsir",
        followers:700,
        follow:2080,
    };
    res.status(200).json({twitter})
})
app.get("/linkedin", (req, res)=>{
    const linkedin = {
        userName:"hiteshsir",
        followers:710,
        follow:2000,
    };
    res.status(200).json({linkedin})
})







app.listen(PORT,()=>{
    console.log(`I am able to listen at port ${PORT}`);
})