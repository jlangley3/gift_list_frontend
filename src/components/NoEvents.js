import React, {Component} from 'react';
import { Button, Header, Icon, Segment, Modal } from 'semantic-ui-react';
import NewEventForm from '../components/NewEventForm';

// import { Link } from 'react-router-dom'

class NoEvents extends Component {
  constructor(){
    super();
    console.log(this.props)
    this.state = {
        newEventModal: false
    }
  }

  handleOpen = (modal) => this.setState({ [modal]: true })
  handleClose = (modal) => this.setState({ [modal]: false })


  addEventBtn = () => {
    return (
      <Modal trigger={<Button onClick={() => this.handleOpen('addEventModal')}
      color='red'>Create a Gift List</Button>} 
        open={this.state.addEventModal}
        onClose={() => this.handleClose('addEventModal')}
        closeIcon
      centered={false}>
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Icon name='add circle' size='massive' color='green' />
        <Modal.Description>
          <Header>Add a New Event Gift List</Header>
        </Modal.Description>
      </Modal.Content><NewEventForm 
      title={"Add Event Form"} 
      handleClose={() => this.handleClose('addEventModal')}/>
    </Modal>
    )
  }
render() {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name='add to calendar' />
          You do not have any Gift Lists.
        </Header>
        {this.addEventBtn()}
      </Segment>
    )
 }
} 

export default NoEvents