import TopLeagues from '@/shared/components/topLeagues'
import './styles.scss'

export const Volleyball = () => {

  return (
    <>
      <section className="left-sidebar">
        <TopLeagues leagueIds={[97, 113, 120]} sport="volleyball" />
      </section>
      <section className="page-wrapper">
        <h1>Siatkówka</h1>
      </section>
    </>
  )
}

export default Volleyball