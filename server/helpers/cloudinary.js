const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { Readable } = require("stream");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dscp82uqg",
  api_key: "176164963414942",
  api_secret: "x3ubSUHeqYgS7kcAPpHDsou_Igg",
});

// Set up Multer (store files in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Stream Upload Function
async function imageUploadUtil(file) {
  try {
    if (!file || !file.buffer) {
      throw new Error("Invalid file: File buffer is missing");
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary Upload Error:", error);
            reject(error);
          } else {
            console.log("✅ Upload Success:", result.secure_url);
            resolve(result);
          }
        }
      );
      
      // Convert file buffer to a readable stream and pipe to Cloudinary
      Readable.from(file.buffer).pipe(uploadStream);
    });
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error);
    throw error;
  }
}

module.exports = { upload, imageUploadUtil };
