import { Player } from "@/interfaces/player";
import { TopScorer } from "@/interfaces/topscorer";

export const getPlayerDetails = async (limit: number, offset: number, topScorers: number[]) => {
    try {
        const API_KEY = process.env.NEXT_PUBLIC_API_key
        const BASE_URL = process.env.NEXT_PUBLIC_base_url

        const playerDetails: Player[] = []
        for (let index = 0; index < limit; index++) {
            const playerId = topScorers[index + offset];
            const responseDetail = await fetch(
                `${BASE_URL}/?action=get_players&player_id=${playerId}&APIkey=${API_KEY}`
            )
    
            if (!responseDetail.ok) throw new Error('Error fetching player details')
            const playerDetail = await responseDetail.json()
            playerDetails.push({
                ...playerDetail[0],
                available: true
            })
        }
        return playerDetails
    } catch (error) {
        console.error('Error fetching players details:', error)
        throw new Error('Failed to fetch players details')
    }
}