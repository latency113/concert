const { PrismaClient } = require("@prisma/client");
const { query } = require("express");
const prisma = new PrismaClient();
const multer = require("multer");

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

// Multer Middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
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

/* ----------------------------------
  🎟️ ดึงข้อมูลคอนเสิร์ตจากการค้นหา
---------------------------------- */
exports.getQuery = async (req, res) => {
  try {
    const { query } = req.query;
    const concerts = await prisma.concert.findMany({
      where: {
        concertName: {
          contains: query,
        },
      },
      include: {
        Schedule: true, // รวมตารางรอบเวลา
      },
    });

    const concertsWithUrls = concerts.map((concert) => ({
      ...concert,
      pictureUrl: concert.picture
        ? `${req.protocol}://${req.get("host")}/images/photo/${concert.picture}`
        : null,
    }));

    res.status(200).json({ concerts: concertsWithUrls });
  } catch (error) {
    console.error("Error fetching concerts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ----------------------------------
  🎟️ ดึงข้อมูลคอนเสิร์ตทั้งหมด
---------------------------------- */
exports.get = async (req, res) => {
  try {
    const concerts = await prisma.concert.findMany({
      include: {
        Schedule: true, // รวมตารางรอบเวลา
      },
    });

    const concertsWithUrls = concerts.map((concert) => ({
      ...concert,
      pictureUrl: concert.picture
        ? `${req.protocol}://${req.get("host")}/images/photo/${concert.picture}`
        : null,
    }));

    res.status(200).json({ concerts: concertsWithUrls });
  } catch (error) {
    console.error("Error fetching concerts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ----------------------------------
  🎟️ ดึงข้อมูลคอนเสิร์ตตาม ID
---------------------------------- */
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const concert = await prisma.concert.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        Schedule: true,
      },
    });

    if (!concert) {
      return res.status(404).json({ message: "Concert not found" });
    }

    res.status(200).json({
      concert: {
        ...concert,
        pictureUrl: concert.picture
          ? `${req.protocol}://${req.get("host")}/images/photo/${
              concert.picture
            }`
          : null,
      },
    });
  } catch (error) {
    console.error("Error fetching concert by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ----------------------------------
  🎵 สร้างคอนเสิร์ตพร้อมรอบเวลา
---------------------------------- */
exports.create = async (req, res) => {
  upload.single("picture")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { concertName, venue, price, seatsAvailable } = req.body;
    const picture = req.file ? req.file.filename : null;

    let schedules = []; // Initialize schedules as an empty array

    // 1. Parse schedules JSON string (if it exists)
    if (req.body.schedules) {
      try {
        schedules = JSON.parse(req.body.schedules);
        if (!Array.isArray(schedules)) {
          throw new Error("Invalid schedules format. Must be an array.");
        }
      } catch (parseError) {
        return res.status(400).json({ error: "Invalid schedules format" });
      }
    }

    try {
      const concert = await prisma.concert.create({
        data: {
          concertName,
          venue,
          price: parseInt(price),
          seatsAvailable: parseInt(seatsAvailable),
          picture,
          Schedule: {
            // Correct Prisma syntax for createMany
            createMany: {
              data: schedules.map((schedule) => ({
                // Now schedules is guaranteed to be an array
                date: new Date(schedule.date).toISOString(),
                startTime: schedule.startTime,
                endTime: schedule.endTime,
              })),
            },
          },
        },
        include: { Schedule: true }, // Include schedules in the response
      });

      res.status(201).json({ message: "สร้างคอนเสิร์ตสำเร็จ", concert });
    } catch (error) {
      console.error("Error creating concert:", error);
      res.status(500).json({ error: error.message });
    }
  });
};

/* ----------------------------------
  🎵 อัปเดตคอนเสิร์ตพร้อมรอบเวลา
---------------------------------- */
exports.updateCon = async (req, res) => {
  upload.single("picture")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { id } = req.params;
    const { concertName, venue, price, seatsAvailable, schedules } = req.body;
    const picture = req.file ? req.file.filename : null;

    try {
      // แปลง schedules เป็น Array ถ้าเป็น String
      let parsedSchedules = [];
      if (schedules) {
        try {
          parsedSchedules = JSON.parse(schedules);
        } catch (parseError) {
          return res.status(400).json({
            error: "Invalid schedules format. Please use a valid JSON array.",
          });
        }
      }

      const updateData = {};

      if (concertName) updateData.concertName = concertName;
      if (venue) updateData.venue = venue;
      if (price) updateData.price = parseInt(price);
      if (seatsAvailable) updateData.seatsAvailable = parseInt(seatsAvailable);
      if (picture) updateData.picture = picture;

      if (Array.isArray(parsedSchedules)) {
        updateData.Schedule = {
          create: parsedSchedules.map((schedule) => ({
            date: new Date(schedule.date).toISOString(),
            startTime: schedule.startTime,
            endTime: schedule.endTime,
          })),
        };
      }

      const concert = await prisma.concert.update({
        where: { id: parseInt(id) },
        data: updateData,
        include: { Schedule: true }, // แสดงข้อมูลตารางเวลา
      });

      res.status(200).json({ message: "อัพเดตคอนเสิร์ตสำเร็จ", concert });
    } catch (error) {
      console.error("Error updating concert:", error);
      res.status(500).json({ error: error.message });
    }
  });
  console.log("Request body:", req.body);
};

/* ----------------------------------
  🗑️ ลบคอนเสิร์ต
---------------------------------- */
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.concert.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "ลบคอนเสิร์ตสำเร็จ" });
  } catch (error) {
    console.error("Error deleting concert:", error);
    res.status(500).json({ error: error.message });
  }
};
