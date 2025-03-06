const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dscp82uqg",
  api_key: "176164963414942",
  api_secret: "x3ubSUHeqYgS7kcAPpHDsou_Igg",
});

// Set up Multer (store files in memory)
const storage = new multer.memoryStorage();

// Stream Upload Function
async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
