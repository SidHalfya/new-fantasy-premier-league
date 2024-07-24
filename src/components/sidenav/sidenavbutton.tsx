import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { FunctionComponent } from "react";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

interface SideNavButtonProps {
  route: {
    title: string;
    href: string;
    icon: keyof typeof iconMap;
    id: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

interface SideNavIconProps {
  icon: keyof typeof iconMap;
}

const iconMap = {
  home: HomeIcon,
  journal: EventNoteIcon,
  habits: FitnessCenterIcon,
  settings: SettingsIcon,
  logout: LogoutIcon,
};

const SideNavIcon: React.FC<SideNavIconProps> = ({ icon }) => {
  const IconComponent = iconMap[icon];
  return <IconComponent />;
};

export const SideNavButton: React.FC<SideNavButtonProps> = ({
  route,
  isSelected,
  onClick,
}) => {
  return (
    <Link
      href={route.href}
      key={route.href}
      className={`flex gap-4 items-center p-1 rounded-lg ${
        isSelected ? "bg-coffeeLight" : "hover:bg-coffeeLight cursor-pointer"
      }`}
      onClick={onClick}
    >
      <SideNavIcon icon={route.icon} />

      <>
        <p className="text-lg">{route.title}</p>
      </>
    </Link>
  );
};
