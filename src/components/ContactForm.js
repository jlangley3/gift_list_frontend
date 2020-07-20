import React from 'react'
import { connect } from 'react-redux'
import { addingContact, updatingContact } from '../redux/actions/contacts'
import { Segment, Button, Grid, Dropdown } from 'semantic-ui-react'
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';

class ContactForm extends React.Component {
  constructor(props){
      console.log(props)
    super(props)
    this.state = {
      id: this.props.contact ? this.props.contact.id : '',
      name: this.props.contact ? this.props.contact.name : '',
      birthday: this.props.contact ? this.props.contact.birthday : '',
      kind: this.props.contact ? this.props.contact.kind : '',
      
      avatar: this.props.contact ? this.props.contact.avatar : 'https://listimg.pinclipart.com/picdir/s/351-3519728_png-file-svg-default-profile-picture-free-clipart.png'
    }
  }

  handleChange = e => this.setState({[e.target.name]: e.target.value})
  handleKindChange = (e, { value }) => this.setState({kind: value})


  submitForm = () => {
    // event.preventDefault()
    // console.log(this.props)

    if (this.state.name === '') {
      toast.notify('Please enter a name', {duration: null})

    } else if (this.props.contact) {
        const updatedContact = {
          contact: { 
            id: this.state.id,
            name: this.state.first_name,
            birthday: this.state.birthday,
            kind: this.state.kind,
            avatar:this.state.avatar,
            user_id: this.props.id
          }
        }
        this.props.updatingContact(this.state.id, updatedContact)
        this.props.handleClose('editContactModal')
      } else {
      const newContact = {
        contact: {
            name: this.state.name,
            birthday: this.state.birthday,
            avatar: this.state.avatar,
            user_id: this.props.id,
            kind: this.state.kind
            
          }
        }
      this.props.addingContact(newContact)
      this.props.handleClose()
      }
  }

  kindDropdown = () => {
    return ([
      {key: 'family', text: 'Family', value: 'Family'},
      {key: 'friend', text:'Friend', value: 'Friend'},
      {key: 'Co-Worker', text: 'Co-Worker', value: 'Co-Worker'},
      {key: 'I dont Know this Person', text: 'I dont Know this Person', value:'I dont Know this Person'}
    ])
  }

  render(){
    return (
        <Grid padded columns={2}>
          <Grid.Row>
            {this.props.contact ? <h3>Edit {this.props.contact.name}</h3> : <h3>ADD NEW CONTACT</h3> }
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className='ui form'>
                <img className='ui small image' src={ this.state.avatar } alt='user_avatar'/><br />
                <label htmlFor='avatar'>Contact Picture Link::</label>
                <input type='text' value={this.state.avatar} name='avatar' onChange={this.handleChange}></input><br />


              </div>
            </Grid.Column>
            <Grid.Column>
              <div className='ui form' >
                
                <label htmlFor='name'>Name:</label>
                <input type='text' value={this.state.name} name='name' onChange={this.handleChange}></input><p />
                <label htmlFor="type">Type:</label>
                <Dropdown
                  name='kind'
                  placeholder="Select and option"
                  options={this.kindDropdown()}
                  onChange={this.handleKindChange}
                  value={this.state.kind}
                  selection
                /><p />

               
              <Button onClick={this.submitForm}>Submit</Button>
            </div>

          </Grid.Column>
        </Grid.Row>
        </Grid>
    )

  }
}

const mapStateToProps = state => {
  return {
      id: state.user.id,
      user: state.user,
      contacts: state.contacts
    }
}

const mapDispatchToProps = dispatch => {
  return {
    addingContact: (contact) => dispatch(addingContact(contact)),
    updatingContact: (id, contact) => dispatch(updatingContact(id, contact))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)