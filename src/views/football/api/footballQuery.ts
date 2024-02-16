import { useQuery } from "@tanstack/react-query"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

const apiKey = import.meta.env.VITE_API_KEY
const apiHost = import.meta.env.VITE_API_HOST_FOOTBALL
const apiUrl = 'https://v3.football.api-sports.io'
const headers = {
  "x-rapidapi-key": apiKey,
  "x-rapidapi-host": apiHost
}

export function useFootballTeams (
  id?: string,
  league?: number,
  season?: number,
  name?: string,
  country_id?: number,
  country?: string
) {
  return useQuery({
    queryKey: ['football_teams', {
      id,
      league,
      season,
      name,
      country_id,
      country
    }],
    enabled: !!season,
    queryFn: async ({ queryKey }) => {
      const { data } = await axios.get(`${apiUrl}/teams`, {
        headers,
        params: queryKey[1] as AxiosRequestConfig<any>
      })
      return data
    }
  })
}

export function useFootballLeagues (
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
    queryKey: ['football_leagues', { 
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

export function useFootballStandings (
  season: number,
  league: number
) {
  return useQuery({
    queryKey: ['football_standings', { 
      season, 
      league
    }],
    retry: 3,
    queryFn: async ({ queryKey }) => {
      const { data } = await axios.get(`${apiUrl}/standings`, {
        headers,
        params: queryKey[1] as AxiosRequestConfig<any>
      })
      return data
    }
  })
}

export function useFootballFixtures (
  id?: number,
  league?: number,
  season?: number,
  status?: string, //"NS" | "NS-PST-FT"
  live?: string, // "all" | "id-id"
  team?: number,
  ids?: string, // "id-id-id"
  date?: string,
  last?: number,
  next?: number,
  from?: string,
  to?: string,
  round?: string,
  venue?: number
) {
  return useQuery({
    queryKey: ['football_fixtures', { 
      id,
      season, 
      league,
      team,
      ids,
      live,
      date,
      last,
      next,
      from, 
      to,
      round,
      status,
      venue
    }],
    retry: 3,
    queryFn: async ({ queryKey }) => {
      const { data } = await axios.get(`${apiUrl}/fixtures`, {
        headers,
        params: queryKey[1] as AxiosRequestConfig<any>
      })
      return data
    }
  })
}

export function useFootballCountries () {
  return useQuery({
    queryKey: ['football_countries'],
    queryFn: async () => {
      const { data } = await axios.get(`${apiUrl}/countries`, {
        headers
      })
      return data
    }
  })
}