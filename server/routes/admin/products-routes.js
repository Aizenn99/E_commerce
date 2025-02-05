const express = require("express");
const {
  handleImageUpload,
  addProduct,editProduct,DeleteProduct,fetchProduct
} = require("../../controllers/admin/products-controller");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add",addProduct)
router.get("/get",fetchProduct)
router.put("/edit/:id",editProduct)
router.delete("/delete",DeleteProduct)

module.exports = router;
 