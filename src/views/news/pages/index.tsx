import { useNews, useTopNews } from '../api/newsQuery'
import './styles.scss'
import Loader from '@/shared/components/loader'

export const News = () => {
//   const { data: topNews, isLoading } = useTopNews("pl", "sports")
  const { data: topNews, isLoading } = useNews('sport', 'interia.pl, sport.interia.pl')

  return (
    <section className="page-wrapper">
      <h1 style={{ position: "sticky", top: "0" }}>Aktualności</h1>
      {isLoading ? (
        <Loader />
      ) : !topNews || !topNews.articles.length ? (
        <>Błąd połączenia</>
      ) : (
        <section className="articles">
          {topNews.articles.map((news: any) => (
            <a className='article-box' href={news.url} target='_blank' rel="noreferrer">
              <div className="img-wrapper">
                <img src={news.urlToImage} alt='image' />
              </div>
              <span>{news.title}</span>
            </a>
          ))}
        </section>
      )}
    </section>
  )
}

export default News