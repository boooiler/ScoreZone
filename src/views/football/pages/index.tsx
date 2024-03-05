import FootballTopLeagues from "../components/footballTopLeagues/FootballTopLeagues"
import './styles.scss'

export const Football = () => {

  return (
    <>
      <section className="left-sidebar">
        <FootballTopLeagues />
      </section>
      <section className="page-wrapper">
        <h1 style={{ position: "sticky", top: "0" }}>Piłka nożna</h1>
        <div style={{ height: "200vh", background: "red" }}></div>
      </section>
    </>
  )
}

export default Football