'use client'
import { Player } from '@/interfaces/player'
import Image from 'next/image'
import React, { useState } from 'react'
import Button from './Button'

type Props = {
    player: Player
    isTeam: boolean
    handleAdd?: () => void
    handleRemove?: () => void
}

const PlayerList = ({
    player,
    isTeam,
    handleAdd = () => {},
    handleRemove = () => {},
}: Props) => {
    const [defaultImage, setDefaultImage] = useState(false)

    return (
        <div className="grid grid-cols-[2fr_4fr_1fr_2fr] gap-7">
            {defaultImage ? (
                <Image
                    height={80}
                    width={80}
                    className="rounded-full inline sm:h-16 sm:w-16 h-7 w-7"
                    src="/default-user.png"
                    alt={`player-${player.player_key}`}
                />
            ) : (
                <Image
                    height={80}
                    width={80}
                    className="rounded-full inline sm:h-16 sm:w-16 h-7 w-7"
                    src={player.player_image}
                    onError={() => setDefaultImage(true)}
                    alt={`player-${player.player_key}`}
                />
            )}
            <span className='text-white font-light sm:text-xl text-sm'>{player.player_complete_name}</span>
            <span className='text-white font-light sm:text-xl text-sm'>{player.player_age} años</span>
            {isTeam ? (
                <Button color="red" onClick={handleRemove} title="Quitar" />
            ) : (
                <Button color="green" onClick={handleAdd} title="Agregar" />
            )}
        </div>
    )
}

export default PlayerList
