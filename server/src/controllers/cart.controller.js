const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// เพิ่มสินค้าลงใน Cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, cart } = req.body;

    for (let item of cart) {
      const existingItem = await prisma.cart.findUnique({
        where: {
          userId_productId: {
            userId: parseInt(userId),
            productId: parseInt(item.productId),
          },
        },
      });

      if (existingItem) {
        await prisma.cart.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + item.quantity },
        });
      } else {
        await prisma.cart.create({
          data: {
            userId: parseInt(userId),
            productId: parseInt(item.productId),
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price),
          },
        });
      }
    }

    res.status(200).json({ message: "Items added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding items to cart" });
  }
};

// แสดงสินค้าทั้งหมดใน Cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.query;
    const cartItems = await prisma.cart.findMany({
      where: { userId: parseInt(userId) },
      include: {
        product: true,
      },
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// ลบสินค้าจาก Cart
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await prisma.cart.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Item removed from cart", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing item from cart" });
  }
};

// ล้าง Cart ทั้งหมด
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    await prisma.cart.deleteMany({
      where: { userId: parseInt(userId) },
    });

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error clearing cart" });
  }
};
