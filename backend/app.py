import requests
import json
from pprint import pprint
from flask import Flask, jsonify, request, after_this_request
from flask_cors import CORS
from typing import Dict, Any, List
import os

# from utils.format_tools import get_current_gameweek, get_next_gameweek
# from utils.format_tools import get_team_attribute

app = Flask(__name__)
CORS(app)

# base url for all FPL API endpoints
base_url = "https://fantasy.premierleague.com/api/"


endpoints = {
    "bootstrap_static": "bootstrap-static/",
    # Provides static data about the fantasy game, such as player details, team details, and more.
    "bootstrap_static_new": "v7/bootstrap-static/",
    # Provides static data (new version) about the fantasy game, including player details and more.
    "fixtures": "fixtures/",
    # Provides information about upcoming and past fixtures, including match details and kickoff times.
    "element_types": "element-types/",
    # Provides information about player positions (element types) used in the game.
    "elements": "elements/",
    # Fetches data about all players (elements) available in the game, including their current status and statistics.
    "events": "events/",
    # Fetches data about all events (gameweeks) in the game, including their details and deadlines.
    "gameweeks": "gameweeks/",
    # Retrieves data about all gameweeks in the season, including their deadlines and details.
}

specific_endpoints = {
    "element_summary": "element-summary/{element_id}/",
    "event": "event/{event_id}/live/",
    "event_detail": "event/{event_id}/",
    "classic_league": "leagues-classic/{league_id}/standings/",
    "h2h_league": "leagues-h2h/{league_id}/standings/",
    "my_classic_team": "my-team/{user_id}/",
    "picks": "entry/{entry_id}/event/{event_id}/picks/",
    "user": "entry/{user_id}/",
    "manager": "entry/{manager_id}/",
    "fixtures": "fixtures/?event={event_id}",
}


# get data from bootstrap-static endpoint
id_map = {
    "element_summary": "element_id",
    "event": "event_id",
    "event_detail": "event_id",
    "classic_league": "league_id",
    "h2h_league": "league_id",
    "my_classic_team": "user_id",
    "picks": ["entry_id", "event_id"],
    "user": "user_id",
    "manager": "manager_id",
    "fixtures": "event_id",
}

# def _getTeamName(team_id):
#     teams = get_teams()
#     name = None
#     if teams:
#         if name is None:
#             team = next(team for team in teams if team.get("id") == team_id)
#             name = team["name"]
#         else:
#             return name
#     else:
#         return None


def _getFormattedFixtureData(current_fixtures):
    teams = get_teams()
    if not teams:
        return {"error": "Couldn't fetch team data"}

    fixture_data = []

    for fixture in current_fixtures:
        home_team_data = next(
            (team for team in teams if team.get("id") == fixture["team_h"]), None
        )
        away_team_data = next(
            (team for team in teams if team.get("id") == fixture["team_a"]), None
        )

        if home_team_data is None or away_team_data is None:
            continue  # Skip this fixture if one of the teams is not found.

        scoreline = {"home": fixture["team_h_score"], "away": fixture["team_a_score"]}
        difficulty = {
            "home": fixture["team_h_difficulty"],
            "away": fixture["team_a_difficulty"],
        }
        kickoff_time = fixture["kickoff_time"]
        gameweek = fixture["event"]
        is_finished = fixture["finished"]

        home_team_info = {
            "name": home_team_data["name"],
            "icon_url": home_team_data["crest_url"],
        }
        away_team_info = {
            "name": away_team_data["name"],
            "icon_url": away_team_data["crest_url"],
        }

        fixture_data.append(
            {
                "scoreline": scoreline,
                "difficulty": difficulty,
                "kickoff_time": kickoff_time,
                "gameweek": gameweek,
                "is_finished": is_finished,
                "home_team_info": home_team_info,
                "away_team_info": away_team_info,
            }
        )

    return fixture_data


def get_current_fixtures():
    data_dir = "data"
    file_path = os.path.join(data_dir, "fixtures.json")
    if os.path.exists(file_path):
        with open(file_path, "r") as json_file:
            fixture_data = json.load(json_file)
        current_gameweek = get_current_gameweek()
        if fixture_data and current_gameweek:
            current_id = current_gameweek["id"]
            if current_id:
                current_fixtures = fixture_data.get(f"{current_id}")
                # return current_fixtures
                if current_fixtures:
                    formatted_data = _getFormattedFixtureData(current_fixtures)
                    return formatted_data
                else:
                    return {"error": "Could not get current fixtures."}
            else:
                return {"error": "Could not get current gameweek id."}
        else:
            return {"error", "Could not get current gameweek data."}
    else:
        all_gameweeks = get_all_gameweeks()
        if all_gameweeks:
            get_current_fixtures()
        else:
            return {"error", "Could not get current gameweek data."}


def get_current_gameweek():
    data_dir = "data"
    gameweeks_file_path = os.path.join(data_dir, "gameweeks.json")
    current_gameweek_file_path = os.path.join(data_dir, "current_gameweek.json")
    current_gameweek = None
    if os.path.exists(gameweeks_file_path):
        with open(gameweeks_file_path, "r") as gameweeks_json_file:
            gameweek_data = json.load(gameweeks_json_file)
            print("Gameweek data", gameweek_data)
            print("--------------------------------")
            for item in gameweek_data:
                if item["is_current"]:
                    current_gameweek = item
                    break
    else:
        all_gameweeks = get_all_gameweeks()
        if all_gameweeks:
            get_current_gameweek()
        else:
            return {"error", "Could not get current gameweek data."}
    if current_gameweek is None:
        current_gameweek = get_next_gameweek()
    if current_gameweek is not None:
        os.makedirs(data_dir, exist_ok=True)
        # return {"path_doesnt_exist": current_gameweek}
        with open(current_gameweek_file_path, "w") as json_file:
            json.dump(current_gameweek, json_file)
        return current_gameweek
    else:
        return {"error", "Could not get current gameweek data."}


