import React from "react";
import { useAuth } from "@/app/_context/AuthContext";
import Profile from "./profile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

const Navbar = () => {
  const { profile, logOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full px-5 py-5 h-20 border-b bg-white">
      <nav className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">Realestate</h1>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Profile />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-1 mt-5">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button onClick={logOut} variant={"secondary"} className="w-full">Log Out</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
