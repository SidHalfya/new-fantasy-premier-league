import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { setSourceMapsEnabled } from "process";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface Item {
  label: string;
  onClick?: () => void;
  href?: string;
}

export default function BasicMenu({
  items,
  isNav,
}: {
  items: Item[];
  isNav?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  const outsideRef = useOutsideClick(() => setOpen(false), 300);

  return (
    <div className="relative">
      <button
        id="basic-button"
        className="flex self-center mt-2"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </button>
      {!open && (
        <div
          className="absolute top-[28px] right-0 bg-white p-4 rounded flex flex-col gap-4"
          ref={outsideRef}
          id="basic-menu"
        >
          {items.map((item) => (
            <div key={uuidv4()}>
              {isNav ? (
                <Link href={item.href || ""}>{item.label}</Link>
              ) : (
                <MenuItem
                  onClick={() => {
                    item.onClick && item.onClick();
                    setOpen(false);
                  }}
                >
                  {item.label}
                </MenuItem>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
