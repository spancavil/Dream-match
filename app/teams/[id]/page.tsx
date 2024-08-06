'use client'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import PlayerList from '@/components/PlayerList'
import { ActionTypes } from '@/context/actions'
import { useAppContext } from '@/context/useAppContext'
import { getPlayerDetails } from '@/services/getPlayersDetails'
import { getTopScorers } from '@/services/getTopScorers'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {
    params: {id: string}
}

const CreateTeam = ({params}: Props) => {
    const { dispatch, state } = useAppContext()
    const router = useRouter()
    const {id} = params
    const teamId = Number(id)
    const teamNameState = state.teams[teamId - 1].teamName
    const teamPlayers = state.teams[teamId - 1].players  
    const [teamName, setTeamName] = useState(teamNameState)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!state.players.length) {
            try {
                ;(async () => {
                    setLoading(true)
                    const topScorers = await getTopScorers()
                    dispatch({
                        type: ActionTypes.SET_TOP_SCORERS,
                        payload: topScorers,
                    })
                    const playerDetails = await getPlayerDetails(
                        10,
                        0,
                        topScorers
                    )
                    dispatch({
                        type: ActionTypes.SET_PLAYERS,
                        payload: playerDetails,
                    })
                    setLoading(false)
                })()
            } catch (error) {
                setLoading(false)
                console.log('Error fetching data: ', error)
                throw new Error("Error fetching data...")
            }
        }
    }, [])

    const addTeamPlayer = (playerId: number) => {
        dispatch({
            type: ActionTypes.ADD_PLAYER_TEAM,
            payload: { playerId, teamId },
        })
    }

    const removeTeamPlayer = (playerId: number) => {
        dispatch({
            type: ActionTypes.REMOVE_PLAYER_TEAM,
            payload: { playerId, teamId },
        })
    }

    return (
        <div>
            <div className="flex flex-col sm:flex sm:flex-row justify-center items-center gap-3 sm:gap-6 text-white sm:p-6 p-3">
                <h2 className="sm:text-3xl text-md">Editar equipo</h2>
                <input
                    className="p-2 text-white bg-slate-800 sm:text-3xl text-md"
                    placeholder="Juventud unida..."
                    value={teamName}
                    onChange={(e) => {
                        setTeamName(e.target.value)
                        dispatch({
                            type: ActionTypes.SET_TEAM_NAME,
                            payload: { teamId, teamName: e.target.value },
                        })
                    }}
                />
                <Button
                    onClick={() => router.back()}
                    title="Guardar"
                    color="blue"
                />
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div className="flex flex-col sm:flex-row sm:justify-center gap-5 w-full sm:p-6 p-3">
                    <div className="flex flex-col sm:w-1/2 justify-start items-center gap-3">
                        <h3 className='text-white font-semibold sm:text-xl text-md'>Jugadores del equipo</h3>
                        {teamPlayers?.map((player) => {
                            return (
                                <PlayerList
                                    key={player.player_key}
                                    isTeam={true}
                                    player={player}
                                    handleRemove={() =>
                                        removeTeamPlayer(player.player_key)
                                    }
                                />
                            )
                        })}
                    </div>
                    <div className="flex flex-col sm:w-1/2 justify-start items-center gap-3">
                        <h3 className='text-white font-semibold text-xl'>Jugadores disponibles</h3>
                        {state.players.map((player) => {
                            if (player.available) {
                                return (
                                    <PlayerList
                                        key={player.player_key}
                                        isTeam={false}
                                        player={player}
                                        handleAdd={() =>
                                            addTeamPlayer(player.player_key)
                                        }
                                    />
                                )
                            }
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreateTeam
