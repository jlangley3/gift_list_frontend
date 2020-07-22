import React from 'react'
import { Image, Header, Modal, Grid, Button, GridColumn, List } from 'semantic-ui-react'
import { connect } from 'react-redux';
import moment from 'moment';
import AddEventContacts from './AddEventContacts';
import EditEventForm from './EditEventForm';
import { isEmpty } from 'lodash';
import { updatingEvent, deletingEvent, addingEvent} from '../redux/actions/events';
import GiftContact from './GiftContact';


class ContactShow extends React.PureComponent {

  constructor(){
      
    super();
    console.log(this.props)
    this.state = {
        editEventModal: false,
        editingEvent: null,
        newEventModal: false,
        addContactModal: false,
        addGiftModal: false,
        newGiftModal: false
    }
  }
 

  handleOpen = (modal) => this.setState({ [modal]: true })
  handleClose = (modal) => this.setState({ [modal]: false })
  toggleEditEventModal = e => this.setState({editEventModal: !this.state.editEventModal, editingEvent: e})


  addContactBtn = () => {
    return (
      <Modal 
        trigger={<Button color="green" onClick={() => this.handleOpen('addContactModal')}>Add Contact</Button>}
      open={this.state.addContactModal}
      onClose={() => this.handleClose('addContactModal')}>
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
      <AddEventContacts event={this.props.event} title={'Add Contacts to List'}  handleClose={() => this.handleClose('addContactModal')}/>
        <Image wrapped size='medium' src='https://i.pinimg.com/originals/8c/7c/c4/8c7cc4c8776e4ed6577167e7e9b64f13.png' />
        <Modal.Description>
          <Header>Add Contacts to List</Header>
          <p>
            Pick a Contact from the DropDown to add to this list
          </p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
        
    )
  }

 
  editEventBtn = () => {
    return (
      <Modal trigger={<Button onClick={() => this.handleOpen('editEventModal')}
      basic
      color='green'>Edit Event</Button>} 
        open={this.state.editEventModal}
        onClose={() => this.handleClose('editEventModal')}
        closeIcon
      centered={false}>
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Image wrapped size='small' src='https://3xoo20ik68l1obvec1hg1f6f-wpengine.netdna-ssl.com/wp-content/uploads/2016/02/edit-logo.gif' />
        <Modal.Description>
          <Header>Add Contacts to List</Header>
          <p>
            Type the name of the Gift.
          </p>
          <p>Pick a Contact from the DropDown.</p>
        </Modal.Description>
      </Modal.Content><EditEventForm event={this.props.event} title={"Edit Event Form"} handleClose={() => this.handleClose('editEventModal')}/>
    </Modal>
    )
  }

  deleteEventBtn = () => {
    return (
      <Modal
        size='mini'
        trigger={<Button
          onClick={() => this.handleOpen('deleteEventModal')}
          content='Delete List'
          color='red'
        />}
        open={this.state.deleteEventModal}
        onClose={() => this.handleClose('deleteEventModal')}
      >
        <Header icon='trash' content='Delete this List?' />
        <Modal.Content>
          <p>You Sure?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button inverted negative content='No' onClick={() => this.handleClose('deleteEventModal')} />
          <Button inverted positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => {
            this.props.deletingEvent(this.props.currentEvent)
            this.handleClose('deleteEventModal')
          }
          } />
        </Modal.Actions>
      </Modal>
    )
  }

  render(){
      console.log(this.props)
    const {title, start_date, end_date, budget, repeating} = this.props.currentEvent
    return(
      <Grid columns='equal' padded stackable>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' dividing>
              <Header.Content>
                { title } 
                <Header.Subheader>Date: { moment(start_date).format('ll') }</Header.Subheader>
                <Header.Subheader>End: { moment(end_date).format('ll') }</Header.Subheader>
                <Header.Subheader>Budget: ${ budget}</Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column>
          <Image floated='right' size='medium' src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQFgvdiVgACLS3CVHs1F8eYENZe-ATnOtNniQ&usqp=CAU" alt="No Picture" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1} >
        <List>
    {!isEmpty(this.props.currentEvent) ? this.props.currentEvent.gifts.map(gift => <GiftContact 
          key={gift.id} 
          gift={gift} 
          event={this.props.event}/>) : <h3>"Please add Contacts to this list"</h3>}
            </List>    
           </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column>
            { this.editEventBtn() }
          </Grid.Column>
          <Grid.Column>
            { this.addContactBtn() }
          </Grid.Column>
          <Grid.Column>
            { this.deleteEventBtn() }
          </Grid.Column>
        </Grid.Row>

      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
      user: state.user,
      contacts: state.contacts,
      currentEvent: state.currentEvent
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletingEvent: myEvent => dispatch(deletingEvent(myEvent)),
    addingEvent: myEvent => dispatch(addingEvent(myEvent)),
    updatingEvent: myEvent => dispatch(updatingEvent(myEvent)),
    
  
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactShow)




