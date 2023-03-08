import './App.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import PasswordItem from './Components/PasswordItem'

class App extends Component {
  state = {
    passwordsList: [],
    website: '',
    user: '',
    password: '',
    search: '',
    showPassword: false,
  }

  onChangeOfPasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onChangeOfWebsiteInput = event => {
    this.setState({website: event.target.value})
  }

  onChangeOfUserInput = event => {
    this.setState({user: event.target.value})
  }

  onAddNewPassword = event => {
    event.preventDefault()
    const {user, password, website} = this.state
    const newPassword = {
      id: uuidv4(),
      name: user,
      userPassword: password,
      websiteName: website,
    }
    this.setState(prev => ({
      passwordsList: [...prev.passwordsList, newPassword],
      user: '',
      password: '',
      website: '',
    }))
  }

  renderNoPasswordsContainer = () => {
    const noPasswordsContainer = (
      <div className="no-password-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="no-passwords-image"
        />
        <p className="no-passwords-text">No Passwords</p>
      </div>
    )
    return noPasswordsContainer
  }

  onChangeOfSearchInput = event => {
    this.setState({search: event.target.value})
  }

  onClickDeleteBtn = id => {
    const {passwordsList} = this.state
    const reqListAfterDelete = passwordsList.filter(each => each.id !== id)
    this.setState({passwordsList: reqListAfterDelete})
  }

  onChangeOfCheckBoxStatus = event => {
    this.setState(prev => ({showPassword: !prev.showPassword}))
  }

  render() {
    const {
      passwordsList,
      website,
      user,
      password,
      search,
      showPassword,
    } = this.state

    const filteredList = passwordsList.filter(each =>
      each.websiteName.toLowerCase().includes(search.toLowerCase()),
    )
    console.log(filteredList)

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="login-container1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-image"
          />
          <form className="form-container" onSubmit={this.onAddNewPassword}>
            <h1 className="form-heading">Add New Password</h1>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="website-image"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input-element"
                value={website}
                onChange={this.onChangeOfWebsiteInput}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="website-image"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="input-element"
                value={user}
                onChange={this.onChangeOfUserInput}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="website-image"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="input-element"
                value={password}
                onChange={this.onChangeOfPasswordInput}
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
        </div>
        <div className="login-container2">
          <div className="passwords-count-container">
            <h1 className="password-count-heading">
              Your Passwords
              <p className="count-span"> {passwordsList.length}</p>
            </h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="website-image"
              />
              <input
                type="search"
                placeholder="Search"
                className="password-input"
                value={search}
                onChange={this.onChangeOfSearchInput}
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox-input"
              value={showPassword}
              onChange={this.onChangeOfCheckBoxStatus}
            />
            <label htmlFor="checkbox" className="checkbox-label">
              Show Passwords
            </label>
          </div>
          {filteredList.length > 0 ? (
            <div className="password-list-container">
              <ul>
                {filteredList.map(each => (
                  <PasswordItem
                    itemDetails={each}
                    key={each.id}
                    showPasswordItem={showPassword}
                    onClickDelete={this.onClickDeleteBtn}
                  />
                ))}
              </ul>
            </div>
          ) : (
            this.renderNoPasswordsContainer()
          )}
        </div>
      </div>
    )
  }
}

export default App
