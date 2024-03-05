import { useEffect, useState } from 'react'
import { useNews } from '../api/newsQuery'
import Loader from '@/shared/components/loader'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import './styles.scss'

export const News = () => {
  const { data: topNews, isLoading } = useNews('sport', 'sport.interia.pl, sport.pl, sport.onet.pl, polsatsport.pl, sportowefakty.wp.pl, meczyki.pl, sport.tvp.pl, sport.se.pl, przegladsportowy.onet.pl', 64)
  const [sliderNews, setSliderNews] = useState<any>()
  const [otherNews, setOtherNews] = useState<any>()

  useEffect(() => {
    if(topNews && topNews.articles.length > 0) {
      const { articles } = topNews
      setSliderNews(articles.slice(0,4))
      setOtherNews(articles.slice(4))
    }
  }, [topNews])

  useEffect(() => {
    console.log(sliderNews)
  }, [sliderNews])

  return (
    <section className="page-wrapper articles-wrapper">
      {isLoading ? (
        <Loader fullscreen />
      ) : !topNews || !topNews.articles.length ? (
        <>Błąd połączenia</>
      ) : (
        <>
          {sliderNews && (
            <Carousel
              showArrows={false}
              autoPlay={false}
              emulateTouch
              infiniteLoop
              interval={6000}
              showStatus={false}
              showThumbs={false}
            >
              {sliderNews.map((news: any, index: number) => (
                <div className='article-box' key={index}>
                  <div className="img-wrapper">
                    <img src={news.urlToImage} alt='image' />
                  </div>
                  <a className='slide-text' href={news.url} target='_blank' rel="noreferrer">
                    {news.title}
                  </a>
                </div>
              ))}
            </Carousel>
          )}
          <section className="articles">
            <h1>Aktualności ze świata sportu</h1>
            {otherNews && otherNews.map((news: any) => (
              <a className='article-box' href={news.url} target='_blank' rel="noreferrer">
                <div className="img-wrapper">
                  <img src={news.urlToImage} alt='image' />
                </div>
                <span>{news.title}</span>
              </a>
            ))}
          </section>
        </>
      )}
    </section>
  )
}

export default News