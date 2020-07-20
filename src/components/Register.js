import React from 'react'
import { connect } from 'react-redux'
import { addingUser, updatingUser, clearError } from '../redux/actions'
import { Segment, Grid, Button } from 'semantic-ui-react'

class Register extends React.Component {
  constructor(){
    super()
    this.state = {
      avatar: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a1ef46f1-9f1e-4542-8632-9441452f929f/d8ps1ub-8813fb32-6d9f-41cc-bace-da6a88708528.jpg/v1/fill/w_768,h_768,q_75,strp/goku_ssj_facebook_profil_by_mjd360_d8ps1ub-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD03NjgiLCJwYXRoIjoiXC9mXC9hMWVmNDZmMS05ZjFlLTQ1NDItODYzMi05NDQxNDUyZjkyOWZcL2Q4cHMxdWItODgxM2ZiMzItNmQ5Zi00MWNjLWJhY2UtZGE2YTg4NzA4NTI4LmpwZyIsIndpZHRoIjoiPD03NjgifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Y7tLWTAFNHwto9jSmxFbwK18QFmsIWC-2_Hpk5c-jnk',
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      id: null
    }
  }

  componentDidMount() {
    if (this.props.user.id) {
      const { id, avatar,first_name, last_name, username } = this.props.user
      this.setState({ id, avatar, first_name, last_name, username })
    }
  }


  handleChange = e => {
    if (e.target.name !== 'photo'){
      this.setState({
        [e.target.name]: e.target.value
      })
    } else {
      this.setState({
        [e.target.name]: e.target.files[0]
      })
    }
  }

  handleSubmit = () => {

      this.props.addingUser(this.state)
      this.resetState()

  }

 

  resetState = () => {
    this.setState({
      avatar: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a1ef46f1-9f1e-4542-8632-9441452f929f/d8ps1ub-8813fb32-6d9f-41cc-bace-da6a88708528.jpg/v1/fill/w_768,h_768,q_75,strp/goku_ssj_facebook_profil_by_mjd360_d8ps1ub-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD03NjgiLCJwYXRoIjoiXC9mXC9hMWVmNDZmMS05ZjFlLTQ1NDItODYzMi05NDQxNDUyZjkyOWZcL2Q4cHMxdWItODgxM2ZiMzItNmQ5Zi00MWNjLWJhY2UtZGE2YTg4NzA4NTI4LmpwZyIsIndpZHRoIjoiPD03NjgifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Y7tLWTAFNHwto9jSmxFbwK18QFmsIWC-2_Hpk5c-jnk',
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      id: null
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
        <img className='ui small image' src={ avatar } alt='user_avatar'/>
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
    updatingUser: (user, id) => dispatch(updatingUser(user, id)),
    clearError: () => dispatch(clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)