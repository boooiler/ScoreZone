import { League } from "@/shared/model/league"

export const topVolleyballLeagues: League[] = [
  { // PlusLiga
    id: 113,
    name: "PlusLiga",
    type: "League",
    logo: "https://media.api-sports.io/volley/leagues/113.png",
    country: {
      id: 34,
      name: "Poland",
      code: "PL",
      flag: "https://media.api-sports.io/flags/pl.svg"
    },
    seasons: [
      {
        season: 2023,
        current: true,
        start: "2023-10-20",
        end: "2024-04-06"
      }
    ]
  },
  { // Tauron liga Woman
    id: 120,
    name: "TAURON Liga Women",
    type: "League",
    logo: "https://media.api-sports.io/volley/leagues/120.png",
    country: {
      id: 34,
      name: "Poland",
      code: "PL",
      flag: "https://media.api-sports.io/flags/pl.svg"
    },
    seasons: [
      {
        season: 2023,
        current: true,
        start: "2023-10-08",
        end: "2024-03-11"
      }
    ]
  },
  { // SuperLega IT
    id: 97,
    name: "SuperLega",
    type: "League",
    logo: "https://media.api-sports.io/volley/leagues/97.png",
    country: {
      id: 25,
      name: "Italy",
      code: "IT",
      flag: "https://media.api-sports.io/flags/it.svg"
    },
    seasons: [
      {
        season: 2023,
        current: true,
        start: "2023-10-22",
        end: "2024-03-03"
      }
    ]
  }
]