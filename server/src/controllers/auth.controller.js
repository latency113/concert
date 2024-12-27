const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/photo/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(file.originalname.toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpeg, .jpg, .png files are allowed!"));
    }
  },
});

exports.register = async (req, res) => {
  try {
    upload.single("picture")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await prisma.user.findFirst({
        where: { 
          email 
        },
      });

      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const picture = req.file ? req.file.filename : null;

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
          picture,
        },
      });

      res.status(201).json({ message: "User registered successfully", user });
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "email are required" });
    }
    if (!password) {
      return res.status(400).json({ message: "password are required" });
    }
    const user = await prisma.user.findFirst({
      where: { 
        email 
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json(isMatch);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.currentUser = async (req, res) => {
  try {
      const user = await prisma.user.findFirst({
          where: { email: req.user.email },
          select: {
              id: true,
              email: true,
              name: true,
              role: true
          }
      })
      res.json({ user })
  } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Server Error' })
  }
}