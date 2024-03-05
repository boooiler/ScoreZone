import { useQuery } from "@tanstack/react-query"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

const apiKey = import.meta.env.VITE_NEWS_API_KEY
const apiUrl = 'https://newsapi.org/v2'
const headers = {
  "Authorization": apiKey
}

export function useTopNews (
  country?: string,
  category?: string,
  q?: string,
  pageSize?: number,
  page?: number
) {
  return useQuery({
    queryKey: ['top_news', { 
      country, 
      category,
      q,
      pageSize,
      page
    }],
    retry: 3,
    queryFn: async ({ queryKey }) => {
      const { data } = await axios.get(`${apiUrl}/top-headlines`, {
        headers,
        params: queryKey[1] as AxiosRequestConfig<any>
      })
      return data
    }
  })
}

export function useNews (
  q?: string,
  domains?: string,
  pageSize?: number,
  searchIn?: 'title' | 'description' | 'content',
  from?: string,
  to?: string,
  language?: string,
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt',
  page?: number
) {
  return useQuery({
    queryKey: ['top_news', { 
      q,
      domains,
      searchIn,
      from,
      to,
      language,
      sortBy,
      pageSize,
      page
    }],
    retry: 3,
    queryFn: async ({ queryKey }) => {
      const { data } = await axios.get(`${apiUrl}/everything`, {
        headers,
        params: queryKey[1] as AxiosRequestConfig<any>
      })
      return data
    }
  })
}