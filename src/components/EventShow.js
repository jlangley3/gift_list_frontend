import React from 'react'
import { Image, Header, Container, List, Icon, Divider, Modal, Grid, Button, Label } from 'semantic-ui-react'
import { connect } from 'react-redux';
import EditReminder from './EditReminder';
import moment from 'moment';
import { formatReminder } from '../helper/functions'
import ReminderForm from './ReminderForm';
import EventContacts from './EventContacts';
import EventForm from './EventForm';
import { isEmpty } from 'lodash';
import { updatingEvent, deletingEvent, addingEvent} from '../redux/actions/events';


class ContactShow extends React.PureComponent {

  constructor(){
      
    super();
    console.log(this.props)
    this.state = {
        editEventModal: false,
        editingEvent: null,
        newEventModal: false,
        addContactModal: false
    }
  }
 

  handleOpen = (modal) => this.setState({ [modal]: true })
  handleClose = (modal) => this.setState({ [modal]: false })
  

  toggleEditEventModal = e => this.setState({editEventModal: !this.state.editEventModal, editingEvent: e})


  addContactBtn = () => {
    return (
      <Modal
        size='tiny'
        trigger={<Button
          onClick={() => this.handleOpen('newGiftModal')}
          content='Add Contacts to this Gift List'
          primary
        />}
        open={this.state.newReminderModal}
        onClose={() => this.handleClose('newGiftModal')}
      >
        <EventContacts event={this.props.event} title={'Add Contacts to List'} handleClose={() => this.handleClose('newEventModal')} />
        <p />
      </Modal>
    )
  }


  
  createEventBtn = () => {
    return (
      <Modal
        size='tiny'
        trigger={<Button
          onClick={() => this.handleOpen('newEventModal')}
          content='Add Event'
          primary
        />}
        open={this.state.newReminderModal}
        onClose={() => this.handleClose('newEventModal')}
      >
        <ReminderForm contact={this.props.contact} title={'Create a new reminder!'} handleClose={() => this.handleClose('newReminderModal')} />
        <p />
      </Modal>
    )
  }


 
  editEventBtn = () => {
    return (
      <Modal
        size='large'
        trigger={<Button
          onClick={() => this.handleOpen('editEventModal')}
          content='Edit Event'
          basic
          color='green'
        />}
        open={this.state.editEventModal}
        onClose={() => this.handleClose('editEventModal')}
        closeIcon
      >
          
        <EventForm event={this.props.event} handleClose={() => this.handleClose('editEventModal')} />
      </Modal>
    )
  }

  deleteEventBtn = () => {
    return (
      <Modal
        size='mini'
        trigger={<Button
          onClick={() => this.handleOpen('deleteEventModal')}
          content='Remove Event'
          basic
          color='red'
        />}
        open={this.state.deleteEventModal}
        onClose={() => this.handleClose('deleteEventModal')}
      >
        <Header icon='trash' content='Delete this event?' />
        <Modal.Content>
          <p>This is an irreversible action. Are you sure you want to proceed?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative content='No' onClick={() => this.handleClose('deleteEventModal')} />
          <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => {
            this.props.deletingEvent(this.props.event)
            this.handleClose('deleteEventModal')
          }
          } />
        </Modal.Actions>
      </Modal>
    )
  }

 

  render(){
      console.log(this.props)
    const {event: {title, start_date, end_date, budget, repeating}} = this.props
    return(
      <Grid columns='equal' padded stackable>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' dividing>
              <Header.Content>
                { title } 
                <Header.Subheader>Date: { moment(start_date).format('ll') }</Header.Subheader>
                <Header.Subheader>End: { moment(end_date).format('ll') }</Header.Subheader>
                <Header.Subheader>Budget { budget}</Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Image floated='right' size='large' src="https://www.eventelephant.com/wp-content/uploads/2019/01/EventElephant.jpg" alt="No Picture" />
        <Grid.Row columns={2}>
          <Grid.Column width={4}>
            <Button>Click!</Button>
          </Grid.Column>
          <Grid.Column>
            <ul>
              {!isEmpty(this.props.event.contacts) ? this.props.event.contacts.map(contact => <li>{contact.name}</li> ) : <h3>"Please add Contacts to this list"</h3>}
            </ul>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={4}>
          <Grid.Column>
            { this.editEventBtn() }
          </Grid.Column>
          <Grid.Column>
            { this.deleteEventBtn() }
          </Grid.Column>
          <Grid.Column>
            { this.addContactBtn() }
          </Grid.Column>
        </Grid.Row>

      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
      user: state.user 
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletingEvent: myEvent => dispatch(deletingEvent(myEvent)),
    addingEvent: myEvent => dispatch(addingEvent(myEvent)),
    updatingEvent: myEvent => dispatch(updatingEvent(myEvent))
  
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactShow)