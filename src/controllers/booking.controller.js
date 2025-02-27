const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.get = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        concert: true,
        schedule: true,
      },
    });
    res.json(bookings);
  } catch (error) {
    console.error(error); // log error for debugging
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        bookings: true,
      },
    });

    if (!booking) {
      return res.status(404).json({ message: "ไม่พบการจอง" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการเรียก ID" });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { concertId, totalTickets, scheduleId } = req.body;

    // Ensure scheduleId is valid
    const schedule = await prisma.schedule.findUnique({
      where: { id: parseInt(scheduleId) },
    });

    if (!schedule) {
      return res.status(404).json({ message: "ไม่พบรอบการแสดงนี้" });
    }

    const concert = await prisma.concert.findUnique({
      where: { id: parseInt(concertId) },
      include: { bookings: true },
    });

    if (!concert) {
      return res.status(404).json({ message: "ไม่พบคอนเสิร์ต" });
    }

    const totalBookedTickets = concert.bookings.reduce(
      (acc, booking) => acc + booking.totalTickets,
      0
    );

    const availableTickets = concert.seatsAvailable - totalBookedTickets;

    if (availableTickets < totalTickets) {
      return res.status(400).json({
        message: `จำนวนบัตรเหลือไม่เพียงพอ. ${availableTickets} ตั๋วเหลืออยู่`,
      });
    }

    const newBooking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        concertId: parseInt(concertId),
        scheduleId: parseInt(scheduleId),
        totalTickets:parseInt(totalTickets),
        totalAmount: concert.price * totalTickets,
        status: "NotPaying",
      },
    });

    await prisma.concert.update({
      where: { id: parseInt(concertId) },
      data: {
        seatsAvailable: {
          decrement: parseInt(totalTickets),
        },
      },
    });

    // Send response with new booking details
    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการจองบัตร" });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await prisma.booking.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status,
      },
    });

    res.json(booking);
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!booking) {
      return res.status(404).json({ message: "ไม่พบการจอง" });
    }

    const concertId = booking.concertId;
    const totalTickets = booking.totalTickets;

    await prisma.booking.delete({
      where: {
        id: parseInt(id),
      },
    });

    await prisma.concert.update({
      where: {
        id: parseInt(concertId),
      },
      data: {
        seatsAvailable: {
           increment: parseInt(totalTickets),
        },
      },
    });

    res.json({ message: "ยกเลิกการจองเสร็จสิ้น", booking });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: error.message });
  }
};
