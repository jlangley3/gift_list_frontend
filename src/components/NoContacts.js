import React, {Component} from 'react';
import { Button, Header, Icon, Segment, Modal } from 'semantic-ui-react';
import ContactForm from '../components/ContactForm';
// import { Link } from 'react-router-dom'

class NoContacts extends Component {
  constructor(){
    super();
    console.log(this.props)
    this.state = {
        newContactModal: false
    }
  }

  handleOpen = (modal) => this.setState({ [modal]: true })
  handleClose = (modal) => this.setState({ [modal]: false })


  addContactBtn = () => {
    return (
      <Modal trigger={<Button onClick={() => this.handleOpen('addContactModal')}
      
      color='red'>Add Contact</Button>} 
        open={this.state.addContactModal}
        onClose={() => this.handleClose('addContactModal')}
        closeIcon
      centered={false}>
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
      <Icon name='add circle' size='massive' color='green' />
        <Modal.Description>
          <Header>Add a New Contact</Header>
        </Modal.Description>
      </Modal.Content>
      <ContactForm 
      title={"Add Contact Form"} 
      handleClose={() => this.handleClose('addContactModal')}/>
    </Modal>
    )
  }

  render() {
      return (
        <Segment placeholder>
          <Header icon>
            <Icon name='user plus' />
            You do not have any Contacts.
          </Header>
          {this.addContactBtn()}
        </Segment>
      )
   }
  } 

export default NoContacts