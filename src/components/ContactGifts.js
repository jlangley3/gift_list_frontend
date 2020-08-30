import React, {Component, Fragment} from "react"
import { Card, Icon } from "semantic-ui-react";
import { withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { fetchingUser } from '../redux/actions/users';
import moment from 'moment';

class ContactGifts extends Component {

  giftDateFinder = () => {
       const newDate = this.props.events.find(event => event.id === this.props.gift.event_id)
       return moment(newDate.start_date).format('ll')
  }

    render() {
        let { name, price} = this.props.gift
        return (
            <Fragment>
              {this.props.gift.name !== "TBD" ? 
                <Card>
               <Card.Content>
                 <Card.Header>{name}</Card.Header>
                 <Card.Description><Icon name='checked calendar' color="red" size="small"/>{"Date Given: "}{this.giftDateFinder()}</Card.Description>
                 <Card.Description><Icon name='gift' color="green" size="small"/>{"Price: $"}{price}</Card.Description>
               </Card.Content>
             </Card>
             :
             null}
            </Fragment>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    events: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingUser: (token) => dispatch(fetchingUser(token))
   
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactGifts));