const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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


exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ message: "สำเร็จ", users });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "สำเร็จ", user });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phoneNumber, password } = req.body;
    const updateData = { fullName, email, phoneNumber };
    if (password) updateData.password = await bcrypt.hash(password, 10);
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    res.json({ message: "สำเร็จ", user });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: parseInt(id) } });
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
      where: { id: parseInt(id) },
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
    const { id, role } = req.body;
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
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
