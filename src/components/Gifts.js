import React, {Component, Fragment} from "react"
import { Card, Image } from "semantic-ui-react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import { fetchingUser } from '../redux/actions/users';


class Gifts extends Component {
    render() {
        let { name, link, price, rating, } = this.props.gift
        return (
            <Fragment>
            <Card>
               <Image src="https://www.creativefabrica.com/wp-content/uploads/2018/10/Happy-Birthday-Gift-Green-and-Black-by-Surya-Darmawan-580x386.jpg" alt="No Picture" />
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