const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.authCheck = async (req, res, next) => {
  try {
    const headerToken = req.headers.authorization;

    if (!headerToken) {
      return res.status(401).json({ message: "No Token Providedddddddd" });
    }

    const token = headerToken.split(" ")[1];

    if (process.env.NODE_ENV === 'development') {
      console.log("Token Received in authCheck:", token);
    }

    // Verify the token and check expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { 
      maxAge: '1000h'
    });

    if (process.env.NODE_ENV === 'development') {
      console.log("Decoded Token Payload:", decoded);
    }

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
      return res
        .status(401)
        .json({ message: "Unauthorized: No user information" });
    }

    const { email } = req.user;

    const adminUser = await prisma.user.findFirst({
      where: { email: email },
      select: { role: true },  // Only fetch the role field
    });

    if (!adminUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (adminUser.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: Admin Only" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error checking admin access" });
  }
};
