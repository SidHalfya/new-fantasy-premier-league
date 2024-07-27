import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import SportsIcon from '@mui/icons-material/Sports';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import GroupsIcon from '@mui/icons-material/Groups';
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
  team: GroupsIcon,
  gameWeek: SportsIcon,
  players: SportsGymnasticsIcon,
  leaderboard: LeaderboardIcon,
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
