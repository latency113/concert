const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.Checkout = async (req, res) => {
  try {
    const { id } = req.body;
    const booking = await prisma.booking.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        concert: {
          select: {
            id: true,
            concertName: true,
            price: true,
            picture: true,
          },
        },
      },
    });

    if (!booking) {
      return res.status(404).json({ message: "ไม่พบการจอง" });
    }

    const { totalAmount, totalTickets, concert } = booking;
    const { concertName, pictureUrl } = concert;

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded", // ตรวจสอบว่าใช้ ui_mode นี้ถูกต้องหรือไม่
      metadata: { bookingId: id },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "thb",
            product_data: {
              name: concertName,
              images: [pictureUrl],
              description: `${totalTickets} ใบ ราคา ${totalAmount} บาท`,
            },
            unit_amount: totalAmount * 100,
          },
        },
      ],
      mode: "payment",
      return_url: `http://localhost:5173/user/complete/{CHECKOUT_SESSION_ID}`,
    });

    console.log("Session created successfully: ", session); // เพิ่มการ log ดู session ที่ถูกสร้างขึ้น
    res.send({ clientSecret: session.client_secret });
    console.log(booking);
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.CheckoutStatus = async (req, res) => {
  try {
    const { session } = req.params;
    const payment = await stripe.checkout.sessions.retrieve(session);
    const bookingId = payment.metadata?.bookingId;
    if(payment.status === 'completed' || !bookingId) {
      return res.status(404).json({ message: "เกิดข้อผิดพลาดในการชำระเงิน" });
      }
    
    console.log(payment);
    const result = await prisma.booking.update({
      where: {
        id: Number(bookingId),
      },
      data: {
        status: "Paid",
      },
    });
    res.json({ message: "ชำระเงินสำเร็จ" },);
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: error.message });
  }
};
