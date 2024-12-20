const { PrismaClient } = require("@prisma/client");
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
      file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split(".").pop()
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


exports.create = async (req, res) => {
  upload.single("picture")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { concertName, venue, concertDate, totalseats ,availableSeats} = req.body;
    const picture = req.file ? req.file.filename : null; // Get filename if uploaded

    try {
        const isoConcertDate = new Date(concertDate).toISOString();
      const concert = await prisma.concert.create({
        data: {
            concertName:concertName,
            venue:venue,
            concertDate:isoConcertDate,
            totalSeats:parseInt(totalseats, 10),
            availableSeats:parseInt(availableSeats, 10),
            picture,
        },
      });
      res.json(concert);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
