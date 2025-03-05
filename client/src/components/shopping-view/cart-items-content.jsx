import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  fetchCartItems,
  updateCartQuantity,
} from "@/store/shop-slice/cart-slice";
import { useToast } from "@/hooks/use-toast";

const UserCartItemsContent = ({ cartItems }) => {
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();

  function handleUpdateQuantity(getCartItem, typeofAction) {
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeofAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product Quantity Updated",
        });
      }
    });
  }
  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product Deleted From Cart",
        });
      }
    });
  }
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="object-cover w-20 h-20 rounded"
      />
      <div className="flex-1 ">
        <h2 className="text-lg font-medium">{cartItems?.title}</h2>
        <p className="mt-2 ">
          {" "}
          ${cartItems?.salePrice > 0
            ? cartItems?.salePrice
            : cartItems?.price}{" "}
        </p>

        <div className="flex items-center gap-2 mt-3 ">
          <Button
            className="w-6 h-6 rounded-full"
            variant="outline"
            size="icon"
            disabled={cartItems?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItems, "minus")}
          >
            <Minus className="w-3 h-3 " />
            <span className="sr-only">Decrease</span>
          </Button>
          <span>{cartItems?.quantity}</span>
          <Button
            className="w-6 h-6 rounded-full"
            variant="outline"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItems, "plus")}
          >
            <Plus className="w-3 h-3 " />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-medium">
          $
          {(
            (cartItems?.salePrice > 0
              ? cartItems?.salePrice
              : cartItems?.price) * cartItems?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItems)}
          className="mt-1 text-red-500 cursor-pointer "
          size={19}
        />
      </div>
    </div>
  );
};

export default UserCartItemsContent;
