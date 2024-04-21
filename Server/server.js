require("dotenv").config();
const express = require("express");
const routes = require("./routes/route");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const ImageSchema = require("./models/ImageSchema");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const MongoString = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose.connect(MongoString);
const Database = mongoose.connection;

Database.on("error", (error) => {
  console.log("Your Server Not Connected With mongoDB");
});

Database.once("connected", () => {
  console.log("Your Server is Connected with mongoDB");
});

// storage
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

// All endpoints
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("uploaded file");
});

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newImage = new ImageSchema({
        name: req.body.name,
        image: {
          data: req.file.filename,
          contentType: "req.file.mimetype",
        },
        location: req.body.location,
      });
      newImage
        .save()
        .then(() => res.send("successfully uploaded"))
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: "Error saving image" });
        });
    }
  });
});

// Handle form submission
app.post("/submit", (req, res) => {
  const { selectedCards } = req.body;
  console.log("Received request body:", req.body); // Log the entire request body
  // Here you can save the selectedCards data to MongoDB or perform any other necessary operations
  console.log("Received selected cards:", selectedCards);

  // Example error handling
  if (!selectedCards) {
    return res.status(400).json({ error: "No selected cards provided" });
  }
  res.json({ success: true }); // Send response back to frontend
});

// Handle email sending
app.post("/send-email", (req, res) => {
  const { email, message } = req.body;
  // Nodemailer setup (replace with your email service provider details)
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Thank You for Registering!",
    text: message,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.json({ success: false, message: "Error sending email" });
    } else {
      console.log("Email sent:", info.response);
      res.json({ success: true, message: "Email sent successfully" });
    }
  });
});

app.use(routes);

app.listen(60001, () => {
  console.log(`server listening on  port ${60001}`);
});
