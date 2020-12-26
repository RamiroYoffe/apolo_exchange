const jwt = require("jsonwebtoken");
const User = require("../api/models/user");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  mailRec = req.body.mail;
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  if (decoded.mail === "guido.boschetti3@gmail.com") {
    next();
    return res.status(200);
  } else {
    return res.status(500).json({
      error: "invalid credentials",
    });
  }
};
