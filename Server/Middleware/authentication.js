// backend/middleware/auth.js

const jwt = require("jsonwebtoken");
const model = require("../models/model");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "your_secret_key");
    const user = await model.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json("Please authenticate");
  }
};

module.exports = auth;
