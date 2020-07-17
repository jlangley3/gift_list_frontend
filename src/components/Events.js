import React, {Component, Fragment} from "react"
import { Card, Image } from "semantic-ui-react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import { fetchingUser } from '../redux/actions/users';


class Events extends Component {
    render() {
        let { budget, date, title} = this.props.event
        return (
            <Fragment>
            <Card>
               <Image src={this.props.user.avatar} alt="No Picture" />
               <Card.Content>
                 <Card.Header>{title}</Card.Header>
         
                 <Card.Description>{date}{"   "}{budget}</Card.Description>
               </Card.Content>
             </Card>
            </Fragment>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingUser: (token) => dispatch(fetchingUser(token))
   
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Events));