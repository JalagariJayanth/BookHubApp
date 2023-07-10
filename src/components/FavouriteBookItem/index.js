import {Link} from 'react-router-dom'
import {AiFillCloseCircle} from 'react-icons/ai'

import BookHubContext from '../../context/BookHubContext'
import './index.css'

const FavouriteBookItem = props => (
  <BookHubContext.Consumer>
    {value => {
      const {isDarkTheme, removeFavorite} = value
      const {bookDetails} = props
      const {id, title, authorName, coverPic} = bookDetails

      const darkThemebgContainer = isDarkTheme ? 'dark-theme-bg-container' : ''
      const darkThemeHeading = isDarkTheme ? 'dark-theme-heading' : ' '
      const darkThemeDescription = isDarkTheme ? 'dark-theme-description' : ' '
      const iconColor = isDarkTheme ? '#d3d3d3' : '#616E7C'

      const onRemoveBookItem = () => {
        removeFavorite(id)
      }

      return (
        <li className={`favourite-book-item-container ${darkThemebgContainer}`}>
          <div className="favourite-book-content">
            <Link to={`/books/${id}`} className="fav-link-item">
              <img src={coverPic} alt={title} className="book-image" />
              <div className="Books-details-container">
                <h1 className={`book-title ${darkThemeHeading}`}>{title}</h1>
                <p className={`book-author ${darkThemeDescription}`}>
                  {authorName}
                </p>
              </div>
            </Link>

            <button
              onClick={onRemoveBookItem}
              testid="remove"
              type="button"
              className="remove-button"
            >
              <AiFillCloseCircle color={`${iconColor}`} size={20} />
            </button>
          </div>
        </li>
      )
    }}
  </BookHubContext.Consumer>
)

export default FavouriteBookItem
