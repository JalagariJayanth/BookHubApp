import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {HiSun, HiMoon} from 'react-icons/hi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineClose} from 'react-icons/ai'

import './index.css'
import BookHubContext from '../../context/BookHubContext'

class Header extends Component {
  state = {showNavIcons: false}

  onClickShowNavIcons = () => {
    this.setState(prevState => ({
      showNavIcons: !prevState.showNavIcons,
    }))
  }

  onClickCloseIcon = () => {
    this.setState(prevState => ({
      showNavIcons: !prevState.showNavIcons,
    }))
  }

  onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {showNavIcons} = this.state
    const {activeTab} = this.props
    const ActiveHome = activeTab === 'HOME' ? 'active-tab' : ''
    const ActiveShelves = activeTab === 'SHELF' ? 'active-tab' : ''
    const ActiveFavourite = activeTab === 'FAVOURITE' ? 'active-tab' : ''

    return (
      <BookHubContext.Consumer>
        {value => {
          const {isDarkTheme, toggleTheme} = value

          const backgroundColor = isDarkTheme
            ? 'header-dark-theme'
            : 'header-light-theme'
          const textColor = !isDarkTheme
            ? 'light-theme-text'
            : 'dark-theme-text'
          const ThemeHamburger = isDarkTheme ? '#ffffff' : '#000000'

          const navIcon = isDarkTheme ? (
            <HiSun size={25} color="#ffffff" />
          ) : (
            <HiMoon size={25} color="#64748b" />
          )

          const onChangeTheme = () => {
            toggleTheme()
          }

          return (
            <nav className={`nav-container ${backgroundColor}`}>
              <div className="nav-content">
                <div className="nav-bar-desktop-container">
                  <Link to="/">
                    <img
                      src="https://res.cloudinary.com/dau2bi3nn/image/upload/v1688788346/Group_7731_htxszd.png"
                      alt="website logo"
                      className="website-logo"
                    />
                  </Link>
                  <ul className="nav-items-container">
                    <Link
                      to="/"
                      className={`nav-item ${textColor} ${ActiveHome}`}
                    >
                      <li>Home</li>
                    </Link>

                    <Link
                      to="/shelf"
                      className={`nav-item ${textColor} ${ActiveShelves}`}
                    >
                      <li>Bookshelves</li>
                    </Link>
                    <Link
                      to="/favourites"
                      className={`nav-item ${textColor} ${ActiveFavourite}`}
                    >
                      <li>MyFavorites</li>
                    </Link>
                    <li>
                      <button
                        type="button"
                        className="logout-btn"
                        onClick={this.onClickLogOut}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                  <div>
                    <button
                      type="button"
                      onClick={onChangeTheme}
                      className="theme-btn"
                    >
                      {navIcon}
                    </button>

                    <button
                      type="button"
                      className="nav-mobile-menu-btn"
                      onClick={this.onClickShowNavIcons}
                    >
                      <GiHamburgerMenu size={25} color={ThemeHamburger} />
                    </button>
                  </div>
                </div>
              </div>
              {showNavIcons && (
                <>
                  <ul className="mobile-nav-items-container">
                    <Link
                      to="/"
                      className={`nav-item ${textColor} ${ActiveHome}`}
                    >
                      <li>Home</li>
                    </Link>
                    <Link
                      to="/shelf"
                      className={`nav-item ${textColor} ${ActiveShelves}`}
                    >
                      <li>Bookshelves</li>
                    </Link>
                    <Link
                      to="/favourites"
                      className={`nav-item ${textColor} ${ActiveFavourite}`}
                    >
                      <li>MyFavorites</li>
                    </Link>
                    <li>
                      <button
                        type="button"
                        className="logout-btn"
                        onClick={this.onClickLogOut}
                      >
                        Logout
                      </button>
                    </li>

                    <li>
                      <button
                        type="button"
                        onClick={this.onClickCloseIcon}
                        className="close-icon"
                      >
                        <AiOutlineClose className={textColor} size={20} />
                      </button>
                    </li>
                  </ul>
                </>
              )}
            </nav>
          )
        }}
      </BookHubContext.Consumer>
    )
  }
}
export default withRouter(Header)
