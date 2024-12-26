const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// สร้าง Order จากสินค้าที่มีใน Cart
exports.placeOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    // คำนวณราคาจากสินค้าที่อยู่ใน Cart
    const order = await prisma.order.create({
      data: {
        userId: parseInt(userId),
        status: "Pending",
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    });

    // ลบสินค้าจาก Cart หลังจากที่สร้าง Order
    await prisma.cart.deleteMany({
      where: { userId: parseInt(userId) },
    });

    res.status(201).json({ message: 'Order placed', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error placing order' });
  }
};

// แสดง Orders ของ User
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    const orders = await prisma.order.findMany({
      where: { userId: parseInt(userId) },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// ดึงข้อมูล Order ด้วย ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching order' });
  }
};

// อัปเดตสถานะของ Order
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating order status' });
  }
};

// ยกเลิก Order
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Order cancelled', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error cancelling order' });
  }
};
