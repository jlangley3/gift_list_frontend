import React, {Component, Fragment} from "react"
import { Label } from "semantic-ui-react";
import {  withRouter } from "react-router-dom";
import {connect} from "react-redux";
import { fetchingUser } from '../redux/actions/users';


class Interests extends Component {
    render() {
        let { name } = this.props.interest
        return (
            <Fragment>
            <Label color="green">{name}</Label>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Interests));