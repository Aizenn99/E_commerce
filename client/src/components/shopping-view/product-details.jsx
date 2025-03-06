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
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop-slice/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop-slice/products-slice";

const ProductDetailsDialog = ({ open, setopen, productDetails }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  function handleDialogClose() {
    setopen(false);
    dispatch(setProductDetails());
  }
  function handleAddToCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        quantity: 1,
        productId: getCurrentProductId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product Added To Cart",
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent
        className="flex flex-col lg:flex-row gap-8 sm:p-12 max-w-[80vw] lg:max-w-[60vw]"
        aria-describedby="product-description"
      >
        {/* Left: Product Image */}
        <div className="relative w-full overflow-hidden rounded-lg lg:w-1/2">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="object-cover w-full aspect-square"
          />
          {productDetails?.salePrice > 0 ? (
            <Badge className="absolute bg-red-500 top-2 left-2 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col w-full gap-6 lg:w-1/2">
          <DialogTitle className="text-3xl font-medium ">
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
              <p className="text-2xl text-primary">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div>
            <Button
              onClick={() => handleAddToCart(productDetails?._id)}
              className="w-full"
            >
              Add To Cart
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="mb-4 text-xl font-medium">Reviews</h2>
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
                  <p className="mt-2 text-muted-foreground ">
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
