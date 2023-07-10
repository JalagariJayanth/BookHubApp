import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Loader from 'react-loader-spinner'
import './index.css'
import BookHubContext from '../../context/BookHubContext'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class TopRatedBooks extends Component {
  state = {apiStatus: apiStatusConstants.initial, BookLists: []}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getFormatedData = bookdata => ({
    id: bookdata.id,
    coverPic: bookdata.cover_pic,
    title: bookdata.title,
    authorName: bookdata.author_name,
  })

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const topRatedBooksUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(topRatedBooksUrl, options)
    // console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.books.map(eachBook =>
        this.getFormatedData(eachBook),
      )
      // console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        BookLists: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onClickTryAgain = () => {
    this.getTopRatedBooks()
  }

  renderFailureView = () => (
    <BookHubContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const darkdescriptionText = isDarkTheme
          ? 'top-rated-books-dark-description-text'
          : ''
        return (
          <div className="top-ratedbooks-failure-view-container">
            <img
              src="https://res.cloudinary.com/dau2bi3nn/image/upload/v1688889323/Group_7522_wamqka.png"
              className="failure-view-img"
              alt="failure view"
            />
            <p className={`failure-view-text ${darkdescriptionText}`}>
              Something went wrong, Please try again.
            </p>
            <button
              type="button"
              onClick={this.onClickTryAgain}
              className="tryAgain-button"
            >
              Try Again
            </button>
          </div>
        )
      }}
    </BookHubContext.Consumer>
  )

  renderSuccessView = () => {
    const {BookLists} = this.state
    return (
      <BookHubContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const darkSlickBookHeadingText = isDarkTheme
            ? 'top-rated-books-dark-heading-text'
            : ''
          const darkSlickBookdescriptionText = isDarkTheme
            ? 'top-rated-books-dark-description-text'
            : ''

          return (
            <div className="slider-container">
              <Slider {...settings}>
                {BookLists.map(eachBook => {
                  const {id, coverPic, title, authorName} = eachBook
                  return (
                    <Link
                      to={`/books/${id}`}
                      className="slider-book-link"
                      key={id}
                    >
                      <div className="slick-item" key={id}>
                        <img
                          src={coverPic}
                          className="slick-book-coverpic"
                          alt="book_image"
                        />
                        <h1
                          className={`book-slick-title ${darkSlickBookHeadingText}`}
                        >
                          {title}
                        </h1>
                        <p
                          className={`book-slick-author-name ${darkSlickBookdescriptionText}`}
                        >
                          {authorName}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </Slider>
            </div>
          )
        }}
      </BookHubContext.Consumer>
    )
  }

  renderTopRatedBooksSection = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    return (
      <BookHubContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const DarkBgTopratedbooks = isDarkTheme
            ? 'bg-dark-top-rated-books'
            : ''
          const darkHeadingText = isDarkTheme
            ? 'top-rated-books-dark-heading-text'
            : ''
          return (
            <>
              <div
                className={`toprated-books-container ${DarkBgTopratedbooks}`}
              >
                <div className="top-rated-books-header-container">
                  <h1 className={`top-rated-books-heading ${darkHeadingText}`}>
                    Top Rated Books
                  </h1>
                  <Link to="/shelf">
                    <button type="button" className="find-books-desktop-btn">
                      Find Books
                    </button>
                  </Link>
                </div>
                {this.renderTopRatedBooksSection()}
              </div>
              {apiStatus === apiStatusConstants.success && <Footer />}
            </>
          )
        }}
      </BookHubContext.Consumer>
    )
  }
}
export default TopRatedBooks
