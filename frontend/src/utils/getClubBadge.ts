const clubBadges: { [key: string]: string } = {
  Arsenal:
    "https://resources.premierleague.com/premierleague/badges/50/t3@x2.png",
  "Aston Villa":
    "https://resources.premierleague.com/premierleague/badges/50/t7@x2.png",
  Bournemouth:
    "https://resources.premierleague.com/premierleague/badges/50/t91@x2.png",
  Brentford:
    "https://resources.premierleague.com/premierleague/badges/50/t94@x2.png",
  Brighton:
    "https://resources.premierleague.com/premierleague/badges/50/t36@x2.png",
  Chelsea:
    "https://resources.premierleague.com/premierleague/badges/50/t8@x2.png",
  "Crystal Palace":
    "https://resources.premierleague.com/premierleague/badges/50/t31@x2.png",
  Everton:
    "https://resources.premierleague.com/premierleague/badges/50/t11@x2.png",
  Fulham:
    "https://resources.premierleague.com/premierleague/badges/50/t54@x2.png",
  Ipswich:
    "https://resources.premierleague.com/premierleague/badges/50/t40@x2.png",
  Leicester:
    "https://resources.premierleague.com/premierleague/badges/50/t13@x2.png",
  Liverpool:
    "https://resources.premierleague.com/premierleague/badges/50/t14@x2.png",
  "Man City":
    "https://resources.premierleague.com/premierleague/badges/50/t43@x2.png",
  "Man Utd":
    "https://resources.premierleague.com/premierleague/badges/50/t1@x2.png",
  Newcastle:
    "https://resources.premierleague.com/premierleague/badges/50/t4@x2.png",
  "Nott'm Forest":
    "https://resources.premierleague.com/premierleague/badges/50/t17@x2.png",
  Southampton:
    "https://resources.premierleague.com/premierleague/badges/50/t20@x2.png",
  Spurs:
    "https://resources.premierleague.com/premierleague/badges/50/t6@x2.png",
  "West Ham":
    "https://resources.premierleague.com/premierleague/badges/50/t21@x2.png",
  Wolves:
    "https://resources.premierleague.com/premierleague/badges/50/t39@x2.png",
};

export const getClubBadge = (clubName?: string) => {
  if (!clubName) {
    return null;
  }
  return clubBadges[clubName];
};
