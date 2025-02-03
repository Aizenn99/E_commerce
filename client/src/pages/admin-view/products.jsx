import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Description } from "@radix-ui/react-toast";
import React, { Fragment, useState } from "react";

const initialFormData = {
  image: null,
  title: "",
  Description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProductA, setopenCreateProductA] = useState(false);
  const [formData, setformData] = useState(initialFormData);
  const [ImageFIle, setImageFIle] = useState(null);
  const [ImageUploadedURL, setImageUploadedURL] = useState("");

  function onSubmit() {}
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end ">
        <Button
          onClick={() => {
            setopenCreateProductA(true);
          }}
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-col-4 "></div>
      <Sheet
        open={openCreateProductA}
        onOpenChange={() => {
          setopenCreateProductA(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle  >Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            ImageFIle={ImageFIle}
            setImageFIle={setImageFIle}
            ImageUploadedURL={ImageUploadedURL}
            setImageUploadedURL={setImageUploadedURL}
          />
          <div className="py-6 ">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setformData}
              buttonText="Add"
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
