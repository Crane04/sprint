const jwt = require("jsonwebtoken");
const User = require("../models/User");

const ValidateStudent = async (req, res, next) => {
  let token;
  let authHeader =
    req?.headers?.Authorization || req?.headers?.authorization || req?.cookies?.jwt;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          detail: "Student is unauthenticated!",
        });
      }

      try {
        const existingUser = await User.findById(decoded?.id).exec();
        if (!existingUser) {
          console.log("unauthorized")
          return res.status(401).json({
            detail: "Unauthorized access!",
          });
        }
        console.log(req.body)
        req.user = existingUser;
        next();
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          detail: "Server error",
        });
      }
    });
  } else {
    return res.status(401).json({
      message: "Missing token",
    });
  }
};

module.exports = ValidateStudent;
