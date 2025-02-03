import { AlignJustify, LogOut } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const AdminHeader = ({setopen}) => {
  return (
    <header className="flex items-center justify-between bg-background px-4 py-3 border-b ">
      <Button onClick={() => setopen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="flex  flex-1 justify-end">
        <Button className="inline-flex gap-2 tracking-tigher items-center rounded-lg px-4 py-2 text-sm hover:bg-muted hover:text-black font-medium shadow-sm">
          Logout
          <LogOut />
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
