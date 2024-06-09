const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log(req.cookies);

  const token = req.cookies;

  // what if token is not there
  if (!token) {
    return res.status(403).send("token is missing");
  }
  // verify token
  try {
    const decode = jwt.verify(token, "shhhh");
    console.log(decode);
    req.user = decode;
  } catch (error) {
     res.status(403).send('Token is invalid');
  }
  return next()
};

module.exports = auth;
