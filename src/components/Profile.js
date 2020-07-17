import React, { Fragment } from "react";
import { Card, Image } from "semantic-ui-react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import { fetchingUser } from '../redux/actions/users'
import Events from "./Events.js"

class Profile extends React.Component{

  render() {
    let {avatar, username, first_name, last_name} = this.props.user

    return (
       <Fragment>
   <Card>
      <Image src={avatar} alt="No Picture" />
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Description>{first_name}{"   "}{last_name}</Card.Description>
      </Card.Content>
    </Card>
         {this.props.user.events.map(event => { return <Events key={event.id} event={event}/>})}
       </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingUser: (token) => dispatch(fetchingUser(token))
   
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));

