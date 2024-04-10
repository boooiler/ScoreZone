import { useEffect, useState } from "react"

import { FixturesRound } from "./fixturesRound/FixturesRound"
import { useGames } from "@/shared/api/sportQuery"
import Loader from "@/shared/components/loader"
import { FixtureMatch, FixtureMatchDay } from "@/shared/model/fixtures"

import "./styles.scss"

interface Props {
  sport: "volleyball" | "handball"
  league?: number
  season: number
  fixturesType: "planned" | "finished"
  team?: number
}
export const Fixtures = ({ sport, league, season, fixturesType, team }: Props) => {
  const { data: fixturesData, isLoading } = useGames(sport, undefined, league, season, team, undefined)
  const [fixtures, setFixtures] = useState<FixtureMatchDay>()

  useEffect(() => {
    if(fixturesData && fixturesType) {
      const sortedFinishedFixtures: FixtureMatch[] = fixturesData.filter((f: FixtureMatch) => f.status.short === 'FT')
      const plannedFixtures: FixtureMatch[] = fixturesData.filter((f: FixtureMatch) => f.status.short === 'NS')
      const fixtures = fixturesType === "planned" ? plannedFixtures : sortedFinishedFixtures
      setFixtures(groupFixtures(fixtures))
    }
  }, [fixturesData, fixturesType])

  const groupFixtures = (fixtures: FixtureMatch[]): FixtureMatchDay => {
    const groupedFixtures: FixtureMatchDay = fixtures.reduce((acc: any, fixture: FixtureMatch) => {
      const { week } = fixture
      if (!acc[week]) {
        acc[week] = []
      }
      acc[week].push(fixture)
      return acc
    }, {})
    return groupedFixtures
  }

  return (
    <section className="fixtures-wrapper">
      {isLoading || !fixtures ? (
        <Loader />
      ) : Object.keys(fixtures).sort().reverse().map((round: string, index: number) => (
        <FixturesRound 
          key={index}
          fixtures={fixtures}
          round={round}
          sport={sport}
        />
      ))}
    </section>
  )
}