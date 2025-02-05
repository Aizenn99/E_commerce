const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dscp82uqg",
  api_key: "176164963414942",
  api_secret: "x3ubSUHeqYgS7kcAPpHDsou_Igg",
});

const storage =  multer.memoryStorage();


async function imageUploadUtils(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage  });

module.exports = {upload,  imageUploadUtils };
