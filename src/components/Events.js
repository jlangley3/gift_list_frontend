import React, {Component, Fragment} from "react"
import { Card, Image } from "semantic-ui-react";
import { withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";
import { fetchingUser } from '../redux/actions/users';


class Events extends Component {
    render() {
   
        let { budget, date, title, id} = this.props.event
        return (
            <Fragment>
            <Card as={Link} to={`/events/${id}`}>
               <Image src="https://www.eventelephant.com/wp-content/uploads/2019/01/EventElephant.jpg" alt="No Picture" />
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