import {Component} from 'react'
import {Link} from 'react-router-dom'

import BookHubContext from '../../context/BookHubContext'
import Header from '../Header'
import FavouriteBookItem from '../FavouriteBookItem'
import './index.css'

class FavouriteBooks extends Component {
  renderEmptyview = () => (
    <BookHubContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const DarkThemeHeading = isDarkTheme ? 'dark-theme-heading' : ' '

        return (
          <div className="favourite-empty-view-container">
            <h1 className={`empty-view-heading ${DarkThemeHeading}`}>
              No Favorite Books
            </h1>
            <Link to="/shelf">
              <button type="button" className="find-books-btn">
                Find Books
              </button>
            </Link>
          </div>
        )
      }}
    </BookHubContext.Consumer>
  )

  render() {
    return (
      <BookHubContext.Consumer>
        {value => {
          const {isDarkTheme, favouriteList} = value
          const favouriteListLength = favouriteList.length
          const view = favouriteListLength === 0
          const DarkThemeHeading = isDarkTheme ? 'dark-theme-heading' : ' '
          return (
            <>
              <Header activeTab="FAVOURITE" />
              <div className="favourite-books-main-container">
                {view ? (
                  this.renderEmptyview()
                ) : (
                  <div className="favourites-content-container">
                    <h1
                      className={`favourite-text-heading ${DarkThemeHeading}`}
                    >
                      My Favorites
                    </h1>
                    <ul className="favourite-book-list-container">
                      {favouriteList.map(eachBookItem => (
                        <FavouriteBookItem
                          key={eachBookItem.id}
                          bookDetails={eachBookItem}
                        />
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )
        }}
      </BookHubContext.Consumer>
    )
  }
}
export default FavouriteBooks
