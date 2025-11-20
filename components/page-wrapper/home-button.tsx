"use client";

import { SidebarMenuButton } from "../ui/sidebar";
import { Button } from "../ui/button";
import Link from "next/link";
import { Home } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

const HomeButton = () => {
  const { setOpenMobile } = useSidebar(); // هذا يغلق sidebar على الموبايل

  return (
    <SidebarMenuButton tooltip="Home" asChild>
      <Button variant="ghost" className="w-full justify-start gap-2" asChild>
        <Link href="/topic" onClick={() => setOpenMobile(false)}>
          <Home />
          <span>Home</span>
        </Link>
      </Button>
    </SidebarMenuButton>
  );
};

export default HomeButton;
