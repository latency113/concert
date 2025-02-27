const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

// Middleware for Auth
exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/photo/");
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

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ message: "สำเร็จ", users });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    console.log("req.user:", req.user);

    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID is missing" });
    }

    const userId = req.user.id;
    console.log("User ID:", userId);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        phoneNumber: true,
        picture: true,
        role: true,
      },
    });

    const usersWithUrls = {
      ...user,
      pictureUrl: user.picture
        ? `${req.protocol}://${req.get("host")}/images/photo/${user.picture}`
        : null,
    };

    if (!user) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res
      .status(200)
      .json({ message: "Profile retrieved successfully", user: usersWithUrls });
  } catch (error) {
    console.error("Error retrieving profile:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    upload.single("picture")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const userId = req.user.id;
      const { name, phoneNumber, password } = req.body;
      const picture = req.file ? req.file.filename : undefined;
      
      // If a new password is provided, hash it
      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name,
          phoneNumber,
          picture,
          ...(hashedPassword && { password: hashedPassword }), // Only update password if it's provided
        },
      });

      res.json({ message: "Profile updated successfully", user: updatedUser });
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.json({ message: "สำเร็จ", user });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.changeUserStatus = async (req, res) => {
  try {
    const { id, enabled } = req.body;
    const user = await prisma.user.update({
      where: { id: id },
      data: { enabled },
    });
    res.json({ message: "สำเร็จ", user });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.changeUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const user = await prisma.user.update({
      where: { id: id },
      data: { role },
    });
    res.json({ message: "สำเร็จ", user });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { cart } = req.body;
    const userId = req.user.id;
    const cartData = cart.map((item) => ({
      userId,
      productId: item.id,
      quantity: item.count,
      price: item.price,
    }));
    await prisma.cart.createMany({ data: cartData });
    res.json({ message: "สำเร็จ", user });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", cartData);
    res.status(500).json({ error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });
    res.json({ message: "สำเร็จ", cart });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await prisma.cart.deleteMany({ where: { userId } });
    res.json({ message: "สำเร็จ", userId });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;
    const order = await prisma.order.create({
      data: {
        userId,
        status: "Pending",
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });
    await prisma.cart.deleteMany({ where: { userId } });
    res.json({ message: "สำเร็จ", order });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });
    res.json({ message: "สำเร็จ", orders });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: error.message });
  }
};
