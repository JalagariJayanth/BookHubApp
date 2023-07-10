import {Component} from 'react'
import Cookies from 'js-cookie'

import {BsFillStarFill} from 'react-icons/bs'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import BookHubContext from '../../context/BookHubContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    bookData: {},
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getFormatedData = data => ({
    aboutAuthor: data.about_author,
    aboutBook: data.about_book,
    authorName: data.author_name,
    coverPic: data.cover_pic,
    id: data.id,
    rating: data.rating,
    readStatus: data.read_status,
    title: data.title,
  })

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formatedData = this.getFormatedData(data.book_details)
      this.setState({
        apiStatus: apiStatusConstants.success,
        bookData: formatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTryAgain = () => {
    this.getBookDetails()
  }

  renderFailureView = () => (
    <BookHubContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const darkThemeDescription = isDarkTheme ? 'dark-theme-description' : ''
        return (
          <div className="book-details-failure-view">
            <img
              src="https://res.cloudinary.com/dau2bi3nn/image/upload/v1688889323/Group_7522_wamqka.png"
              className="failure-view-img"
              alt="failure view"
            />
            <p className={`failure-view-description ${darkThemeDescription}`}>
              Something went wrong, Please try again.
            </p>
            <button
              onClick={this.onClickTryAgain}
              type="button"
              className="tryAgain-btn"
            >
              Try Again
            </button>
          </div>
        )
      }}
    </BookHubContext.Consumer>
  )

  renderSuccessView = () => {
    const {bookData} = this.state
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      rating,
      id,
      title,
      readStatus,
    } = bookData
    return (
      <BookHubContext.Consumer>
        {value => {
          const {isDarkTheme, addToFavourite, favouriteList} = value

          const booksDetailsBgContainer = isDarkTheme
            ? 'booksDetails-darkBg-Container'
            : ''
          const darkThemeHeading = isDarkTheme ? 'dark-theme-heading' : ''
          const darkThemeDescription = isDarkTheme
            ? 'dark-theme-description'
            : ''

          const onClickFavBtn = () => {
            const checkBook = favouriteList.find(eachBook => eachBook.id === id)
            const add = checkBook !== undefined
            if (!add) {
              addToFavourite({...bookData})
            }
          }

          return (
            <div
              className={`book-details-content-container ${booksDetailsBgContainer}`}
            >
              <div className="book-details-container">
                <img src={coverPic} alt={title} className="book-details-pic" />
                <div className="basic-book-info-container">
                  <h1 className={`book-title ${darkThemeHeading}`}>{title}</h1>
                  <p className={`book-author-name ${darkThemeDescription}`}>
                    {authorName}
                  </p>
                  <div className="rating-container">
                    <p className={`rating-text ${darkThemeDescription}`}>
                      Avg Rating
                    </p>
                    <BsFillStarFill color="#FBBF24" size={18} />
                    <p className={`rating ${darkThemeDescription}`}>{rating}</p>
                  </div>
                  <p className={`status-text ${darkThemeDescription}`}>
                    Status: <span className="status">{readStatus}</span>
                  </p>
                  <button
                    type="button"
                    onClick={onClickFavBtn}
                    className="favouriteBtn"
                  >
                    Add to Favourite
                  </button>
                </div>
              </div>
              <hr className="horizontal-line" />
              <h1 className={`bottom-section-heading ${darkThemeHeading}`}>
                About Author
              </h1>
              <p className={`bottom-section-des ${darkThemeDescription}`}>
                {aboutAuthor}
              </p>
              <h1 className={`bottom-section-heading ${darkThemeHeading}`}>
                About Book
              </h1>
              <p className={`bottom-section-des ${darkThemeDescription}`}>
                {aboutBook}
              </p>
            </div>
          )
        }}
      </BookHubContext.Consumer>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderDetails = () => {
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

  render() {
    const {apiStatus} = this.state
    return (
      <>
        <Header />
        <div className="book-details-main-container">
          {this.renderDetails()}
        </div>
        {apiStatus === apiStatusConstants.success && <Footer />}
      </>
    )
  }
}
export default BookItemDetails
