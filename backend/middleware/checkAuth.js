const jwt = require("jsonwebtoken");
const User = require("../api/models/user");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  // mailRec = req.body.mail;
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  res.locals.mail = decoded.mail;
  next();
  // if (decoded.mail === mailRec) {
  //   res.locals.next();
  //   return res.status(200);
  // } else {
  //   return res.status(500);
  // }
};

// El middleware le pasa como variable el mail del token al controlador.
// Esto hace que el front no necesite comparar los mails sino que al momento de next
// la variable mail es la del token
//
//A partir de ahora para conseguir info de un usuario unicamente es necesario usar su token
