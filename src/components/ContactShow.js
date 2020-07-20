import React from 'react'
import { Image, Header, Container, List, Icon, Divider, Modal, Grid, Button, Label } from 'semantic-ui-react'
import { connect } from 'react-redux';
import moment from 'moment';
import ContactForm from './ContactForm';
import { deletingContact, addingContact, updatingContact} from '../redux/actions/contacts';


class ContactShow extends React.PureComponent {

  constructor(){
      
    super();
    console.log(this.props)
    this.state = {
        editContactModal: false,
        deleteContactModal: false
      
    }
  }
 

  handleOpen = (modal) => this.setState({ [modal]: true })
  handleClose = (modal) => this.setState({ [modal]: false })



  createContactBtn = () => {
    return (
      <Modal
        size='tiny'
        trigger={<Button
          onClick={() => this.handleOpen('createContactModal')}
          content='Create Friend'
          basic
          color='green'
        />}
        open={this.state.createContactModal}
        onClose={() => this.handleClose('createContactModal')}
        closeIcon
      >
          
        <ContactForm contact={this.props.contact} handleClose={() => this.handleClose('createContactModal')} />
      </Modal>
    )
  }
 
  editContactBtn = () => {
    return (
      <Modal
        size='tiny'
        trigger={<Button
          onClick={() => this.handleOpen('editContactModal')}
          content='Edit Friend'
          basic
          color='green'
        />}
        open={this.state.editContactModal}
        onClose={() => this.handleClose('editContactModal')}
        closeIcon
      >
          
        <ContactForm contact={this.props.contact} handleClose={() => this.handleClose('editContactModal')} />
      </Modal>
    )
  }

  deleteContactBtn = () => {
    return (
      <Modal
        size='mini'
        trigger={<Button
          onClick={() => this.handleOpen('deleteContactModal')}
          content='Remove Friend'
          basic
          color='red'
        />}
        open={this.state.deleteContactModal}
        onClose={() => this.handleClose('deleteContactModal')}
      >
        <Header icon='trash' content='Delete this contact?' />
        <Modal.Content>
          <p>You Sure?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative content='No' onClick={() => this.handleClose('deleteContactModal')} />
          <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => {
            this.props.deletingContact(this.props.contact)
            this.handleClose('deleteContactModal')
          }
          } />
        </Modal.Actions>
      </Modal>
    )
  }

 

  render(){
      console.log(this.props)
    const {contact: {name, created_at, kind, avatar, birthday}} = this.props
    return(
      <Grid columns='equal' padded stackable>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' dividing>
              <Header.Content>
                { name } 
                <Header.Subheader>Birthday { moment(birthday).format('ll') }</Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Image floated='right' size='large' src={avatar} />
        <Grid.Row columns={2}>
          <Grid.Column width={4}>
            <Button>{kind}</Button>
          </Grid.Column>
          <Grid.Column>
            <p>
              
            </p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={4}>
          <Grid.Column>
            { this.createContactBtn() }
          </Grid.Column>
    
          <Grid.Column>
            { this.editContactBtn() }
          </Grid.Column>
          <Grid.Column>
            { this.deleteContactBtn() }
          </Grid.Column>
        </Grid.Row>

      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { events: state.events, user: state.user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletingContact: (contact) => dispatch(deletingContact(contact)),
    addingContact: (contact) => dispatch(addingContact(contact)),
    updatingCOntact: (contact) => dispatch(updatingContact)
  
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactShow)