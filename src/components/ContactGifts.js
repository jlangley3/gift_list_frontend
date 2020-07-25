import React, {Component, Fragment} from "react"
import { Card, Image } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import {connect} from "react-redux";
import { fetchingUser } from '../redux/actions/users';


class ContactGifts extends Component {
    render() {
        let { name} = this.props.gift
        return (
            <Fragment>
                <Card>
               {/* <Image src="https://www.netclipart.com/pp/m/402-4026927_blank-avatar-black-png.png" alt="No Picture" /> */}
               <Card.Content>
                 <Card.Header>{name}</Card.Header>
         
                 {/* <Card.Description>{"Birthday: "}{birthday}</Card.Description> */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactGifts));