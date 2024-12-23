const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");

exports.get = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });
    res.json(products);
  } catch (error) {
    res.json(error);
    console.log(error)
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        category: true,
      },
    });
    res.json(product);
  } catch (error) {
    res.json("error");
  }
};

exports.create = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { categoryId, name, price, description, stock } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
      const product = await prisma.product.create({
        data: {
          categoryId: parseInt(categoryId),
          name,
          price: parseInt(price),
          description,
          stock: parseInt(stock),
          image,
        },
      });
      res.json({message: "สร้างสินค้าสำเร็จ",product,});
    } catch (error) {
      console.error("เกิดข้อผิดพลาดระหว่างการสร้างสินค้า:", error);
      res.status(500).json({ error: error.message });
    }
  });
};

exports.update = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const { id } = req.params;
    const { categoryId, name, price, description, stock } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
      const data = {};
      if (categoryId) data.categoryId = parseInt(categoryId);
      if (name) data.name = name;
      if (price) data.price = parseFloat(price);
      if (description) data.description = description;
      if (stock) data.stock = parseInt(stock);
      if (image) data.image = image;

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: "กรุณาระบุฟิลด์ที่ต้องการอัปเดตอย่างน้อย 1 ฟิลด์" });
      }

      const product = await prisma.product.update({
        where: { 
          id: parseInt(id) 
        },
        data,
      });

      res.json({message: "อัปเดตสินค้าสำเร็จ",product,});
    } catch (error) {
      console.error("เกิดข้อผิดพลาดระหว่างการอัปเดตสินค้า:", error);
      res.status(500).json({ error: error.message });
    }
  });
};


exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({message: "ลบสินค้าสำเร็จ",product,});
  } catch (error) {
    console.error("เกิดข้อผิดพลาดระหว่างการลบสินค้า:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.orderBy = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    const product = await prisma.product.findMany({
      take: limit,
      orderBy: { [sort]: order },
      include: { category: true },
    });
    res.json(product);
  } catch (error) {
    res.json(error);
  }
};

exports.filter = async (req, res) => {
  try {
    const { query, category, price } = req.body;

    if (query) {
      const products = await prisma.product.findMany({
        where: {
          name: {
            contains: query,
          },
        },
        include: {
          category: true,
        },
      });
      res.json({message:"success",products});
    }
    if (category) {
      const products = await prisma.product.findMany({
        where: {
          categoryId: {
            in: category.map((id) => Number(id)),
          },
        },
        include: {
          category: true,
        },
      });
      res.json({message:"success",products});
    }
    if (price) {
      const products = await prisma.product.findMany({
        where: {
          price: {
            gte: price,
            lte: price
          },
        },
        include: {
          category: true,
        },
      });
      res.json({message:"success",products});
    }


  } catch (error) {
    res.json("Server Error");
  }
};


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
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

const upload = multer({ storage: storage });
