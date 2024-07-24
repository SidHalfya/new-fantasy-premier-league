"use client";
import Link from "next/link";
import { SideNavButton } from "./sidenavbutton";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";

const ROUTES = [
  { title: "Home", href: "/", icon: "home" as const, id: uuidv4() },
  {
    title: "Journal",
    href: "/journal",
    icon: "journal" as const,
    id: uuidv4(),
  },
  {
    title: "Habits",
    href: "/habits",
    icon: "habits" as const,
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
      <Link className="flex flex-col items-center p-4" href="/">
        <WbTwilightIcon
          className="text-coffeeDark"
          style={{ height: 100, width: 100 }}
        />
        <div className="flex font-avenir text-2xl tracking-wide">
          <p className="font-normal text-coffeeDark">
            Mind{" "}
            <span className="text-coffeeDarkest font-semibold">
              Hack
            </span>
          </p>
        </div>
      </Link>
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
