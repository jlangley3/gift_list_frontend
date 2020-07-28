import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Menu, Icon, Image, Header, Segment } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import { logoutUser } from '../redux/actions/users';
import { editCurrentEvent, updatingEvent } from '../redux/actions/events';
import { fetchingUser, clearLoading } from '../redux/actions/users';
import Head from "../images/Header.png";
import '../styles/Nav.css';

class NavBar extends Component {

  logout = () => {
    localStorage.clear('token')
     this.props.logoutUser()
  }


  render() {
    const token = localStorage.getItem('token')
    return (
      <nav>
        <Menu 
          
          >
          { !isEmpty(this.props.user) ?
          <React.Fragment>
            <Menu.Item  header src={Header}>
              <Image as={ Link } to='/home' src={Head} size="small" onClick={this.props.updatingEvent(this.props.currentEvent)}/></Menu.Item>
            <Menu.Item 
              name='home' 
              as={ Link } to='/home'
            >
              <Icon name='home' size='big' color='green' />
            </Menu.Item>

            <Menu.Item 
              name='calendar' 
              as={ Link } to='/calendar'
            >
              <Icon name='calendar alternate outline' size='big' color='green'/>

            </Menu.Item> 


            {/* <Menu.Item 
              name='contact_form' 
              as={ Link } to="contacts/new"
              >
              <Icon name='address book' size='large' color='green'/>
              
            </Menu.Item>  */}
            <Menu.Item 
              name='contacts' 
              as={ Link } to="/contacts"
            >
              <Icon name='address book outline' size='big' color='green' onClick={() => this.props.fetchingUser(token)}/>

            </Menu.Item> 
            <Menu.Item 
              name='stats' 
              as={ Link } to='/stats'
            >
              <Icon name='chart bar' size='large' color='green' onClick={() => this.props.fetchingUser(token)}/>

            </Menu.Item> 
              <Segment basic>
             <Header as='h2' textAlign='center'>  Hello {this.props.user.username}!
                </Header> 
                </Segment>

            <Menu.Item 
              name='logout' 
              as={ Link } to="/login"
              position="right"
            >
              <Icon name='sign-out' size='large' color='red' onClick={this.logout}/>

            </Menu.Item> 

          </React.Fragment>
          : 

          <React.Fragment>
          <Menu.Item  header >
          <Image  src={Header} size="small"/></Menu.Item>
            <Menu.Item 
            name='login' 
            as={ Link } to="/login"
            position="left"
          >
            
            <Icon name='sign-in' size='large' color='green' onClick={this.logout}/>

          </Menu.Item> </React.Fragment>
          }
        </Menu>

      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    user: state.user,
  currentEvent: state.currentEvent }
}

const mapDispatchToProps = (dispatch )=> {
  return {
    logoutUser: () => dispatch(logoutUser()),
    updatingEvent: (event) => dispatch(updatingEvent(event)),
    editCurrentEvent: (e) => dispatch(editCurrentEvent(e)),
    fetchingUser: (token) => dispatch(fetchingUser(token)),
    clearLoading: () => dispatch(clearLoading())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))

