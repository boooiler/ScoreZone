import { useQuery } from "@tanstack/react-query"
import axios, { AxiosRequestConfig } from "axios"

const apiKey = import.meta.env.VITE_API_KEY
const apiHost = import.meta.env.VITE_API_HOST_VOLLEYBALL
const apiUrlVolleyball = 'https://v1.volleyball.api-sports.io'
const apiUrlHandball = 'https://v1.handball.api-sports.io'
const headers = {
  "x-rapidapi-key": apiKey,
  "x-rapidapi-host": apiHost
}

export function useLeagues (
  sport: "volleyball" | "handball",
  id?: number, 
  season?: number,
  name?: string,
  country?: string, 
  type?: string
) {
  return useQuery({
    queryKey: [`${sport}_leagues`, { 
      id, 
      name,
      country, 
      season,
      type
    }],
    retry: 3,
    queryFn: async ({ queryKey }) => {
      const apiUrl = sport === 'volleyball' ? apiUrlVolleyball : apiUrlHandball
      const data = await axios.get(`${apiUrl}/leagues`, {
        headers,
        params: queryKey[1] as AxiosRequestConfig<any>
      })
      return data.data.response
    }
  })
}

export function useStandings (
  sport: "volleyball" | "handball",
  season: number,
  league: number,
  team?: number
) {
  return useQuery({
    queryKey: [`${sport}_standings`, { 
      season, 
      league,
      team
    }],
    retry: 3,
    queryFn: async ({ queryKey }) => {
      const apiUrl = sport === 'volleyball' ? apiUrlVolleyball : apiUrlHandball
      const { data } = await axios.get(`${apiUrl}/standings`, {
        headers,
        params: queryKey[1] as AxiosRequestConfig<any>
      })
      return data.response
    }
  })
}

export function useTeams (
  sport: "volleyball" | "handball",
  id?: number,
  season?: number,
  league?: number,
  name?: string,
  country_id?: number,
  country?: string
) {
  return useQuery({
    queryKey: [`${sport}_teams`, { 
      id,
      season,
      league,
      name,
      country_id,
      country
    }],
    queryFn: async ({ queryKey }) => {
      const apiUrl = sport === 'volleyball' ? apiUrlVolleyball : apiUrlHandball
      const { data } = await axios.get(`${apiUrl}/teams`, {
        headers,
        params: queryKey[1] as AxiosRequestConfig<any>
      })
      return data
    }
  })
}

export function useGames (
  sport: "volleyball" | "handball",
  id?: number,
  league?: number,
  season?: number,
  team?: number,
  date?: string
) {
  return useQuery({
    queryKey: [`${sport}_games`, { 
      id,
      season, 
      league,
      team,
      date
    }],
    retry: 3,
    queryFn: async ({ queryKey }) => {
      const apiUrl = sport === 'volleyball' ? apiUrlVolleyball : apiUrlHandball
      const { data } = await axios.get(`${apiUrl}/games`, {
        headers,
        params: queryKey[1] as AxiosRequestConfig<any>
      })
      return data.response
    },
    refetchInterval: 30000
  })
}