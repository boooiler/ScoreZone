import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function useFootballTeams () {
  return useQuery({
    queryKey: ['football_teams'],
    queryFn: async () => {
      const { data } = await axios.get(`https://v3.football.api-sports.io/teams`, {
        headers: {
          "x-rapidapi-key": "87f7811cc8fdeb061ab0086647df76ce",
          // "x-rapidapi-key": "937eee4ba5fed62a74dbd1dc21f7726e",
          "x-rapidapi-host": "v3.football.api-sports.io"
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