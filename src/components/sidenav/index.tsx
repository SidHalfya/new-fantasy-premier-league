"use client";
import { SideNavButton } from "./sidenavbutton";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ROUTES = [
  { title: "Home", href: "/", icon: "home" as const, id: uuidv4() },
  {
    title: "Journal",
    href: "/journal",
    icon: "journal" as const,
    id: uuidv4(),
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "settings" as const,
    id: uuidv4(),
  },
  { title: "Logout", href: "/logout", icon: "logout" as const, id: uuidv4() },
];
export default function SideNav() {
  const [selectedTab, setSelectedTab] = useState(ROUTES[0].id);
  return (
    <div className="flex h-full flex-col px-3 py-4 bg-cream">
      {/* <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-40"
        href="/"
      >
        <div className="w-32 md:w-40">
          <p className="text-xl">Home</p>
        </div>
      </Link> */}
      <div className="flex grow flex-col gap-8 mx-4 mt-12">
        {ROUTES.map((route) => (
          <SideNavButton
            key={route.id}
            route={route}
            isSelected={selectedTab === route.id}
            onClick={() => setSelectedTab(route.id)}
          />
        ))}
      </div>
    </div>
  );
}
