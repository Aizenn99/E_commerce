import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";

const ProductDetailsDialog = ({ open, setopen, productDetails }) => {
  return (
    <Dialog open={open} onOpenChange={(value) => setopen(value)}>
      <DialogContent
        className="flex flex-col lg:flex-row gap-8 sm:p-12 max-w-[80vw] lg:max-w-[60vw]"
        aria-describedby="product-description"
      >
        {/* Left: Product Image */}
        <div className="relative overflow-hidden rounded-lg w-full lg:w-1/2">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
          {productDetails?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          <DialogTitle
            className="text-3xl font-medium
          "
          >
            {productDetails?.title || "Product Details"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {productDetails?.description || "No description available."}
          </DialogDescription>
          <div className="flex items-center justify-between ">
            <p
              className={`text-2xl  text-primary ${
                productDetails?.salePrice > 0 ? "line-through  " : ""
              } `}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl  text-primary">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div>
            <Button className="w-full">Add To Cart</Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-medium  mb-4">Reviews</h2>
            <div className="grid gap-6 ">
              <div className="flex gap-4 ">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>HK</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-medium">Het Kalriya</h3>
                  </div>
                  <div className="flex items-center mt-2 gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 " />
                  </div>
                  <p className="text-muted-foreground mt-2 ">
                    This is an awesome product
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
