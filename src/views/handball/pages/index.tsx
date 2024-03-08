import TopLeagues from '@/shared/components/topLeagues'
import './styles.scss'

export const Handball = () => {

  return (
    <>
      <section className="left-sidebar">
        <TopLeagues leagueIds={[127, 81, 82, 39, 103]} sport="handball" />
      </section>
      <section className="page-wrapper">
        <h1 style={{ position: "sticky", top: "0" }}>Piłka ręczna</h1>
        {/* <div style={{ height: "200vh", background: "red" }}></div> */}
      </section>
    </>
  )
}

export default Handball