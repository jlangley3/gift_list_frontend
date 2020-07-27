import React, { Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import 'moment-timezone';

import { fetchingUser, clearLoading } from './redux/actions/users';
import { isEmpty } from 'lodash';
import { Image, Segment, Dimmer, Loader } from 'semantic-ui-react';
import Navbar from './components/Navbar';

import Profile from './components/Profile';
import LoginForm from './components/LoginForm';
import EventForm from './components/NewEventForm';
import NotFound from './components/NotFound';
import StatsContainer from './containers/StatsContainer';
import CalendarContainer from './containers/CalendarContainer';
import ContactCardContainer from './containers/ContactContainer'
import ContactForm from './components/ContactForm';
import NewUserContainer from './containers/NewUserContainer';
import ContactShow from './components/ContactShow';
import EventShow from './components/EventShow';
import Homepage from './containers/HomeContainer';
import Footer from './components/Footer';

import Ed from "./images/Ed.jpg"
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
    const divStyle = {
      color: 'blue',
      backgroundColor: 'black',
    };
    if (this.props.loading) {
      return (
        // <div className="App" style={divStyle}>
        //   <Navbar />
        //   <div className='loading'>
        //     <Image
        //       centered src={Ed} />
        //   </div>
        //   <Footer />
        // </div>
   
        <Dimmer active inverted>
          <Loader size='massive'>Loading</Loader>
        </Dimmer>
  

      )
    } else {
    return (
      <Fragment>
        <Navbar  />
        <div className="App" >
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

        <Route exact path='/signup' render={() => {
                return isEmpty(this.props.user) ? <NewUserContainer /> : <Redirect to='/' />
              }}
              />

        <Route exact path='/profile' render={() => {
                return !isEmpty(this.props.user) ? <Profile /> : <Redirect to='/login' />
              }} 
              />

        <Route exact path='/contacts' render={() => {
                return !isEmpty(this.props.user) ? <ContactCardContainer /> : <Redirect to='/login' />
              }}
              />
        <Route exact path='/stats' render={() => {
                return !isEmpty(this.props.user) ? <StatsContainer /> : <Redirect to='/login' />
              }}
              />          
          <Route exact path='/events/:id' render={props => {
                const eventId = parseInt(props.match.params.id)
                const list = this.props.events.find(event=> event.id === eventId)
                return !isEmpty(this.props.user) && list ? (
                  <div className='contact-details'>
                    <EventShow event={list} /> 
                  </div>
                ) : <Redirect to='/' />
              }}
              />

          <Route exact path='/contacts/:id' render={props => {
                const contactId = parseInt(props.match.params.id)
                const contact = this.props.contacts.find(contact => contact.id === contactId)
                return !isEmpty(this.props.user) && contact ? (
                  <div className='contact-details'>
                    <ContactShow contact={contact} /> 
                  </div>
                ) : <Redirect to='/contacts' />
              }}
              />

          <Redirect from='*' to='/' />
          <Route component={NotFound} />
        </Switch>
        <Footer />
        </div>
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
    events: state.events,
    currentEvent: state.currentEvents
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingUser: (token) => dispatch(fetchingUser(token)),
    clearLoading: () => dispatch(clearLoading())
  
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