def get_next_gameweek():
    data_dir = "data"
    file_path = os.path.join(data_dir, "gameweeks.json")
    if os.path.exists(file_path):
        with open(file_path, "r") as json_file:
            gameweek_data = json.load(json_file)
            next_gameweek = None
            for item in gameweek_data:
                if item.get("is_next"):
                    next_gameweek = item
                    break
            if next_gameweek is not None:
                return next_gameweek

    else:
        all_gameweeks = get_all_gameweeks()
        if all_gameweeks:
            get_next_gameweek()
        else:
            return {"error", "Could not get next gameweek data."}


def get_all_gameweeks():
    data_dir = "data"
    file_path = os.path.join(data_dir, "gameweeks.json")
    # if os.path.exists(file_path):
    #     with open(file_path, 'r') as json_file:
    #         gameweek_data = json.load(json_file)
    #     return gameweek_data
    # else:
    os.makedirs(data_dir, exist_ok=True)
    url = "https://fantasy.premierleague.com/api/bootstrap-static/"
    response = requests.get(url)
    data = response.json()

    gameweek_data = data["events"]
    # current_gameweek = get_current_gameweek(gameweek_data)
    # next_gameweek = get_next_gameweek(gameweek_data)
    with open(file_path, "w") as json_file:
        json.dump(gameweek_data, json_file)

    return gameweek_data


def get_teams():
    data_dir = "data"
    file_path = os.path.join(data_dir, "teams.json")

    if os.path.exists(file_path):
        with open(file_path, "r") as json_file:
            teams_data = json.load(json_file)
        return teams_data
    else:
        os.makedirs(data_dir, exist_ok=True)
        url = "https://fantasy.premierleague.com/api/bootstrap-static/"
        response = requests.get(url)
        data = response.json()

        teams_data = data["teams"]
        elements = data["elements"]

        players_by_team = {}
        for player in elements:
            team_id = player["team"]
            if team_id not in players_by_team:
                players_by_team[team_id] = []
            players_by_team[team_id].append(player)

        for team in teams_data:
            team["players"] = players_by_team.get(team["id"], [])
            team["crest_url"] = (
                f"https://fantasy.premierleague.com/dist/img/badges/badge_{team['id']}_80.png"
            )
            for player in team["players"]:
                player["icon_url"] = (
                    f"https://fantasy.premierleague.com/dist/img/default{player['element_type']}.png"
                )

        with open(file_path, "w") as json_file:
            json.dump(teams_data, json_file)

        return teams_data


def get_fixtures():
    data_dir = "data"
    file_path = os.path.join(data_dir, "fixtures.json")

    if os.path.exists(file_path):
        with open(file_path, "r") as json_file:
            fixtures_data = json.load(json_file)
        return fixtures_data
    else:
        os.makedirs(data_dir, exist_ok=True)
        url = "https://fantasy.premierleague.com/api/fixtures/"
        response = requests.get(url)
        fixtures = response.json()

        fixtures_by_gameweek = {}

        for fixture in fixtures:
            gameweek = fixture["event"]
            if gameweek not in fixtures_by_gameweek:
                fixtures_by_gameweek[gameweek] = []
            fixtures_by_gameweek[gameweek].append(fixture)

        with open(file_path, "w") as json_file:
            json.dump(fixtures_by_gameweek, json_file)

        return fixtures_by_gameweek


@app.route("/api/endpoint", methods=["GET", "POST"])
def getFplData():
    @after_this_request
    def add_header(response):
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

    endpoint = request.args.get("endpoint")
    if not endpoint:
        return jsonify({"error": "No endpoint was provided."})
    elif endpoint == "fixtures":
        fixtures = get_fixtures()
        return fixtures
    elif endpoint == "teams":
        teams = get_teams()
        return teams
    elif endpoint == "gameweeks":
        game_weeks = get_all_gameweeks()
        return game_weeks
    elif endpoint == "current_gameweek":
        current_game_week = get_current_gameweek()
        return current_game_week
    elif endpoint == "current_fixtures":
        current_fixtures = get_current_fixtures()
        return current_fixtures
    else:
        print("Endpoint not found", endpoint)
        return jsonify({"error": "Data is not ready yet."})

    # id = request.args.get('id')
    # if not endpoint:
    #     return jsonify({"error": "No endpoint provided"})
    # if id:
    #     specific_endpoint = specific_endpoints[endpoint]
    #     id_key = id_map[endpoint]
    #     full_url = specific_endpoint.format(**{id_key: id})
    #     data = requests.get(base_url+full_url).json()
    #     return jsonify({"data": data, "request_params": {"endpoint": specific_endpoint, "id": id}})
    # else:
    #     full_url = endpoints[endpoint]
    #     data = requests.get(base_url+full_url).json()
    #     return jsonify({"data": data, "request_params": {"endpoint": endpoint, "id": id}})


@app.route("/", methods=["GET"])
def home():
    @after_this_request
    def add_header(response):
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

    # data = request.json
    # return jsonify(data)
    # r = requests.get(base_url+'bootstrap-static/').json()
    # return r


if __name__ == "__main__":
    app.run(debug=True)
