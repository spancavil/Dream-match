import { Player } from '@/interfaces/player'

// Define action types as an enum to ensure consistency and prevent typos
export enum ActionTypes {
    ADD_PLAYER_TEAM = 'add_player_team',
    REMOVE_PLAYER_TEAM = 'remove_player_team',
    SET_PLAYERS = 'set_players',
    SET_TOP_SCORERS = 'set_top_scorers',
    SET_TEAM_NAME = 'set_team_name',
    ADD_TEAM = 'add_team',
    REMOVE_TEAM = 'remove_team',
}

// Define type for each action type to enforce type safety
export type AddPlayerTeamAction = {
    type: ActionTypes.ADD_PLAYER_TEAM
    payload: {
        playerId: number
        teamId: number
    }
}

export type RemovePlayerTeamAction = {
    type: ActionTypes.REMOVE_PLAYER_TEAM
    payload: {
        playerId: number
        teamId: number
    }
}

export type SetPlayersAction = {
    type: ActionTypes.SET_PLAYERS
    payload: Player[]
}

export type SetTopScorers = {
    type: ActionTypes.SET_TOP_SCORERS
    payload: number[]
}

export type SetTeamName = {
    type: ActionTypes.SET_TEAM_NAME
    payload: {
        teamId: number
        teamName: string
    }
}

export type AddTeam = {
    type: ActionTypes.ADD_TEAM
}

export type RemoveTeam = {
    type: ActionTypes.REMOVE_TEAM
    payload: { teamId: number }
}

// Define a union type Actions to represent all possible action types
export type Actions =
    | AddPlayerTeamAction
    | RemovePlayerTeamAction
    | SetPlayersAction
    | SetTopScorers
    | SetTeamName
    | AddTeam
    | RemoveTeam
