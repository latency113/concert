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

// 📌 1. GET /api/users - Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// 📌 2. GET /api/user/:id - Fetch user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user by ID" });
  }
};

// 📌 3. PUT /api/user/:id - Update user
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
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

// 📌 4. DELETE /api/user/:id - Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

// 📌 5. POST /api/change-status - Change user status
exports.changeUserStatus = async (req, res) => {
  try {
    const { id, enabled } = req.body;
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { enabled },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error changing user status" });
  }
};

// 📌 6. POST /api/change-role - Change user role
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
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error changing user role" });
  }
};

// 📌 7. POST /api/user/cart - Add to cart
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
    res.status(200).json({ message: "Items added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// 📌 8. GET /api/user/cart - Get cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// 📌 9. DELETE /api/user/cart - Clear cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await prisma.cart.deleteMany({ where: { userId } });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error clearing cart" });
  }
};

// 📌 10. POST /api/user/order - Place order
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
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error placing order" });
  }
};

// 📌 11. GET /api/user/order - Get orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};
