const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.authCheck = async (req, res, next) => {
  try {
    const headerToken = req.headers.authorization;

    if (!headerToken) {
      return res.status(401).json({ message: "No Token Provided" });
    }

    const token = headerToken.split(" ")[1];

    console.log("Token Received in authCheck:", token); // Log the received token

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token Payload:", decoded); // Log the decoded payload

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid Token" });
    } else {
      return res.status(401).json({ message: "Authentication Failed" });
    }
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    if (!req.user) {
      // Check if req.user is undefined
      return res
        .status(401)
        .json({ message: "Unauthorized: No user information" }); // Or redirect, or handle as needed
    }

    const { email } = req.user; // Now safe to destructure

    const adminUser = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!adminUser || adminUser.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: Admin Only" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error checking admin access" }); // More specific message
  }
};
