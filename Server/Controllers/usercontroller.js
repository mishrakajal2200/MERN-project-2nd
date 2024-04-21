const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Model = require("../models/model");

exports.signup = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Model.create({ name, username, email, password: hashedPassword });
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    bcrypt.compare(password, user.password, (err, response) => {
      if (response) {
        const token = jwt.sign({ email: user.email }, "jwt-secret-key", {
          expiresIn: "1d",
        });
        res.cookie("token", token);
        res.json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
