import React from "react";
import { withRouter } from "react-router";
import {connect} from "react-redux";
import { Link } from 'react-router-dom'
import { handlingLoginSubmit, clearError } from '../redux/actions/users';
import { Button, Grid, Form, Segment, Header } from "semantic-ui-react";
// import '../styles/Login.css';

class LoginForm extends React.Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

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
      <Grid.Row>
        <Grid.Row>
        <Header icon textAlign='center' as='h1'>Login</Header>
        </Grid.Row>
      <Segment>
        <Grid columns={2} relaxed='very' stackable centered >
        <Grid.Row>
        <Grid.Column>
        <Form
          onSubmit={this.handleSubmit}
          size="large"
          key="mini" 
          postition="center"
        >
          
          <Form.Group widths="equal" className='ui form'>
            <Form.Input
              className="field"
              label="username"
              placeholder="username"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
            <Form.Input
              className="field"
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
         </Grid.Column>
         </Grid.Row>
         <Grid.Column textAlign='center' verticalAlign='middle'>
                <Button content='Sign Up' as={ Link } to='/signup' icon='signup' size='big'/>
        </Grid.Column>
        </Grid>
      </Segment>
      </Grid.Row>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    user: state.user,
    error: state.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handlingLoginSubmit: (user) => dispatch(handlingLoginSubmit(user))
    
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));