import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import BookHubContext from '../../context/BookHubContext'
import BookItem from '../BookItem'
import BookshelfItems from '../BookshelfItems'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    activeBookShelfItem: bookshelvesList[0].value,
    booksList: [],
  }

  componentDidMount() {
    this.getBooksData()
  }

  getFormatedData = book => ({
    id: book.id,
    title: book.title,
    authorName: book.author_name,
    readStatus: book.read_status,
    coverPic: book.cover_pic,
    rating: book.rating,
  })

  getBooksData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeBookShelfItem, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeBookShelfItem}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formatedData = data.books.map(eachBook =>
        this.getFormatedData(eachBook),
      )
      this.setState({
        apiStatus: apiStatusConstants.success,
        booksList: formatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateactiveBookShelfItem = activeItem => {
    this.setState({activeBookShelfItem: activeItem}, this.getBooksData)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    this.getBooksData()
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <BookHubContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const darkThemeContainer = isDarkTheme
            ? 'dark-search-input-container'
            : ''
          const darkThemeSearchInput = isDarkTheme ? 'dark-search-input' : ''
          const darkSearchButton = isDarkTheme ? 'dark-search-button' : ''
          const darkSearchIcon = isDarkTheme ? 'dark-search-icon' : ''

          return (
            <div className={`search-input-container ${darkThemeContainer}`}>
              <input
                type="search"
                value={searchInput}
                className={`search-input-field ${darkThemeSearchInput}`}
                placeholder="Search..."
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                testid="searchButton"
                className={`search-button ${darkSearchButton}`}
                onClick={this.onClickSearchIcon}
              >
                <BsSearch className={`search-icon ${darkSearchIcon}`} />
              </button>
            </div>
          )
        }}
      </BookHubContext.Consumer>
    )
  }

  renderBookShelfItems = () => {
    const {activeBookShelfItem} = this.state
    return (
      <BookHubContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const darkThemeShelveBg = isDarkTheme
            ? 'dark-theme-bg-shelves-container'
            : ''
          const darkThemeHeading = isDarkTheme
            ? 'dark-theme-shelves-items-heading'
            : ''
          return (
            <div className={`bookshlef-items-container ${darkThemeShelveBg}`}>
              <div className="search-input-mobile-container">
                {this.renderSearchInput()}
              </div>
              <h1 className={`bookshelf-heading ${darkThemeHeading}`}>
                Bookshelves
              </h1>
              <ul className="shelf-items-container">
                {bookshelvesList.map(eachItem => (
                  <BookshelfItems
                    key={eachItem.id}
                    shelveItemDetails={eachItem}
                    isActive={eachItem.value === activeBookShelfItem}
                    updateactiveBookShelfItem={this.updateactiveBookShelfItem}
                  />
                ))}
              </ul>
            </div>
          )
        }}
      </BookHubContext.Consumer>
    )
  }

  renderBooksHeadingSearchContainer = () => {
    const {activeBookShelfItem} = this.state
    const {label} = bookshelvesList.find(
      eachItem => eachItem.value === activeBookShelfItem,
    )
    return (
      <BookHubContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const darkThemeHeading = isDarkTheme
            ? 'dark-theme-shelves-items-heading'
            : ''
          return (
            <div className="books-section-heading-search-container">
              <h1 className={`books-section-heading ${darkThemeHeading}`}>
                {label} Books
              </h1>
              <div className="search-input-desktop-container">
                {this.renderSearchInput()}
              </div>
            </div>
          )
        }}
      </BookHubContext.Consumer>
    )
  }

  renderLoader = () => (
    <div className="book-shelves-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onClickTryAgainbutton = () => {
    this.getBooksData()
  }

  renderFailureView = () => (
    <BookHubContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const darkThemeText = isDarkTheme ? 'dark-theme-text' : ''
        return (
          <div className="book-shelves-failure-view-container">
            <img
              src=""
              alt="failure view"
              className="book-shelves-failure-view-image"
            />
            <p
              className={`books-shelves-failure-view-description ${darkThemeText}`}
            >
              Something went wrong, Please try again.
            </p>
            <button
              type="button"
              className="button-tryAgain"
              onClick={this.onClickTryAgainbutton}
            >
              Try Again
            </button>
          </div>
        )
      }}
    </BookHubContext.Consumer>
  )

  renderNoBooksView = () => {
    const {searchInput} = this.state
    const searchValue = searchInput
    return (
      <BookHubContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const darkThemeText = isDarkTheme ? 'dark-theme-text' : ''
          return (
            <div className="no-books-view-container">
              <img
                src="https://res.cloudinary.com/dau2bi3nn/image/upload/v1688965659/Asset_1_1_aqcspy.png"
                alt="no books"
                className="no-books-view-image"
              />
              <p className={`no-books-view-text ${darkThemeText}`}>
                Your search for {searchValue} did not find any matches.
              </p>
            </div>
          )
        }}
      </BookHubContext.Consumer>
    )
  }

  renderSuccessView = () => {
    const {booksList} = this.state
    const booksListLength = booksList.length
    const BooksView = booksListLength === 0

    return (
      <>
        {BooksView ? (
          this.renderNoBooksView()
        ) : (
          <>
            <div className="book-hub-shelf-books-container">
              <ul className="all-books-list-items">
                {booksList.map(eachBook => (
                  <BookItem key={eachBook.id} bookDetails={eachBook} />
                ))}
              </ul>
            </div>

            <Footer />
          </>
        )}
      </>
    )
  }

  renderStatusBooksSection = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderBooksSection = () => (
    <div className="books-main-container">
      {this.renderBooksHeadingSearchContainer()}
      {this.renderStatusBooksSection()}
    </div>
  )

  render() {
    return (
      <>
        <Header activeTab="SHELF" />
        <div className="bookshelves-main-container">
          {this.renderBookShelfItems()}
          {this.renderBooksSection()}
        </div>
      </>
    )
  }
}
export default Bookshelves
