import { useEffect, useState } from 'react'
import moment from 'moment'
import { useNews } from '../api/newsQuery'
import Loader from '@/shared/components/loader'
import { Article } from '../model/article'
import { allArticles } from '../model/mockupArticles'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import './styles.scss'

export const News = () => {
  const { data: topNews, isLoading } = useNews('sport', 'sport.interia.pl, sport.pl, sport.onet.pl, polsatsport.pl, sportowefakty.wp.pl, meczyki.pl, sport.tvp.pl, sport.se.pl, przegladsportowy.onet.pl', 64)
  const [sliderNews, setSliderNews] = useState<Article[]>()
  const [otherNews, setOtherNews] = useState<Article[]>()

  const sortArticlesByPublishedAt = (articles: Article[]): Article[] => {
    return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }

  useEffect(() => {
    console.log('topNews', topNews)
    const articles = topNews?.articles || allArticles.articles
    const sortedArticles = sortArticlesByPublishedAt(articles)
    console.log('articles', sortedArticles)
    setSliderNews(sortedArticles.slice(0, 4))
    setOtherNews(sortedArticles.slice(4))
  }, [topNews])

  return (
    <section className="page-wrapper articles-wrapper">
      {isLoading ? (
        <Loader fullscreen />
      ) : (!topNews || !topNews.articles.length) && !otherNews ? (
        <div className='center'>Błąd połączenia</div>
      ) : (
        <>
          {sliderNews && (
            <Carousel
              showArrows={false}
              autoPlay
              emulateTouch
              infiniteLoop
              interval={6000}
              showStatus={false}
              showThumbs={false}
            >
              {sliderNews.map((news: Article, index: number) => (
                <div className='article-box' key={index}>
                  <div className="img-wrapper">
                    <img src={news.urlToImage} alt='image' />
                  </div>
                  <a className='slide-text' href={news.url} target='_blank' rel="noreferrer">
                    <span>{moment(news.publishedAt).format('DD/MM/YYYY')}</span>
                    {news.title}
                  </a>
                </div>
              ))}
            </Carousel>
          )}
          <section className="articles">
            <h1>Aktualności ze świata sportu</h1>
            {otherNews && otherNews.map((news: Article) => (
              <a className='article-box' href={news.url} target='_blank' rel="noreferrer">
                <div className="img-wrapper">
                  <img src={news.urlToImage} alt='image' />
                </div>
                <div className='text-wrapper'>
                  <span>{moment(news.publishedAt).format('DD/MM/YYYY')}</span>
                  <b>{news.title}</b>
                </div>
              </a>
            ))}
          </section>
        </>
      )}
    </section>
  )
}

export default News