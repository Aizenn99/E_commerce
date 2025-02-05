import React, { useState, useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

const ProductImageUpload = ({
  ImageFIle,
  setImageFIle,
  ImageUploadedURL,
  setImageUploadedURL,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDragEnter() {
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDropOver(event) {
    event.preventDefault();
    setIsDragging(false);
    const DroppedFile = event.dataTransfer.files?.[0];
    if (DroppedFile) setImageFIle(DroppedFile);
  }

  function handleRemoveImage() {
    setImageFIle(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function uploadImageToCoudinary() {
    if (!ImageFIle) return;
  
    const data = new FormData();
    data.append("my_file", ImageFIle);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );
      if (response?.data?.success) {
        setImageUploadedURL(response.data.result.url);
      } else {
        console.error("Failed to upload image", response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
      } else {
        console.error("Error uploading image:", error.message);
      }
    }
  }
  
  useEffect(() => {
    if (ImageFIle) {
      uploadImageToCoudinary();
    }
  }, [ImageFIle]);

  function handelImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        setImageFIle(selectedFile);
      } else {
        alert("Please upload a valid image file.");
      }
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-4 ">
      <Label className="text-lg mb-2 justify-center flex items-center">
        Upload Image
      </Label>
      <div
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDropOver}
        className={`border-2 border-dashed rounded-lg p-4 ${isDragging ? 'border-blue-500' : ''}`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handelImageFileChange}
        />
        {!ImageFIle ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2 " />
            <span>Drag & Drop or Click to Upload image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2 " />
            </div>
            <p className="text-sm">{ImageFIle.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
