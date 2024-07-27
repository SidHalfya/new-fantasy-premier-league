const fplEndpoints: { [key: string]: string } = {
  //   bootstrap_static: "https://fantasy.premierleague.com/api/bootstrap-static/", TODO: Not used for now.
  // Provides static data about the fantasy game, such as player details, team details, and more.
  bootstrap_static:
    "https://fantasy.premierleague.com/api/v7/bootstrap-static/",
  // Provides static data (new version) about the fantasy game, including player details and more.
  fixtures: "https://fantasy.premierleague.com/api/fixtures/",
  // Provides information about upcoming and past fixtures, including match details and kickoff times.
  element_summary:
    "https://fantasy.premierleague.com/api/element-summary/{element_id}/",
  // Retrieves detailed statistics for a specific player (element). Replace {element_id} with the player ID.
  element_types: "https://fantasy.premierleague.com/api/element-types/",
  // Provides information about player positions (element types) used in the game.
  elements: "https://fantasy.premierleague.com/api/elements/",
  // Fetches data about all players (elements) available in the game, including their current status and statistics.
  event: "https://fantasy.premierleague.com/api/event/{event_id}/live/",
  // Retrieves live data for a specific event (gameweek). Replace {event_id} with the event ID.
  event_detail: "https://fantasy.premierleague.com/api/event/{event_id}/",
  // Retrieves detailed information about a specific event (gameweek), including fixtures and deadlines.
  events: "https://fantasy.premierleague.com/api/events/",
  // Fetches data about all events (gameweeks) in the game, including their details and deadlines.
  gameweeks: "https://fantasy.premierleague.com/api/gameweeks/",
  // Retrieves data about all gameweeks in the season, including their deadlines and details.
  classic_league:
    "https://fantasy.premierleague.com/api/leagues-classic/{league_id}/standings/",
  // Gets standings (rankings) for a classic league. Replace {league_id} with the league ID.
  h2h_league:
    "https://fantasy.premierleague.com/api/leagues-h2h/{league_id}/standings/",
  // Gets standings (rankings) for a head-to-head (H2H) league. Replace {league_id} with the league ID.
  my_classic_team: "https://fantasy.premierleague.com/api/my-team/{user_id}/",
  // Retrieves information about a user's classic fantasy team. Replace {user_id} with the user ID.
  // // picks:
  // //   "https://fantasy.premierleague.com/api/entry/{entry_id}/event/{event_id}/picks/",
  // Gets a user's player selections for a specific event. Replace {entry_id} with the user's entry ID and {event_id} with the event ID.
  user: "https://fantasy.premierleague.com/api/entry/{user_id}/",
  // Fetches data about a specific user's fantasy team. Replace {user_id} with the user ID.
  manager: "https://fantasy.premierleague.com/api/entry/{manager_id}/",
};

const endpointIdMap: { [key: string]: string } = {
  element_summary: "element_id",
  event: "event_id",
  event_detail: "event_id",
  classic_league: "league_id",
  h2h_league: "league_id",
  my_classic_team: "user_id",
  // picks: "event_id",
  user: "user_id",
  manager: "manager_id",
};

export const fetchEndPoint = (endpoint: string, id?: string) => {
  if (!id) {
    return fplEndpoints[endpoint];
  }
  if (endpointIdMap[endpoint]) {
    return fplEndpoints[endpoint].replace(`{${endpointIdMap[endpoint]}}`, id);
  }
  return fplEndpoints[endpoint];
};
