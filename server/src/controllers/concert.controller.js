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


exports.get = async (req,res) => {
  try {
    const concert = await prisma.concert.findMany({})
    res.status(500).json(concert)
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"error"})
  }
}


exports.getById = async (req,res) => {
  try {
    const {id} = req.params
    const concert = await prisma.concert.findMany({
      where : {
        id:parseInt(id)
      }
    })
    res.status(500).json(concert)
  } catch (error) {
    res.status(500).json({message:"error"})
  }
}


exports.create = async (req, res) => {
  upload.single("picture")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { concertName, venue, concertDate,price} = req.body;
    const picture = req.file ? req.file.filename : null; // Get filename if uploaded

    try {
        const isoConcertDate = new Date(concertDate).toISOString();
      const concert = await prisma.concert.create({
        data: {
            concertName:concertName,
            venue:venue,
            concertDate:isoConcertDate,
            price:parseInt(price),
            picture,
        },
      });
      res.json(concert);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  });
};



exports.updateCon = async (req, res) => {
  upload.single("picture")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const { id } = req.params;
    const { concertName, venue, concertDate,price} = req.body;
    const picture = req.file ? req.file.filename : null; // Get filename if uploaded

    try {
      const isoConcertDate = new Date(concertDate).toISOString();
      const concert = await prisma.concert.update({
        where : {
          id: parseInt(id),
        },
        data: {
            concertName:concertName,
            venue:venue,
            concertDate:isoConcertDate,
            price:parseInt(price),
            picture,
        },
      });
      res.json(concert);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  });
};


exports.delete = async (req,res) => {
  try {
    const {id} = req.params
    const concert = await prisma.concert.delete({
      where : {
        id:parseInt(id)
      }
    })
    res.status(500).json(concert)
  } catch (error) {
    res.status(500).json({message:"error"})
  }
}
