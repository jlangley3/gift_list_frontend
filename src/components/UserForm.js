import React from 'react'
import { connect } from 'react-redux'
import { addingUser, updatingUser, clearError } from '../redux/actions'
import { Segment, Grid, Button } from 'semantic-ui-react'
import { isEmpty } from 'lodash'
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';

class UserForm extends React.Component {
  constructor(){
    super()
    this.state = {
      avatar: 'https://ayogo.com/wp-content/uploads/2015/06/jp-avatar-placeholder.png',
      first_name: '',
      last_name: '',
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    if (this.props.user.id) {
      const { id, avatar, bio, first_name, last_name, email, username, splash_image } = this.props.user
      this.setState({ id, avatar, bio, first_name, last_name, email, username, splash_image })
    }
  }

  componentDidUpdate() {
    if (this.props.notifications.length >= 1 || !isEmpty(this.props.notifications)) {
      if (this.props.notifications.status !== 500) {
        console.log(isEmpty(this.props.notifications.message))
        this.props.notifications.message.forEach(e => toast.notify(e, {duration: null}))
        this.props.clearError()
      } else {
        toast.notify(this.props.notifications.error, {duration: null})
        this.props.clearError()
      }
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

    const data = new FormData()
    const formObj = {...this.state}

    if (isEmpty(formObj['photo'])) delete formObj['photo']
    console.log(formObj)
    
    if (this.props.user.id) {
      for (let key in formObj){
        data.append(key, formObj[key])
      }
      this.props.updatingUser(data, this.state.id)
    } else {
      for (let key in formObj){
        if (key !== 'id'){
          data.append(key, formObj[key])
        }
      }
      this.props.addingUser(data)
    }

    this.resetState()

  }

 

  resetState = () => {
    this.setState({
      avatar: 'https://ayogo.com/wp-content/uploads/2015/06/jp-avatar-placeholder.png',
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
              <img className='ui small image' src={ avatar } alt='user_avatar'/>
            </Segment>
            <label htmlFor='avatar'>Avatar: </label><br />
            <input type='text' name='avatar' value={ avatar } onChange={this.handleChange}></input><br />
            
           
            <Segment>
              <img className='ui img-splash' alt='user_splash_img' src="https://wallpaperaccess.com/full/898474.jpg" />
            </Segment> 

            <label htmlFor='splash_image'>Splash Image: </label><br />
            <input type='text' name='splash_image' value="https://wallpaperaccess.com/full/898474.jpg" onChange={this.handleChange}></input><br />
            
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

        <img src="https://wallpaperaccess.com/full/898474.jpg" />

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

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)