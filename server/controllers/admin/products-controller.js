const { imageUploadUtils } = require("../../helpers/cloudinary");
const product = require("../../models/product");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await imageUploadUtils(url);

    res.json({
      success: true,
      message: "Image uploaded successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message,
    });
  }
};

//add a new product

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      saleprice,
      totalstock,
    } = req.body;

    const NewlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      saleprice,
      totalstock,
    });

    await NewlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: NewlyCreatedProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured add",
    });
  }
};

//fetch all product

const fetchProduct = async (req, res) => {
  try {
    const listOfProduct = await product.find({});
    res.status(200).json({
      success: true,
      data: listOfProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured fetch  ",
    });
  }
};

//edit a product

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      saleprice,
      totalstock,
    } = req.body;
    const findProduct = await product.findById(id);

    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "product Not Found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.saleprice = saleprice || findProduct.saleprice;
    findProduct.totalstock = totalstock || findProduct.totalstock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete a product

const DeleteProduct = async (req, res) => {
  try {
    const {id} = req.params
    const Product = await product.findById(id);
    if(!Product) return res.status(404).json({
      success:false,
      message:"Product Not Found"
    })

  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchProduct,
  DeleteProduct,
  editProduct,
};
