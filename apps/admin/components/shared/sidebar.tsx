"use client";

import { sidebardata } from "@/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col gap-10 bg-white border-r  mt-20 py-5 w-56 h-screen">
      <h1 className="font-light px-7 text-gray-400">Navigations</h1>
      <div className="flex flex-col  px-5">
        {sidebardata.map(({ icon: Icon, ...item }, index) => (
          <Link
            href={item.link}
            key={index}
            className={cn(
              "flex items-center px-2 py-3 hover:bg-slate-300 rounded-lg hover:text-[#222222] transition-all duration-200",
              pathname === item.link ? "text-[#222222]" : "text-gray-400"
            )}
          >
            <Icon
              className={cn(
                "w-5 h-5 mr-2 hover:text-blue-500",
                pathname === item.link && "text-blue-500"
              )}
            />
            {item.title}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
