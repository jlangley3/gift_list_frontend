import React, {Component, Fragment} from "react"
import { Card, Image, Icon } from "semantic-ui-react";
import { withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";
import { fetchingUser } from '../redux/actions/users';
import { setCurrentEvent } from '../redux/actions';
import moment from 'moment';

class Events extends Component {
    render() {
        let { budget, start_date, end_date, title, id} = this.props.event
        return (
            <Fragment>
            <Card onClick={() => {
              this.props.handleOpen("editEventModal", this.props.event)
              this.props.setEvent(this.props.event)
              this.props.setCurrentEvent(this.props.event)}}>
               <Icon name='gift' color="green" size="massive"/>
               <Card.Content>
                 <Card.Header>{title}</Card.Header>
         
                 <Card.Description>{`${ moment(start_date).format('ll')} - ${ moment(end_date).format('ll')} || Budget: $${budget}`}</Card.Description>
               </Card.Content>
             </Card>
            
            </Fragment>
        )
    }
}

// as={Link} to={`/events/${id}`}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingUser: (token) => dispatch(fetchingUser(token)),
    setCurrentEvent: (e) => dispatch(setCurrentEvent(e))
   
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Events));