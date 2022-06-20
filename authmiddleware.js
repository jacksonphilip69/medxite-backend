const User = require("../backend/authmodel");
const jwt = require("jsonwebtoken");                                //jwt tokens
//verify ,findbyid
//filtering HTTP requests entering application.
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "super secret key", async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();                      // If the user is not authenticated, the middleware will redirect the user to the login screen
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) res.json({ status: true, user: user.email });
        else res.json({ status: false });
        next();
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};
