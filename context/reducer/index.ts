import { Player } from '@/interfaces/player'
import { ActionTypes, Actions } from '../actions'
import { MAX_TEAMS, MAX_TEAM_PLAYERS } from '@/constants/team'
import { Team } from '@/interfaces/team'
import { Reducer } from 'react'

export type State = { teams: Team[]; players: Player[]; topScorers: number[] }

export const initialState: State = {
    teams: [],
    players: [],
    topScorers: [],
}

export const reducer: Reducer<State, Actions> = (
    state: State,
    action: Actions
) => {
    switch (action.type) {
        case ActionTypes.SET_TEAM_NAME:
            const stateUpdated = { ...state }

            for (const team of stateUpdated.teams) {
                if (team.teamId === action.payload.teamId)
                    team.teamName = action.payload.teamName
            }
            return stateUpdated

        case ActionTypes.SET_TOP_SCORERS:
            return {
                ...state,
                topScorers: action.payload,
            }

        case ActionTypes.SET_PLAYERS:
            // Return a new state with the characters array updated
            return {
                ...state,
                players: [...state.players, ...action.payload],
            }

        case ActionTypes.ADD_PLAYER_TEAM: {
            const stateUpdated = { ...state }

            for (const team of stateUpdated.teams) {
                if (
                    team.teamId === action.payload.teamId &&
                    team.players.length < MAX_TEAM_PLAYERS
                ) {
                    //1. Mark player as unavailable
                    const playersUpdated = state.players.map((player) => {
                        if (player.player_key === action.payload.playerId)
                            player.available = false
                        return player
                    })
                    stateUpdated.players = playersUpdated
                    //2. Add Player to team
                    const player = state.players.find(
                        (player) =>
                            player.player_key === action.payload.playerId
                    )
                    team.players.push(player as Player)
                }
            }

            return stateUpdated
        }

        case ActionTypes.REMOVE_PLAYER_TEAM: {
            const stateUpdated = { ...state }

            for (const team of stateUpdated.teams) {
                if (team.teamId === action.payload.teamId) {
                    //1. Mark player as available
                    stateUpdated.players = state.players.map((player) => {
                        if (player.player_key === action.payload.playerId)
                            player.available = true
                        return player
                    })
                    //2. Remove player from team
                    team.players = team.players.filter(
                        (player) =>
                            player.player_key !== action.payload.playerId
                    )
                }
            }

            return stateUpdated
        }

        case ActionTypes.ADD_TEAM: {
            const stateUpdated = { ...state }
            if (state.teams.length < MAX_TEAMS) {
                stateUpdated.teams.push({
                    teamId: stateUpdated.teams.length + 1,
                    teamName: '',
                    players: [],
                })
            }
            return stateUpdated
        }

        case ActionTypes.REMOVE_TEAM: {
            const stateUpdated = { ...state }
            const teamToRemove = state.teams.find(team=> team.teamId === action.payload.teamId) as Team
            stateUpdated.players = state.players.map((player) => {
                for (const playerTeam of teamToRemove.players) {
                    if (player.player_key === playerTeam.player_key)
                        player.available = true
                }
                return player
            })

            stateUpdated.teams = state.teams.filter(
                (team) => team.teamId !== action.payload.teamId
            )
            return stateUpdated
        }

        default:
            return state
    }
}
