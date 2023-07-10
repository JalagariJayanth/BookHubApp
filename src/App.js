import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import BookHubContext from './context/BookHubContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Bookshelves from './components/Bookshelves'
import BookItemDetails from './components/BookItemDetails'
import FavouriteBooks from './components/FavouriteBooks'

import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {isDarkTheme: false, favouriteList: []}

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  addToFavourite = book => {
    const {favouriteList} = this.state
    const bookObject = favouriteList.find(eachBook => eachBook.id === book.id)
    if (bookObject === undefined) {
      this.setState(prevState => ({
        favouriteList: [...prevState.favouriteList, book],
      }))
    }
  }

  removeFavorite = id => {
    const {favouriteList} = this.state
    const updateFavouriteList = favouriteList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({favouriteList: updateFavouriteList})
  }

  render() {
    const {isDarkTheme, favouriteList} = this.state
    const AppBackgroundContainer = isDarkTheme
      ? 'dark-theme-container'
      : 'light-theme-container'

    return (
      <BookHubContext.Provider
        value={{
          toggleTheme: this.toggleTheme,
          addToFavourite: this.addToFavourite,
          removeFavorite: this.removeFavorite,
          isDarkTheme,
          favouriteList,
        }}
      >
        <div className={`app-bg-container ${AppBackgroundContainer}`}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/shelf" component={Bookshelves} />
            <ProtectedRoute
              exact
              path="/books/:id"
              component={BookItemDetails}
            />
            <ProtectedRoute
              exact
              path="/favourites"
              component={FavouriteBooks}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </BookHubContext.Provider>
    )
  }
}

export default App
