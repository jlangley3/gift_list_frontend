import React from 'react'
import { connect } from 'react-redux'
import { addingUser, updatingUser} from '../redux/actions'
import { Segment, Grid, Button } from 'semantic-ui-react'
import Goku from "../images/goku.jpg";

class Register extends React.Component {
  constructor(){
    super()
    this.state = {
      avatar: "",
      first_name: '',
      last_name: '',
      username: '',
      password: ''
 
    }
  }

  componentDidMount() {
    if (this.props.user.id) {
      const { id, avatar,first_name, last_name, username } = this.props.user
      this.setState({ id, avatar, first_name, last_name, username })
    }
  }


  handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      })
  }

  handleSubmit = () => {
      this.props.addingUser(this.state)
      this.resetState()

  }

 

  resetState = () => {
    this.setState({
      avatar: "",
      first_name: '',
      last_name: '',
      username: '',
      password: ''
    })
  }

  render(){
    const { avatar, first_name, last_name, username, password } = this.state
    return(
      <Segment raised>
        <Grid columns={2}>
        <Grid.Column>
        <div className="ui form">
        <Segment compact>
        <img className='ui small image' src={ avatar } alt='Your avatar goes here'/>
        </Segment>
        <label htmlFor='avatar'>Avatar: </label><br />
        <input type='text' name='avatar' value={ avatar } onChange={this.handleChange}></input><br />
        </div>
          </Grid.Column>
          <Grid.Column>
          <div className='ui form'>
          <label htmlFor='first_name'>First Name: </label>
          <input type='text' name='first_name' value={ first_name } onChange={this.handleChange}></input><br /> 
          <label htmlFor='last_name'>Last Name: </label>
          <input type='text' name='last_name' value={ last_name } onChange={this.handleChange}></input><br /> 
          <label htmlFor='username'>Username: </label>
          <input type='text' name='username' value={ username } onChange={this.handleChange}></input><br />
          <label htmlFor='password'>Password: </label>
          <input type='password' name='password' value={ password } onChange={this.handleChange}></input><br />
          <Button onClick={this.handleSubmit} >Submit</Button>
          </div>
        </Grid.Column>
        </Grid>
      </Segment>
    )

  }

}

const mapStateToProps = state => {
  return {
    user: state.user,
    notifications: state.notifications
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addingUser: (contact) => dispatch(addingUser(contact)),
    updatingUser: (user, id) => dispatch(updatingUser(user, id))
   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)