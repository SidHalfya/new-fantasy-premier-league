"use client";
import { fetchData } from "@/services/api/fetchFplData";
import { convertTimeStampToSE } from "@/utils/convertTimeStamp";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export const Fixtures = () => {
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [currentGameWeek, setCurrentGameWeek] = useState({});

  const fetchFixtures = async () => {
    try {
      await fetchData({ endpoint: "current_fixtures" }, setFixtures);
      await fetchData({ endpoint: "current_gameweek" }, setCurrentGameWeek);
      // setFixtures(data);
    } catch (error) {
      console.error("Failed to fetch fixtures:", error);
    }
  };

  useEffect(() => {
    fetchFixtures();
    // fetchTeams();
  }, []);

  return (
    <div className="w-full flex flex-col gap-2">
      {fixtures.length > 0 && (
        <CurrentGameWeek
          currentFixtures={fixtures}
          currentGameWeek={currentGameWeek}
        />
      )}
    </div>
  );
};

const groupFixturesByDay = (fixtures: any[]) => {
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

const CurrentGameWeek = ({
  currentFixtures,
  currentGameWeek,
}: {
  currentFixtures: any[];
  currentGameWeek: any;
}) => {
  const deadline = convertTimeStampToSE(currentGameWeek.deadline_time);
  const combinedFixtures = groupFixturesByDay(currentFixtures);
  console.log("combinedFixtures", combinedFixtures);
  return (
    <div className="w-full h-full flex flex-col items-center">
      <p className="font-medium text-2xl mb-4">
        {currentGameWeek.name}: {deadline}
      </p>

      <div className="w-2/3 flex flex-col justify-center border border-coffeeDark rounded-lg">
        <div className="p-2 flex flex-col justify-center items-center">
          {Object.keys(combinedFixtures)?.map((key) => {
            const kickOffTime = combinedFixtures[key][0]?.kickoff_time;
            const formattedKickOffTime =
              dayjs(kickOffTime).format("ddd D MMM YYYY");
            return (
              <div
                className="w-full flex flex-col items-center border-t border-coffeeLight my-2"
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
                      <div className="w-[80%] flex justify-between items-center py-2 text-center gap-6">
                        <p className="min-w-[140px] tracking-widest font-semibld">
                          {homeTeamName}
                        </p>
                        {/* <img src={fixture?.home_team_info?.icon_url} className="h-8 w-8" /> */}
                        <span className="font-medium border px-4 py-2 text-sm tracking-wider">
                          {kickOffTime}
                        </span>
                        {/* <img src={fixture?.away_team_info?.icon_url} className="h-8 w-8" /> */}
                        <p className="min-w-[140px] tracking-widest font-semibld">
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
