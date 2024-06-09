const express = require("express");
const app = express();
const User = require("./models/user");
const jwt = require(jsonwebtoken);

var cookieParser = require('cookie-parser')


app.use(express.json()); //later discuss
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// app.get("/api/v1/:token",(req,res)=>{
//     console.log(req.params.token);
//     res.status(200).json({param:req.params.token})
// })

app.get("/", (req, res) => {
  res.send("<h1>Hello auth system</h1>");
});

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

app.get("/dashboard", (req, res)=>{
 

})











app.post("/signup", async (req, res) => {
  // for all mandatory field
  const { firstname, lastname, email, password } = req.body;
  if (!(email && firstname && lastname)) {
    res.status(400).send("All the fields are required !");
  }
  // Unique email
  const extUser = await User.findOne(email);
  if (extUser) {
    res.status(200).send("User already exists !");
  }

  // Password
});
module.exports = app;
