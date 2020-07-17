import React, { Component } from 'react'
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { Menu, Dropdown, Modal, Segment, Label, Icon, Popup, Feed } from 'semantic-ui-react'
import { logoutUser } from '../redux/actions/users'

// import '../styles/Nav.css';



class NavBar extends Component {


  avatar = () => {
    return (
      <span>
        <Label
          size='large'
          color='green'
          circular>{`${this.props.user.username}`}
        </Label>
      </span>
    )
  }

  logout = () => {
    localStorage.clear('token')
    this.props.logoutUser()
  }

  render() {
    return (
      <nav>
        <Menu 
          inverted
          stackable
        >
        { this.props.user ?
          <React.Fragment>
            <Menu.Item 
              name='home' 
              as={ Link } to='/'
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
                name='login' 
                as={ Link } to='/login'
              >
                <Icon name='sign-in' size='large' color='green'/>

              </Menu.Item> 
              <Dropdown
                trigger={this.avatar()}
                pointing='top right' 
                icon={null}             
                >
                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

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

