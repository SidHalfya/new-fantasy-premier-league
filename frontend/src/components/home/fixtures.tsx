"use client";
import { fetchData } from "@/services/api/fetchFplData";
import { convertTimeStampToSE } from "@/utils/convertTimeStamp";
import { getClubBadge } from "@/utils/getClubBadge";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const groupFixturesByDay = (fixtures: any[]) => {
  if (!fixtures) {
    return [];
  }
  return fixtures.reduce((total, fixture) => {
    const { kickoff_time, ...rest } = fixture;
    const day = dayjs(kickoff_time).format("DD/MM/YYYY");
    if (!total[day]) {
      total[day] = [];
    }
    total[day].push(fixture);
    return total;
  }, {});
};

export const Fixtures = () => {
  const [gameWeek, setGameWeek] = useState<any>({});

  const fetchGameWeekById = async (id: number) => {
    try {
      await fetchData({ endpoint: "get_gameweek_by_id", id }, setGameWeek);
    } catch (error) {
      console.error("Failed to fetch fixtures:", error);
    }
  };
  useEffect(() => {
    fetchGameWeekById(1);
  }, []);

  return (
    <div className="w-full flex flex-col gap-2">
      {gameWeek && (
        <GameWeek gameWeek={gameWeek} fetchGameWeekById={fetchGameWeekById} />
      )}
    </div>
  );
};

const GameWeek = ({
  gameWeek,
  fetchGameWeekById,
}: {
  gameWeek: any;
  fetchGameWeekById: (id: number) => void;
}) => {
  const deadline = convertTimeStampToSE(gameWeek.deadline_time);
  const combinedFixtures = groupFixturesByDay(gameWeek.fixtures) || [];

  return (
    <div className="h-full flex flex-col items-center overflow-auto w-[50%] self-center">
      <div className="flex justify-center items-center w-full">
        <GameWeekPagination
          direction="left"
          onClick={() => fetchGameWeekById(gameWeek.id - 1)}
          disabled={gameWeek.id === 1}
        />
        <p className="flex flex-col text-center font-medium tracking-wide text-3xl mb-4 mx-12">
          {gameWeek.name}
          <span className="text-lg">{deadline}</span>
        </p>
        <GameWeekPagination
          direction="right"
          onClick={() => fetchGameWeekById(gameWeek.id + 1)}
          disabled={gameWeek.id === 38}
        />
      </div>

      <div className="flex flex-col justify-center w-full">
        <div className="p-2 flex flex-col justify-center items-center">
          {Object.keys(combinedFixtures)?.map((key) => {
            const kickOffTime = combinedFixtures[key][0]?.kickoff_time;
            const formattedKickOffTime =
              dayjs(kickOffTime).format("dddd D MMM YYYY");
            return (
              <div
                className="w-full flex flex-col items-center border border-coffeeLight rounded my-2"
                key={key}
              >
                <p className="flex self-center bg-coffeeDark text-white rounded-b-lg px-4 py-1">
                  {formattedKickOffTime}
                </p>
                <div className="mt-2">
                  {combinedFixtures[key].map((fixture: any) => {
                    const homeTeamName = fixture?.home_team_info?.name;
                    const awayTeamName = fixture?.away_team_info?.name;
                    const kickOffTime = dayjs(fixture.kickoff_time).format(
                      "HH:mm"
                    );
                    return (
                      <div
                        className="w-full flex justify-between items-center py-2 text-center gap-6 hover:bg-[#F1F1F1] rounded-lg cursor-pointer"
                        key={uuidv4()}
                      >
                        <p className="min-w-[140px] tracking-widest font-semibold text-right">
                          {homeTeamName}
                        </p>
                        <ClubBadge clubName={homeTeamName} />
                        <span className="font-medium border px-4 py-2 text-sm tracking-wider">
                          {kickOffTime}
                        </span>
                        <ClubBadge clubName={awayTeamName} />
                        <p className="min-w-[140px] tracking-widest font-semibold text-left">
                          {awayTeamName}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ClubBadge = ({ clubName }: { clubName: string }) => {
  return (
    <img
      src={getClubBadge(clubName) ?? ""}
      width={40}
      height={40}
      alt="club badge"
    />
  );
};

const GameWeekPagination = ({
  direction,
  onClick,
  disabled,
}: {
  direction: string;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`${direction === "right" && "rotate-180"} ${
        disabled ? "opacity-50" : "cursor-pointer hover:opacity-50"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <ArrowCircleLeftIcon style={{ height: 40, width: 40 }} />
    </button>
  );
};
