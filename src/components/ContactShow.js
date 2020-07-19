import React from 'react'
import { Image, Header, Container, List, Icon, Divider, Modal, Grid, Button, Label } from 'semantic-ui-react'
import { connect } from 'react-redux';
import EditReminder from './EditReminder';
import moment from 'moment';
import { formatReminder } from '../helper/functions'
import ReminderForm from './ReminderForm';

import ContactForm from './ContactForm';
import { deletingContact} from '../redux/actions/contacts';


class ContactShow extends React.PureComponent {

  constructor(){
      
    super();
    console.log(this.props)
    this.state = {
        editReminderModal: false,
        editingReminder: null,
        newReminderModal: false,
        editContactModal: false,
        deleteContactModal: false,
        newEncounterModal: false,
    }
  }
 

  handleOpen = (modal) => this.setState({ [modal]: true })
  handleClose = (modal) => this.setState({ [modal]: false })
  handleEncounterModal = () => this.setState({ newEncounterModal: !this.state.newEncounterModal })

  toggleEditReminderModal = r => this.setState({editReminderModal: !this.state.editReminderModal, editingReminder: r})

  displayPriorityColor = (r) => {
    switch (r.priority){
      case 1:
        return 'red'
      case 2:
        return 'yellow'
      case 3:
        return 'blue'
      case 4: 
        return 'grey'
      default:
        return 'blue'
    }
  }

  displayPeriod = (r) => {
    switch (r.period) {
      case 'daily':
        return r.interval > 1 ? `every ${r.interval} days` : 'every day'
      case 'weekly':
        return r.interval > 1 ? `every ${r.interval} weeks` : 'every week'
      case 'monthly':
        return r.interval > 1 ? `every ${r.interval} months` : 'every month'
      case 'yearly':
        return r.interval > 1 ? `every ${r.interval} years` : 'every year'
      default:
        break;
    }
  }

  
  createReminderBtn = () => {
    return (
      <Modal
        size='tiny'
        trigger={<Button
          onClick={() => this.handleOpen('newReminderModal')}
          content='Add Reminder'
          primary
        />}
        open={this.state.newReminderModal}
        onClose={() => this.handleClose('newReminderModal')}
      >
        <ReminderForm contact={this.props.contact} title={'Create a new reminder!'} handleClose={() => this.handleClose('newReminderModal')} />
        <p />
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
          <p>This is an irreversible action. Are you sure you want to proceed?</p>
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
                <Header.Subheader>Friends since { moment(created_at).format('ll') }</Header.Subheader>
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
            { this.createReminderBtn() }
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
  return { repeatingReminders: state.repeating, user: state.user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletingContact: contact => dispatch(deletingContact(contact)),
  
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactShow)