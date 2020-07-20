import React, { Component } from 'react'
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { Menu, Dropdown, Modal, Segment, Label, Icon, Popup, Feed } from 'semantic-ui-react'
import { isEmpty } from 'lodash'
import { logoutUser } from '../redux/actions/users'
// import '../styles/Nav.css';

class NavBar extends Component {

  logout = () => {
    localStorage.clear('token')
     this.props.logoutUser()
  }


  render() {
    return (
      <nav>
        <Menu 
          stackable
          >
          { !isEmpty(this.props.user) ?
          <React.Fragment>
            <Menu.Item position="center" header><h2>Gift List</h2></Menu.Item>
            <Menu.Item 
              name='profile' 
              as={ Link } to='/profile'
            >
              <Icon name='car' size='big' color='green' />
            </Menu.Item>

            <Menu.Item 
              name='calendar' 
              as={ Link } to='/calendar'
            >
              <Icon name='calendar' size='large'/>

            </Menu.Item> 


            <Menu.Item 
              name='event_form' 
              as={ Link } to='/new_event'
            >
              <Icon name='add' size='large' color='green'/>

            </Menu.Item> 
            <Menu.Item 
              name='contact_form' 
              as={ Link } to="contacts/new"
            >
              <Icon name='address book' size='large' color='green'/>

            </Menu.Item> 
            <Menu.Item 
              name='contacts' 
              as={ Link } to="/contacts"
            >
              <Icon name='find' size='large' color='green'/>

            </Menu.Item> 

            <Menu.Item 
              name='login' 
              position="right"
              as={ Link } to='/login'
            >
              <Icon name='sign-in' size='large' color='green'/>

            </Menu.Item> 
            <Menu.Item 
              name='logout' 
              as={ Link } to="/login"
              position="right"
            >
              <Icon name='sign-out' size='large' color='green' onClick={this.logout}/>

            </Menu.Item> 

          </React.Fragment>
          : 
            <Menu.Item header><h2>Gift List</h2></Menu.Item>
          }
        </Menu>

      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

const mapDispatchToProps = (dispatch )=> {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))

