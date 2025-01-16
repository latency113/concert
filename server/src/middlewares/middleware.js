const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.authCheck = (req, res, next) => {
    try {
      const headerToken = req.headers.authorization;
  
      if (!headerToken) {
        return res.status(401).json({ message: "No Token Provided" });
      }
  
      const token = headerToken.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      req.user = decoded; // Token Payload -> id, email, role
      next();
    } catch (error) {
      console.error("Token Verification Error:", error);
      res.status(401).json({ message: "Invalid or Expired Token" });
    }
  };

exports.adminCheck = async (req, res, next) => {
    try {
        const { email } = req.user;
        const adminUser = await prisma.user.findFirst({
            where: { email: email }
        });

        if (!adminUser || adminUser.role !== 'admin') {
            return res.status(403).json({ message: 'Access Denied: Admin Only' });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error Admin access denied' });
    }
};
