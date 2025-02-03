import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

const ProductImageUpload = ({
  ImageFIle,
  setImageFIle,
  ImageUploadedURL,
  setImageUploadedURL,
}) => {
  const inputRef = useRef(null);

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDropOver(event) {
    event.preventDefault();

    const DroppedFile = event.dataTransfer.files?.[0];
    if (setImageFIle) setImageFIle(DroppedFile);
  }

  function handleRemoveImage() {
    setImageFIle(null);
    if (inputRef.current) {
      inputRef.current.value = ""; 
    }
  }

  function handelImageFileChange(event) {
    console.log(event.target.files);
    const selectedFiles = event.target.files?.[0];
    if (selectedFiles) setImageFIle(selectedFiles);
  }
  return (
    <div className="w-full max-w-md mx-auto mt-4 ">
      <Label className="text-lg mb-2  justify-center flex items-center">
        Upload Image{" "}
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDropOver}
        className="border-2  border-dashed rounded-lg p-4"
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
            <p className="text-sm ">{ImageFIle.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground "
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4 " />
              <span className="sr-only">Remove File</span>{" "}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
