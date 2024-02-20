import TopLeagues from '@/shared/components/topLeagues'
import './styles.scss'

export const Volleyball = () => {

  return (
    <>
      <section className="left-sidebar">
        <TopLeagues leagueIds={[97, 113, 120]} sport="volleyball" />
      </section>
      <section className="page-wrapper">
        <h1 style={{ position: "sticky", top: "0" }}>Siatkówka</h1>
        <div style={{ height: "200vh", background: "green" }}></div>
      </section>
    </>
  )
}

export default Volleyball