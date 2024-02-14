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
      // console.log(responses.map(response => response.data).filter(data => data.response.length > 0))
      const leagueDatas: any[] = []

      responses.forEach((response) => {
        if (response.data.response && response.data.response.length > 0) {
          leagueDatas.push(response.data.response[0]) // Dodaj dane ligi do tablicy
        }
      })

      return leagueDatas

      // let data = responses.map(response => response.data).map(d => d.response[0])
      // if(id.length > 1){
      //   const responses: AxiosResponse = await Promise.all(promises)
      // }
      // const data = responses.map(response => response.data).filter(data => data.response.length > 0)
      // TODO: dodać obsługę błędu skończenia się darmowych requestów
      // return responses.map(response => response.data).filter(data => data.response.length > 0)
      // return responses
      // const nonEmptyResponses = responses.filter(response => response.data.response.length > 0)
      // return nonEmptyResponses.map(response => response.data.response)
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