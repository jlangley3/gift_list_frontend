import React, { Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import { fetchingUser, clearLoading } from './redux/actions/users'

import Navbar from './components/Navbar';
import About from './components/About';
import Profile from './components/Profile'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import CalendarContainer from './containers/CalendarContainer';
import './App.css';

class App extends React.Component {

  componentDidMount(){

    const token = localStorage.getItem('token')

    if (token) {
      this.props.fetchingUser()
    } else {
      this.props.clearLoading()
    }
    
  }

  render(){
  
    return (
      <Fragment>
        <Navbar  />
        <Switch>
        <Route exact path='/' render={() => {
                return (this.props.user) ? <Redirect to='/login' /> : <Profile />
              }}
              />
        <Route exact path='/login' render={() => {
                return (this.props.user) ? <LoginForm /> : <Redirect to='/' />
              }}
              />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/about" component={About} />
          <Route exact path="/calendar" component={CalendarContainer} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loading: state.loading

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingUser: (token) => dispatch(fetchingUser(token)),
    clearLoading: () => dispatch(clearLoading())
  
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));



{/* <Route exact path="/" render={() => <Redirect to="/login" />} />
<Route exact path="/" render={() =>
  this.props.user ? <Profile
     />:
    <Redirect to="/login" />
} />
<Route exact path="/login" render={() =>
  this.props.user ?
  <Redirect to="/profile"/> :
  <LoginForm />
} /> */}