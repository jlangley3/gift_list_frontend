import React, { Fragment } from "react";
import { withRouter } from "react-router";
import {connect} from "react-redux";
import { handlingLoginSubmit } from '../redux/actions/users'
import defaultProfile from '../images/Mario.jpeg';
import { Button, Form, Segment, Message } from "semantic-ui-react";
// import '../styles/Login.css';

class LoginForm extends React.Component {

  state = {
    username: "",
    password: ""
  };

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
      this.props.handlingLoginSubmit(this.state)
      this.resetForm()
  }

  resetForm = () => {
    this.setState({
      username: '',
      password: ''
    })
  }

 

  render() {
    return (
      <Segment>
        <Form
          onSubmit={this.handleSubmit}
          size="mini"
          key="mini" 
        >
          <Form.Group widths="equal">
            <Form.Input
              label="username"
              placeholder="username"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
            <Form.Input
              type="password"
              label="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Group>
          <Button type="submit">Login</Button>
        </Form>
      </Segment>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handlingLoginSubmit: (user) => dispatch(handlingLoginSubmit(user)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));