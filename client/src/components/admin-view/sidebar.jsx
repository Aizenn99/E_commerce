import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Shirt, ShoppingCart, UserPen } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const AdminSideBarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <UserPen />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Shirt />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingCart />,
  },
];

function MenuItems({ setopen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2 ">
      {AdminSideBarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setopen ? setopen(false) : null;
          }}
          className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted "
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}
const AdminSideBar = ({ open, setopen }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setopen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col  h-full">
            <SheetHeader className="border-b ">
              <SheetTitle className="flex gap-2 mb-6 ">
                <UserPen />
                <span> Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setopen={setopen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background lg:flex p-6  ">
        <div className="flex items-center gap-2 ">
          <UserPen className="cursor-pointer" />
          <h1
            onClick={() => navigate("/admin/dashboard")}
            className="text-xl tracking-tighter font-medium  cursor-pointer "
          >
            Admin panel
          </h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSideBar;
