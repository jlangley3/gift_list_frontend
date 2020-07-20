import React, {Component, Fragment} from "react"
import { Card } from "semantic-ui-react";
import {  withRouter } from "react-router-dom";
import {connect} from "react-redux";
import { fetchingUser } from '../redux/actions/users';


class Reminders extends Component {
    render() {
        let { title, start_date, end_date} = this.props.reminder
        return (
            <Fragment>
            <Card>
               
               <Card.Content>
                 <Card.Header>{title}</Card.Header>
         
        <Card.Description>{start_date}{"  <-->  "}{end_date}</Card.Description>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reminders));