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
  current?: boolean,
  id?: number[], 
  name?: string,
  country?: string, 
  code?: string, 
  season?: number,
  team?: number,
  type?: string
) {
  return useQuery({
    queryKey: ['volleyball_leagues', { 
      id, 
      name,
      country, 
      code, 
      season,
      team,
      type,
      current
    }],
    retry: 3,
    queryFn: async ({ queryKey }) => {
      if (!id || id.length === 0) {
        const data = await axios.get(`${apiUrl}/leagues`, {
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
  season: number,
  league: number
) {
  return useQuery({
    queryKey: ['volleyball_standings', { 
      season, 
      league
    }],
    retry: 3,
    queryFn: async ({ queryKey }) => {
      const { data } = await axios.get(`${apiUrl}/standings`, {
        headers,
        params: queryKey[1] as AxiosRequestConfig<any>
      })
      return data.response
    }
  })
}

export function useVolleyballTeams (
  id?: number,
  season?: number,
  league?: number,
  name?: string,
  country_id?: number,
  country?: string
) {
  return useQuery({
    queryKey: ['volleyball_teams', {
      id,
      season,
      league,
      name,
      country_id,
      country
    }],
    queryFn: async ({ queryKey }) => {
      const { data } = await axios.get(`${apiUrl}/teams`, {
        headers,
        params: queryKey[1] as AxiosRequestConfig<any>
      })
      return data
    }
  })
}