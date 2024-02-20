import { useQuery } from "@tanstack/react-query"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

const apiKey = import.meta.env.VITE_API_KEY
const apiHost = import.meta.env.VITE_API_HOST_VOLLEYBALL
const apiUrl = 'https://v1.volleyball.api-sports.io/'
const headers = {
  "x-rapidapi-key": apiKey,
  "x-rapidapi-host": apiHost
}

export function useVolleyballLeagues (
  id?: number[], 
  season?: number,
  name?: string,
  country?: string, 
  country_id?: string, 
  type?: string
) {
  return useQuery({
    queryKey: ['volleyball_leagues', { 
      id, 
      name,
      country, 
      country_id,
      season,
      type
    }],
    queryFn: async () => {
      if (!id || id.length === 0) {
        return []
      }
      const promises = id.map((leagueId) => {
        return axios.get(`${apiUrl}/leagues`, {
          headers,
          params: { id: leagueId }
        })
      })

      const responses: AxiosResponse<any>[] = await Promise.all(promises)
      console.log(responses.map(response => response.data))
      return responses.map(response => response.data).filter(data => data.response.length > 0)
    }
  })
}