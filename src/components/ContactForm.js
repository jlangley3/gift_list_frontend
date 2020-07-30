import React from 'react'
import { connect } from 'react-redux'
import { addingContact, updatingContact } from '../redux/actions/contacts'
import { Button, Grid, Dropdown, Form, Select } from 'semantic-ui-react'


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

  handleChange = (event)=> this.setState({
    [event.target.name]: event.target.value
  })

  handleChangeKind = (e, { value }) => this.setState({kind: value})


  handleSubmit = event => {
    event.preventDefault();
 
    if (this.state.name === '') {
      alert('Please enter a name')

    } else if (this.props.contact) {
      const updatedContact = {
        contact: { 
          id: this.state.id,
          name: this.state.name,
          birthday: this.state.birthday,
          kind: this.state.kind,
          avatar: this.state.avatar,
          user_id: this.props.user.id
        }
      }
      this.props.updatingContact(this.state.id, updatedContact)
      this.props.handleClose('editContactModal')
    } else {
      const newContact = {
          contact: { 
            name: this.state.name,
            birthday: this.state.birthday,
            kind: this.state.kind,
            avatar: this.state.avatar,
            user_id: this.props.user.id
          }
        }
        
      this.props.addingContact(newContact)
      this.props.handleClose('addContactModal')
    
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
                <label htmlFor='avatar'>Contact Picture Link:</label>
                <input type='text' value={this.state.avatar} name='avatar'  onChange={this.handleChange}></input><br />

              </div>
            </Grid.Column>
            <Grid.Column>
              <div className='ui form' >
                
                <label htmlFor='name'>Name:</label>
                <input type='text' value={this.state.name} name='name' onChange={this.handleChange} ></input><p />
                <label htmlFor="type">Type:</label>
                <Select
                  name='kind'
                  fluid label='Choose a Contact' 
                  placeholder="Select an Option"
                  options={this.kindDropdown()}
                  onChange={this.handleChangeKind}
                  value={this.state.kind}
                  selection
                />
            <Form.Input
              fluid label="Birthday"
              type='date'
              className='date-picker'
              name='birthday'
              placeholder={this.state.birthday} 
              value={this.state.birthday}
              onChange={this.handleChange}/>
              <Button onClick={this.handleSubmit}>Submit</Button>
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