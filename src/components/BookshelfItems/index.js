import BookHubContext from '../../context/BookHubContext'

import './index.css'

const BookshelfItems = props => {
  const {shelveItemDetails, isActive, updateactiveBookShelfItem} = props
  const {label} = shelveItemDetails
  const activeBookShelfValue = shelveItemDetails.value

  const activeShelfColor = isActive ? 'active-item' : ''

  const onClickShelfItem = () => {
    updateactiveBookShelfItem(activeBookShelfValue)
  }

  return (
    <BookHubContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const DarkThemeColor = isDarkTheme ? 'dark-theme-text-color' : ''
        return (
          <li className="book-shelf-item">
            <button
              type="button"
              className={`book-shelf-button ${activeShelfColor} ${DarkThemeColor}`}
              onClick={onClickShelfItem}
            >
              {label}
            </button>
          </li>
        )
      }}
    </BookHubContext.Consumer>
  )
}
export default BookshelfItems
