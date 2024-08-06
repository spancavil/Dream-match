import { Country } from "@/interfaces/country"
import { League } from "@/interfaces/league"
import { TopScorer } from "@/interfaces/topscorer"

export const getTopScorers = async (): Promise<number[]> => {
    try {
        const API_KEY = process.env.NEXT_PUBLIC_API_key
        const BASE_URL = process.env.NEXT_PUBLIC_base_url
        const COUNTRY_NAME = process.env.NEXT_PUBLIC_country_name
        
        const responseCountry = await fetch(
            `${BASE_URL}/?action=get_countries&APIkey=${API_KEY}`
        )

        if (!responseCountry.ok) throw new Error('Error fetching countries')
        const countries: Country[] = await responseCountry.json()
        const country = countries.find(
            (country) => country.country_name === COUNTRY_NAME
        )

        //Get leagues
        const responseLeagues = await fetch(
            `${BASE_URL}/?action=get_leagues&country_id=${country?.country_id}&APIkey=${API_KEY}`
        )

        if (!responseLeagues.ok) throw new Error('Error fetching leagues')
        //2. Get first league from country_id
        const leagues: League[] = await responseLeagues.json()
        const ligaProfesionalArgentina = leagues[0]

        //3. Get top scorers from league_id
        const responseScorers = await fetch(
            `${BASE_URL}/?action=get_topscorers&league_id=${ligaProfesionalArgentina.league_id}&APIkey=${API_KEY}`
        )
        if (!responseScorers.ok) throw new Error('Error fetching scorers')
            if (!responseScorers.ok) throw new Error('Error fetching scorers')

        const topScorers: TopScorer[] = await responseScorers.json()
        const topScorersIds = topScorers.map(topScorer => topScorer.player_key)
        return topScorersIds

    } catch (error) {
        console.error('Error fetching topscorers:', error)
        throw new Error('Failed to fetch topscorers')
    }
}