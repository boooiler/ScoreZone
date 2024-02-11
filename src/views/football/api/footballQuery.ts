import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const apiKey = import.meta.env.VITE_API_KEY
const apiHost = import.meta.env.VITE_API_HOST_FOOTBALL

export function useFootballTeams () {
  return useQuery({
    queryKey: ['football_teams'],
    queryFn: async () => {
      const { data } = await axios.get(`/football-api/teams`, {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": apiHost
        },
        params: {
          season: 2023,
          league: 107
        }
      })
      return data
    }
  })
}