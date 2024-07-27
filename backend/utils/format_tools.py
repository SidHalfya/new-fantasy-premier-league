# from typing import Dict, Any, List

# def get_current_gameweek(game_weeks):
#     current_gameweek = [item for item in game_weeks if item.is_current]
#     data = {}
#     data["name"] = current_gameweek.name
#     data["deadline"] = current_gameweek.deadline_time
#     data["id"] = current_gameweek.id
#     data["is_finished"] = current_gameweek.finished
#     return data

# def get_next_gameweek(game_weeks):
#     current_gameweek = [item for item in game_weeks if item.is_next]
#     data = {}
#     data["name"] = current_gameweek.name
#     data["deadline"] = current_gameweek.deadline_time
#     data["id"] = current_gameweek.id
#     return data

# def get_team_attribute(teams, team_id, attribute):
#     team = next(team for team in teams if team.get("id") == team_id)
#     return team[attribute]