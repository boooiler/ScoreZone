import { useQuery } from "@tanstack/react-query"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

const apiKey = import.meta.env.VITE_API_KEY
const apiHost = import.meta.env.VITE_API_HOST_VOLLEYBALL
const apiUrl = 'https://v1.volleyball.api-sports.io'
const apiUrl2 = 'https://v1.handball.api-sports.io'
const headers = {
  "x-rapidapi-key": apiKey,
  "x-rapidapi-host": apiHost
}

export function useVolleyballLeagues (
  sport: "volleyball" | "handball",
  id?: number[], 
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
      if (!id || id.length === 0) {
        const data = await axios.get(`${sport === 'volleyball' ? apiUrl : apiUrl2}/leagues`, {
          headers,
          params: queryKey[1] as AxiosRequestConfig<any>
        })
        return data.data.response
      }
      const promises = id.map((leagueId) => {
        return axios.get(`${apiUrl}/leagues`, {
          headers,
          params: { id: leagueId }
        })
      })

      const responses: AxiosResponse<any>[] = await Promise.all(promises)
      const leagueDatas: any[] = []

      responses.forEach((response) => {
        if (response.data.response && response.data.response.length > 0) {
          leagueDatas.push(response.data.response[0]) 
        }
      })

      return leagueDatas
    }
  })
}

export function useVolleyballStandings (
  sport: "volleyball" | "handball",
  season: number,
  league: number
) {
  return useQuery({
    queryKey: [`${sport}_standings`, { 
      season, 
      league
    }],
    retry: 3,
    queryFn: async ({ queryKey }) => {
      const { data } = await axios.get(`${sport === 'volleyball' ? apiUrl : apiUrl2}/standings`, {
        headers,
        params: queryKey[1] as AxiosRequestConfig<any>
      })
      return data.response
    }
  })
}

export function useVolleyballTeams (
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
      const { data } = await axios.get(`${sport === 'volleyball' ? apiUrl : apiUrl2}/teams`, {
        headers,
        params: queryKey[1] as AxiosRequestConfig<any>
      })
      return data
    }
  })
}

export function useVolleyballGames (
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
      const { data } = await axios.get(`${sport === 'volleyball' ? apiUrl : apiUrl2}/games`, {
        headers,
        params: queryKey[1] as AxiosRequestConfig<any>
      })
      return data.response
    },
    refetchInterval: 30000
  })
}