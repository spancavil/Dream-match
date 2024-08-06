'use client'
import Button from '@/components/Button'
import { MAX_TEAMS } from '@/constants/team'
import { ActionTypes } from '@/context/actions'
import { useAppContext } from '@/context/useAppContext'
import Link from 'next/link'
import React, { useEffect } from 'react'

type Props = {}

const Teams = (props: Props) => {
    const { state, dispatch } = useAppContext()

    const readyCondition =
        state.teams.length === MAX_TEAMS &&
        state.teams[0]?.players.length === 5 &&
        state.teams[1]?.players.length === 5 &&
        state.teams[0]?.teamName &&
        state.teams[1]?.teamName
    

    return (
        <div className='p-4 flex flex-col justify-center items-center h-full'>
            <div className="w-full text-center">
                <h1 className='text-3xl font-medium text-white'>Equipos</h1>
            </div>
            <div className='flex flex-col w-full justify-center items-center p-10 gap-6'>
                {state.teams.length < MAX_TEAMS && (
                    <Link href={'create-team'}>
                        <Button
                            title='Crear equipo'
                            color='green'
                            onClick={()=> {}}
                        />
                    </Link>
                )}
                <div className='flex flex-col justify-center items-center gap-6'>
                    {state.teams.map((team) => {
                        return (
                            <div className='flex flex-row justify-center items-center gap-6' key={team.teamId}>
                                <Link href={`teams/${team.teamId}`}>
                                    <Button
                                        title={`
                                            ${team.teamName || 'Sin nombre configurado'}
                                            `}
                                        onClick={()=>{}}
                                        color='blue'
                                    />
                                    
                                </Link>
                                <Button
                                    onClick={() =>
                                        dispatch({
                                            type: ActionTypes.REMOVE_TEAM,
                                            payload: { teamId: team.teamId },
                                        })
                                    }
                                    title='Borrar equipo'
                                    color='red'
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            {readyCondition && <h2 className='sm:text-3xl text-xl font-medium text-white text-center w-full'>¡Los equipos están formados y completos!</h2>}
        </div>
    )
}

export default Teams
