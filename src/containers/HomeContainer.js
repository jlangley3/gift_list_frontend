import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Card, Icon, Input, Segment, Checkbox } from 'semantic-ui-react';
import NoEvents from '../components/NoEvents';
import NoContacts from '../components/NoContacts';
import EventShow from '../components/EventShow';
import NewEventForm from '../components/NewEventForm';
import { Grid, Button, Modal, Image, Header} from 'semantic-ui-react';
import Events from '../components/Events.js';
import { updateSearchTerm } from '../redux/actions';

class Homepage extends React.Component{
  constructor(){
    super();
    this.state = {
        newEventModal: false,
        checked: false,
        editEventModal: false,
        thisEvent: {}
    }
    console.log(this.state)
  }

  handleOpen = (modal) => this.setState({ [modal]: true })
  setEvent = (clickedEvent) => this.setState({  thisEvent: clickedEvent })
  handleClose = (modal) => this.setState({ [modal]: false })
  handleToggle = () => this.setState({ checked: !this.state.checked })

  
  filteredEvents = () => {
    return this.props.events.filter(e => e.title.toLowerCase().includes(this.props.searchTerm.toLowerCase()))
  }
  
  upcomingEvents = () => {
    return this.filteredEvents().filter(e => new Date(e.end_date) > Date.now())
  }


  addEventBtn = () => {
    return (
      <Modal trigger={<Button onClick={() => this.handleOpen('addEventModal')}
      className="fluid ui button"
      inverted
      size="massive"
      color='green'>Create a Gift List</Button>} 
        open={this.state.addEventModal}
        onClose={() => this.handleClose('addEventModal')}
        closeIcon
      centered={false}>
      <Modal.Header as="h4">
      <Icon name='add circle' size='large' color='green' />
        Add a New Event Gift List
      </Modal.Header>
      <Modal.Content>
      <NewEventForm 
      title={"Add Event Form"} 
      handleClose={() => this.handleClose('addEventModal')}/> 
      </Modal.Content>
    </Modal>
    )
  }
 randomColor = () => {
  Math.floor(Math.random()*16777215).toString(16);
 }
  

render(){
  var randomColor = Math.floor(Math.random()*16777215).toString(16);

    return (
        <div className='wrapper'>
         <Grid columns="equal" divided stackable>
            <Grid.Row>
              <Grid.Column >
                <Header as='h2'  dividing>
                  <Icon name='gift' color="green" />
                    <Header.Content  className="ui red header">Your Gift Lists</Header.Content>
                      </Header>
                          </Grid.Column>
                            <Grid.Column>
                                  <Input
                                        icon='search'
                                        type='text'
                                        size='huge'
                                        value={this.props.searchTerm}
                                        onChange={(event) => this.props.updateSearchTerm(event.target.value)}
                                        name='filter'
                                        placeholder='Search For a List'>
                                    </Input>
                                  </Grid.Column>
                                  <Grid.Column>
                              <Segment compact>
                                    <Checkbox 
                                        toggle
                                        color="green"
                                        checked={this.state.checked}
                                        onChange={this.handleToggle}
                                        label='Show all Lists'
                                        />
                              
                                  </Segment>
                        </Grid.Column>
                        <Grid.Column >
                        {this.addEventBtn()}  
                    </Grid.Column>
              </Grid.Row>
          </Grid>

                                    <p />
                                  <div className='ui four stackable cards'>
                                      {this.props.events.length === 0 ?
                                      <div>
                                        <NoEvents />
                                        <NoContacts />
                                      </div>
        
                      :
     
                      this.state.checked ?
                      this.filteredEvents().sort((a, b) => {
                        const createdA = new Date(a.start_date)
                        const createdB = new Date(b.start_date)

                        if (createdB > createdA) {
                          return -1
                        }
                        if (createdB < createdA) {
                          return 1
                        }
                          return 0
                      }).map(e => <Events key={e.id} event={e} 
                        color={this.randomColor()} 
                        handleOpen={() =>this.handleOpen("editEventModal")}
                        setEvent={() => this.setEvent(e)}/>)
                    :
                      this.upcomingEvents().sort((a, b) => {
                        const createdA = new Date(a.start_date)
                        const createdB = new Date(b.start_date)

                        if (createdB > createdA) {
                          return -1
                        }
                        if (createdB < createdA) {
                          return 1
                        }
                          return 0
                      }).map(e => <Events key={e.id} event={e} 
                      color={this.randomColor()} 
                      handleOpen={() =>this.handleOpen("editEventModal")}
                      setEvent={() => this.setEvent(e)}/>)}
                      </div>
                  
                    {this.props.contacts.length === 0 ?
                    <div>
                      <NoContacts />
                    </div> : null}

                    <Modal
                          open={this.state.editEventModal} 
                          closeIcon
                          centered={true}
                          onClose={() => {
                            // this.toggleEditForm()
                            this.handleClose('editEventModal')}
                          }
                          size='large'
                          >
                          <Segment>
                              <EventShow
                                event={this.state.thisEvent}
                                handleClose={() => this.handleClose('editEventModal')}
                              />
                          </Segment>
                          </Modal>

        </div>
      )
     }}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    user: state.user,
    events: state.events,
    contacts: state.contacts,
    searchTerm: state.searchTerm,
    currentEvent: state.currentEvent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSearchTerm: (searchTerm) => dispatch(updateSearchTerm(searchTerm))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)