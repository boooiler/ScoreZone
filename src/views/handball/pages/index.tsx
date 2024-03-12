import TopLeagues from '@/shared/components/topLeagues'
import './styles.scss'

export const Handball = () => {

  return (
    <>
      <section className="left-sidebar">
        <TopLeagues leagueIds={[78, 82, 39, 103]} sport="handball" />
      </section>
      <section className="page-wrapper">
        <h1>Piłka ręczna</h1>
      </section>
    </>
  )
}

export default Handball