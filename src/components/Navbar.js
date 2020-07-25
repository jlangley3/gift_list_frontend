import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Menu, Icon, Image } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import { logoutUser } from '../redux/actions/users';
import Header from "../images/Header.png";
import '../styles/Nav.css';

class NavBar extends Component {

  logout = () => {
    localStorage.clear('token')
     this.props.logoutUser()
  }


  render() {
    return (
      <nav>
        <Menu 
          
          >
          { !isEmpty(this.props.user) ?
          <React.Fragment>
            <Menu.Item  header src={Header}>
              <Image as={ Link } to='/profile' src={Header} size="small"/></Menu.Item>
            <Menu.Item 
              name='profile' 
              as={ Link } to='/profile'
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
              <Icon name='address book outline' size='big' color='green'/>

            </Menu.Item> 
            {/* <Menu.Item 
              name='event_form' 
              as={ Link } to='/new_event'
            >
              <Icon name='add' size='large' color='green'/>

            </Menu.Item>  */}

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
  return { user: state.user }
}

const mapDispatchToProps = (dispatch )=> {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))

