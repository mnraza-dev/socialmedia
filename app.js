const express = require("express");
const app = express();
const User = require("./models/user");
const jwt = require("jsonwebtoken");

var cookieParser = require('cookie-parser')


app.use(express.json()); //later discuss
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// custom middleware
const auth = require("./middleware/auth")

// app.get("/api/v1/:token",(req,res)=>{
//     console.log(req.params.token);
//     res.status(200).json({param:req.params.token})
// })

app.post("/register", async (req, res) => {
  console.log(req.body);
  // const {firstname, lastname, email, password} = req.body

  try {
    // collect all info
    const { firstname, lastname, email, password } = req.body;

    // validate the data
    if (!(email && firstname && lastname)) {
      res.status(400).send("All the fields are required !");
    }
    // check if user exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(200).send("User already exists !");
    }

    // encrypt the password
    const encryptedPass = await bcrypt.hash(password, 10);

    // create a new entry in database
    const user = await User.create({
      firstname,
      lastname,
      email,
      encryptedPass,
    });

    // create a token and send it to user
    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      "shhhh",
      { expiresIn: "2h" }
    );
    user.token = token;
    // don't want to send thge password
    user.password = undefined;
    res.status(201).json(user);
  } catch (error) {
    console.log("Error is in response route", error);
  }
});

app.post("/login", async (req, res) => {
  try {
    // collected info from frontend
    const { email, password } = req.body;
    // validate
    if (!(email && password)) {
      res.send("Email and password is required !");
    }
    // check user in database
    const user = await User.findOne({ email });
    // user doesn't exist

    // match the password
    if (user && (await bcrypt.compare(password, user.password)))
    {
        // create token & send
        const token = jwt.sign({ id: user._id, email }, "shhhh", { expiresIn: '2h' });
        user.password = undefined,
        user.token = token

        const options ={
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.sendStatus(200).cookie("token", token , options).json({
          success:true,
          token,
          user
        })
        
    }
    res.sendStatus(400).send("email and password is incorrect !")

    
  } catch (error) {
    console.log(error);
  }
});

app.get("/dashboard", (req, auth, res)=>{
  res.send("welcome to Dashboard")
})

function calculateSum(counter){
  var sum =0;
  for (let i = 0; i <=counter; i++) {
    sum = sum + i;
  }
  return sum;
}

function handleFirstRequest(req, res) {
  var counter = parseInt(req.query.counter, 10); 
  var sum = calculateSum(counter); 
  var answer = "This is sum " + sum;
  res.send(answer);
}

app.get("/handleSum", handleFirstRequest);

module.exports = app;
