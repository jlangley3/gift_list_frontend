import React, {Component, Fragment} from "react"
import { Card, Image, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import { fetchingUser } from '../redux/actions/users';


class Gifts extends Component {
    render() {
        let { name, link, price, rating, } = this.props.gift
        return (
            <Fragment>
            <Card>
            <Icon name='gift' size='massive' color='green' />
               <Card.Content>
                 <Card.Header>{name}</Card.Header>
         
                 <Card.Description>{"Price: "}{price}{"  Rating: "}{rating}</Card.Description>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Gifts));