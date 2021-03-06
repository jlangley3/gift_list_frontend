import React, {Component, Fragment} from "react"
import { Label, Button } from "semantic-ui-react";
import {  withRouter } from "react-router-dom";
import {connect} from "react-redux";
import { fetchingUser } from '../redux/actions/users';
import { deletingInterests } from '../redux/actions';

class Interests extends Component {

handleDelete = () => {
  console.log("YOU DID IT!!!", this.props)
  this.props.deletingInterests(this.props.interest, this.props.contact)
}


    render() {
        let { name } = this.props.interest
        return (
            <Fragment>
            <Label  color="green">{name}</Label>
            <Button circular size="tiny" color="red" icon='trash' onClick={this.handleDelete}/>
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
    fetchingUser: (token) => dispatch(fetchingUser(token)),
    deletingInterests: (interest, contact) => dispatch(deletingInterests(interest, contact))
   
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Interests));