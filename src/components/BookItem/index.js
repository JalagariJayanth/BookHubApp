import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import BookHubContext from '../../context/BookHubContext'
import './index.css'

const BookItem = props => {
  const {bookDetails} = props
  const {id, title, coverPic, authorName, rating, readStatus} = bookDetails

  return (
    <BookHubContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const darkThemeHeading = isDarkTheme ? 'dark-theme-heading' : ''
        const darkThemeDescription = isDarkTheme ? 'dark-theme-description' : ''

        return (
          <Link to={`/books/${id}`} className="book-link-item">
            <div className="book-item-details-pic-info-main-container">
              <img className="book-item-cover-pic" src={coverPic} alt={title} />
              <div className="book-text-details-container">
                <h1 className={`book-item-title ${darkThemeHeading}`}>
                  {title}
                </h1>
                <p className={`book-item-author-name ${darkThemeDescription}`}>
                  {authorName}
                </p>
                <div className="book-item-rating-container">
                  <p
                    className={`book-item-rating-text ${darkThemeDescription}`}
                  >
                    Avg Rating
                  </p>
                  <BsFillStarFill color="#FBBF24" size={15} />
                  <p className={`book-item-rating ${darkThemeDescription}`}>
                    {rating}
                  </p>
                </div>
                <p className={`book-item-status-text ${darkThemeDescription}`}>
                  Status:
                  <span className="book-item-status"> {readStatus}</span>
                </p>
              </div>
            </div>
          </Link>
        )
      }}
    </BookHubContext.Consumer>
  )
}

export default BookItem
