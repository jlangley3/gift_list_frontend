import React, {Component, Fragment} from "react"
import { Card, Image } from "semantic-ui-react";
import { withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";
import { fetchingUser } from '../redux/actions/users';
import { setCurrentEvent } from '../redux/actions';
import EventPic from '../images/Event.jpg'
import moment from 'moment';

class Events extends Component {
    render() {
   
        let { budget, start_date, end_date, title, id} = this.props.event
        return (
            <Fragment>
            <Card as={Link} to={`/events/${id}`} onClick={() => this.props.setCurrentEvent(this.props.event)}>
               <Image src={EventPic} alt="No Picture" />
               <Card.Content>
                 <Card.Header>{title}</Card.Header>
         
                 <Card.Description>{`${ moment(start_date).format('ll')} - ${ moment(end_date).format('ll')} || Budget: $${budget}`}</Card.Description>
               </Card.Content>
             </Card>
            
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
    fetchingUser: (token) => dispatch(fetchingUser(token)),
    setCurrentEvent: (e) => dispatch(setCurrentEvent(e))
   
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Events));