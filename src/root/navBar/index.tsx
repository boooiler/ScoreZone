import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'
import LanguageChanger from '@/shared/components/languageChanger'
import Icon from '@/shared/icons/Icon'
import './styles.scss'

interface NavigationBarProps {
  setNavHeight?: (height: number) => void
}
const NavigationBar = ({ setNavHeight }: NavigationBarProps) => {
  const { pathname } = useLocation()
  const { t, i18n } = useTranslation()
  const headerRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const [indicatorPosition, setIndicatorPosition] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0
  })
  const [isFontLoaded, setIsFontLoaded] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1199)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  const handleNavlinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  const setNavbarHeight = () => {
    const headerElement = headerRef.current
    if (headerElement) {
      const { height } = headerElement.getBoundingClientRect()
      setNavHeight && setNavHeight(height)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1199)
      if (window.innerWidth > 1199) {
        setIsMobileMenuOpen(false) 
      }
      setNavbarHeight()
    }
    
    const handleFontLoad = () => {
      setIsFontLoaded(true)
    }

    setNavbarHeight()

    window.addEventListener('resize', handleResize)
    document.fonts.ready.then(handleFontLoad)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.fonts.ready.then(handleFontLoad)
    }
  }, [])

  useLayoutEffect(() => {
    const _activeButton = findActiveButton()
    if(_activeButton && isFontLoaded) {
      setIndicatorPosition(calculatePosition(_activeButton))
    }
  }, [isFontLoaded, i18n.resolvedLanguage, pathname])

  const findActiveButton = (): string | null => {
    const buttons = document.querySelectorAll('.app-navlist ul li a')
    for (const button of buttons) {
      if (button.classList.contains('active')) {
        return button.id
      }
    }
    return null
  }

  const handleMouseEnter = (button: string) => {
    setIndicatorPosition(calculatePosition(button))
  }

  const handleMouseLeave = () => {
    const _activeButton = findActiveButton()
    if(_activeButton) setIndicatorPosition(calculatePosition(_activeButton))
  }

  const calculatePosition = (button: string) => {
    const activeButtonElement = document.getElementById(button)
    if (activeButtonElement && parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect()
      const rect = activeButtonElement.getBoundingClientRect()
      const top = rect.top - parentRect.top
      const left = rect.left - parentRect.left

      return { top: top, left: left, width: rect.width }
    }
    return indicatorPosition
  }

  return (
    <header className='app-navbar' ref={headerRef} >
      <section className='app-logo'>
        <img src='/images/ScoreZone.svg' alt='ScoreZone logo' />
      </section>

      <section 
        className={`menu-wrapper${isMobile ? ' mobile-menu' : ''}${isMobileMenuOpen ? ' isOpen' : ''}`} 
        ref={parentRef}
      >
        <nav className='app-navlist'>
          <ul>
            <li>
              <NavLink
                to='/news'
                id='news'
                onMouseEnter={() => handleMouseEnter('news')}
                onMouseLeave={handleMouseLeave}
                onClick={handleNavlinkClick}
              >
                <Icon name='IconNews' variant='outlined' />
                <span>{t('root.menu.news')}</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/football'
                id='football'
                onMouseEnter={() => handleMouseEnter('football')}
                onMouseLeave={handleMouseLeave}
                onClick={handleNavlinkClick}
              >
                <Icon name='IconFootball' variant='filled' />
                <span>{t('root.menu.football')}</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/volleyball'
                id='volleyball'
                onMouseEnter={() => handleMouseEnter('volleyball')}
                onMouseLeave={handleMouseLeave}
                onClick={handleNavlinkClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20px" height="20px" fill="#fff" stroke="#fff"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><g><path d="M23,17.2c0-0.2,0-0.3,0-0.5c0-6.7-4-12.6-9.8-14.5c-1,0.2-2,0.5-2.9,0.9c3.8,3,6.1,7.5,6.3,12.4 C18.7,16.6,20.9,17.1,23,17.2z"></path> <path d="M15.8,17.3c-1.9,1.2-3.5,2.8-4.6,4.7c0.1,0.1,0.3,0.2,0.4,0.2c5.9,3.4,13.1,2.8,17.6-1.4c0.3-0.9,0.6-1.9,0.7-2.9 c-2,0.9-4.2,1.3-6.4,1.3C20.8,19.2,18.2,18.6,15.8,17.3z"></path> <path d="M25.1,16.7c0,0.1,0,0.3,0,0.4c1.7-0.2,3.4-0.7,4.9-1.5C29.8,8.6,24.4,2.8,17.5,2.1C22,5.1,25.1,10.6,25.1,16.7z"></path> <path d="M11.6,7.8c0.1-0.1,0.2-0.1,0.3-0.2C11,6.3,9.8,5.1,8.5,4.2C4.6,6.7,2,11.1,2,16c0,1.6,0.3,3.2,0.8,4.6 C3.5,15.5,6.6,10.6,11.6,7.8z"></path> <path d="M19.6,26.4c-3.1,0-6.2-0.8-9.1-2.5c-0.1-0.1-0.2-0.1-0.3-0.2c-0.6,1.4-1,2.9-1.2,4.4c2,1.2,4.4,1.9,6.9,1.9 c4.4,0,8.4-2.1,10.9-5.3C24.7,25.8,22.2,26.4,19.6,26.4z"></path> <path d="M14.7,15.6c-0.1-2.2-0.7-4.4-1.7-6.3c-0.1,0.1-0.3,0.1-0.4,0.2C7,12.7,4,18.7,4.8,24.4c0.7,0.9,1.5,1.8,2.4,2.5 C8,22.3,10.7,18.1,14.7,15.6z"></path> </g> </g></svg>
                <span>{t('root.menu.volleyball')}</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/handball'
                id='handball'
                onMouseEnter={() => handleMouseEnter('handball')}
                onMouseLeave={handleMouseLeave}
                onClick={handleNavlinkClick}
              >
                <svg fill="#fff" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 281.243 281.243" stroke="#fff"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><g> <path d="M238.598,164.193c-2.805,2.341-6.213,3.482-9.602,3.482c-4.295,0-8.559-1.835-11.525-5.391l-4.544-5.446 c-11.604-13.907-24.332-26.929-37.977-38.877c0,0,2.384,94.96-59.655,151.809l-7.411,7.218c-2.916,2.84-6.692,4.254-10.465,4.254 c-3.905,0-7.807-1.516-10.747-4.534c-5.779-5.935-5.654-15.432,0.28-21.212l7.412-7.219c17.4-16.943,29.416-38.476,34.792-61.907 c-9.831,3.011-20.032,4.532-30.236,4.532c-19.017,0-38.029-5.227-54.632-15.685c-7.009-4.415-9.112-13.677-4.696-20.687 c4.414-7.008,13.676-9.113,20.687-4.696c19.641,12.371,44.059,14.384,65.261,6.066l5.866-53.723 c-1.392,0.067-2.783,0.112-4.172,0.112c-21.581,0-42.561-8.05-58.906-23.151l-0.975-0.9c-1.242,0.18-2.511,0.277-3.803,0.277 c-14.523,0-26.297-11.773-26.297-26.297s11.773-26.297,26.297-26.297s26.297,11.773,26.297,26.297c0,1.859-0.195,3.672-0.562,5.421 c14.391,12.932,34.062,17.68,52.802,12.694l8.886-2.366c0.1-0.027,0.2-0.039,0.299-0.064c0.265-0.065,0.531-0.12,0.8-0.17 c0.23-0.043,0.46-0.085,0.69-0.117c0.242-0.034,0.484-0.057,0.728-0.079c0.253-0.023,0.505-0.045,0.757-0.055 c0.227-0.009,0.454-0.007,0.682-0.006c0.259,0.002,0.517,0.003,0.774,0.018c0.235,0.013,0.468,0.039,0.703,0.064 c0.242,0.026,0.483,0.049,0.722,0.087c0.258,0.04,0.514,0.094,0.771,0.147c0.209,0.044,0.418,0.085,0.625,0.137 c0.279,0.071,0.553,0.156,0.829,0.243c0.182,0.058,0.364,0.112,0.544,0.177c0.278,0.1,0.551,0.214,0.824,0.331 c0.176,0.075,0.352,0.148,0.524,0.23c0.253,0.12,0.502,0.253,0.75,0.388c0.192,0.104,0.382,0.209,0.569,0.321 c0.215,0.13,0.425,0.268,0.635,0.41c0.214,0.144,0.425,0.291,0.632,0.446c0.086,0.065,0.177,0.118,0.262,0.185l14.985,11.758 c20.806,16.325,39.945,34.896,56.885,55.2l4.544,5.446C245.814,149.428,244.959,158.887,238.598,164.193z M153.98,61.351 c16.942,0,30.675-13.734,30.675-30.675C184.655,13.734,170.922,0,153.98,0s-30.675,13.734-30.675,30.675 C123.305,47.617,137.038,61.351,153.98,61.351z"></path></g></g></svg>
                <span>{t('root.menu.handball')}</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div id="marker" style={{ top: indicatorPosition.top, left: indicatorPosition.left, width: indicatorPosition.width }}></div>

        {window.innerWidth <= 1199 && (
          <LanguageChanger />
        )}
      </section>

      {window.innerWidth <= 1199 ? (
        <button
          className={`hamburger-button ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
        </button>
      ) : (
        <LanguageChanger />
      )}
    </header>
  )
}

export default NavigationBar
