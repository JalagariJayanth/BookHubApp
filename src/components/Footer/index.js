import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import BookHubContext from '../../context/BookHubContext'
import './index.css'

const Footer = () => (
  <BookHubContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const textColor = !isDarkTheme ? 'light-theme-text' : 'dark-theme-text'
      // console.log(textColor)
      return (
        <div className="footer-container">
          <div className="footer-icons-container">
            <button type="button" className="footer-icon-button">
              <FaGoogle className={textColor} size={21} />
            </button>
            <button type="button" className="footer-icon-button">
              <FaTwitter className={textColor} size={21} />
            </button>
            <button type="button" className="footer-icon-button">
              <FaInstagram className={textColor} size={21} />
            </button>
            <button type="button" className="footer-icon-button">
              <FaYoutube className={textColor} size={21} />
            </button>
          </div>
          <p className={`footer-text ${textColor}`}>Contact Us</p>
        </div>
      )
    }}
  </BookHubContext.Consumer>
)

export default Footer
