import React from 'react'

const BookHubContext = React.createContext({
  isDarkTheme: false,
  favouriteList: [],
  toggleTheme: () => {},
  addToFavourite: () => {},
  removeFavorites: () => {},
})
export default BookHubContext
