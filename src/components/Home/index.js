import {Link} from 'react-router-dom'

import Header from '../Header'
import BookHubContext from '../../context/BookHubContext'
import TopRatedBooks from '../TopRatedBooks'
import './index.css'

const Home = () => (
  <BookHubContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      const HeadingText = isDarkTheme
        ? 'dark-heading-text'
        : 'light-heading-text'
      const DescriptionText = isDarkTheme
        ? 'dark-description-text'
        : 'light-description-text'
      return (
        <>
          <Header activeTab="HOME" />
          <div className="home-main-container">
            <div className="home-content">
              <h1 className={HeadingText}>Find Your Next Favorite Books?</h1>
              <p className={DescriptionText}>
                You are in the right place. Tell us what titles or genres you
                have enjoyed in the past, and we will give you surprisingly
                insightful recommendations.
              </p>
              <Link to="/shelf">
                <button type="button" className="mobile-btn">
                  Find Books
                </button>
              </Link>
            </div>
            <TopRatedBooks />
          </div>
        </>
      )
    }}
  </BookHubContext.Consumer>
)
export default Home
