import React, { Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import Moment from 'react-moment';
import 'moment-timezone';

import { fetchingUser, clearLoading } from './redux/actions/users';
import { isEmpty } from 'lodash';
import { Image } from 'semantic-ui-react';
import Navbar from './components/Navbar';

import Profile from './components/Profile';
import LoginForm from './components/LoginForm';
import EventForm from './components/EventForm';
import ReminderForm from './components/ReminderForm';
import NotFound from './components/NotFound';
import CalendarContainer from './containers/CalendarContainer';
import ContactCardContainer from './containers/ContactCardContainer'
import ContactForm from './components/ContactForm';
import NewUserContainer from './containers/NewUserContainer';
import EditUserContainer from './containers/EditUserContainer';
import ContactShow from './components/ContactShow';
import EventShow from './components/EventShow';
import Homepage from './containers/Homepage';
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
    if (this.props.loading) {
      return (
        <div className="App">
          <Navbar />
          <div className='loading'>
            <Image
              centered src='https://c4.wallpaperflare.com/wallpaper/624/484/858/green-cowboy-bebop-edward-black-background-1920x1080-anime-cowboy-bebop-hd-art-wallpaper-preview.jpg' />
          </div>
        </div>
      )
    } else {
    return (
      <Fragment>
        <Navbar  />
        <Switch>
        <Route exact path='/' render={() => {
                return isEmpty(this.props.user) ? <Redirect to='/login' /> : <Homepage />
              }}
              />
        <Route exact path='/login' render={() => {
                return isEmpty(this.props.user) ? <LoginForm /> : <Redirect to='/' />
              }}
              />
        <Route exact path='/profile' render={() => {
                return isEmpty(this.props.user) ? <Profile/> :<Redirect to='/login' />
              }}
              />
        <Route exact path='/calendar' render={() => {
                return !isEmpty(this.props.user) ? <CalendarContainer /> : <Redirect to='/login' />
              }}
              />
        <Route exact path='/new_event' render={() => {
                return !isEmpty(this.props.user) ? <EventForm /> : <Redirect to='/login' />
              }}
              />
        <Route exact path='/contacts/new' render={() => {
                return !isEmpty(this.props.user) ? <ContactForm /> : <Redirect to='/login' />
              }}
              />
        <Route exact path='/reminder_form' render={() => {
                return !isEmpty(this.props.user) ? <ReminderForm /> : <Redirect to='/login' />
              }}
              />

        <Route exact path='/signup' render={() => {
                return isEmpty(this.props.user) ? <NewUserContainer /> : <Redirect to='/' />
              }}
              />

        <Route exact path='/profile/edit' render={() => {
                return !isEmpty(this.props.user) ? <EditUserContainer /> : <Redirect to='/login' />
              }} 
              />
        <Route exact path='/profile' render={() => {
                return !isEmpty(this.props.user) ? <Profile /> : <Redirect to='/login' />
              }} 
              />

        <Route exact path='/friends' render={() => {
                return !isEmpty(this.props.user) ? <ContactCardContainer /> : <Redirect to='/login' />
              }}
              />
          
          <Route exact path='/events/:id' render={props => {
                const eventId = parseInt(props.match.params.id)
                const list = this.props.user.events.find(c => c.id === eventId)
                // const reminders = this.props.reminders.filter(r => r.contact_id === friendId)

                return !isEmpty(this.props.user) && list ? (
                  <div className='contact-details'>
                    <EventShow event={list} /> 
                  </div>
                ) : <Redirect to='/login' />
              }}
              />

          <Route exact path='/friends/:id' render={props => {
                const friendId = parseInt(props.match.params.id)
                const friend = this.props.contacts.find(c => c.id === friendId)
                // const reminders = this.props.reminders.filter(r => r.contact_id === friendId)

                return !isEmpty(this.props.user) && friend ? (
                  <div className='contact-details'>
                    <ContactShow contact={friend} /> 
                  </div>
                ) : <Redirect to='/login' />
              }}
              />

          <Redirect from='*' to='/' />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    )
  }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loading: state.loading,
    reminders: state.reminders,
    contacts: state.contacts,
    events: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingUser: (token) => dispatch(fetchingUser(token)),
    clearLoading: () => dispatch(clearLoading())
  
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


