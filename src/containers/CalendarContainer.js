import React from 'react'
import { connect } from 'react-redux'
import { Header, Grid, Icon} from 'semantic-ui-react';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import '../styles/Calendar.css';
import NewEventForm from '../components/NewEventForm';
import EventShow from '../components/EventShow';
import { Modal,Segment } from 'semantic-ui-react';
import { editCurrentEvent, addingEvent, updatingEvent, deletingEvent } from '../redux/actions/events';
import { setCurrentEvent } from '../redux/actions';

class CalendarContainer extends React.Component {  
  constructor(props) {
  super(props)
  this.state = {
    modalOpen: false,
    addEventModal: false,
    editEventModal: false,
    editForm: false,
    thisEvent: {},
    weekendsVisible: true,
    currentEvents: [],
    currentEvent: props.currentEvent,
    start_date: "",
    end_date: ""
  }
}
       

handleOpen = (clickInfo = null, modal) => { 
  this.setState({ 
  [modal]: true, 
  start_date: clickInfo.startStr,
  end_date: clickInfo.endStr })}

handleClose = (modal) => this.setState({ [modal]: false })
toggleEditForm = () => this.setState({editForm: !this.state.editForm})

  formatEvents = () => {
    return this.props.events.map(event => {
              const {title, end_date, start_date} = event
  
              let startTime = start_date
              let endTime = end_date
  
              return {
                title: title, 
                start: startTime,
                end: endTime, 
                allDay: true,
                extendedProps: {...event}
              }
          })
  }

  render() {
    return (
      <div className='app'>
        <div className='app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.props.weekendsVisible}
            datesSet={this.handleDates}
            select={(event) => {this.handleOpen(event, 'addEventModal')}}
            events={this.formatEvents()}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventAdd={this.handleEventAdd}
            eventChange={this.handleEventChange} // called for drag-n-drop/resize
            eventRemove={(event) => this.handleEventRemove(event)}
            eventBackgroundColor="rgb(19, 179, 19)"
            eventBorderColor="rgb(19, 179, 19)"
          />

          <Modal
           open={this.state.addEventModal}
           onClose={() => this.handleClose('addEventModal')}
           size='small'
              closeIcon
              centered={false}>
              <Modal.Header as="h1">Add A List</Modal.Header>
              <Modal.Content>
              <Grid columns={2} divided>
                <Grid.Row>
                 <Grid.Column>
                 <Icon name='gift' size='massive' color='green' />
                <Modal.Description>
                  <Header>Add a  Gift List</Header>
                </Modal.Description>
                </Grid.Column>
            <Grid.Column>
                <NewEventForm 
                    title={'New Event!'} 
                    start_date={this.state.start_date} 
                    end_date={this.state.end_date}
                    handleClose={() => this.handleClose('addEventModal')}
         />
         </Grid.Column>
              </Grid.Row>
              </Grid>
              </Modal.Content>
       </Modal>


        <Modal
              open={this.state.editEventModal} 
              closeIcon
              centered={true}
              onClose={() => {
                this.handleClose('editEventModal')}
              }
              size='small'
              >
              <Segment>
                  <EventShow
                    event={this.state.thisEvent}
                    handleClose={() => this.handleClose('editEventModal')}
                  />
              </Segment>
              </Modal>
        </div>
      </div>
    )
  }

  renderSidebar() {
    return (
      <div className='app-sidebar'>
        <div className='app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.props.weekendsVisible}
              onChange={this.props.toggleWeekends}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='app-sidebar-section'>
          <h2>All Events ({this.props.events.length})</h2>
          <ul>
            {this.props.events.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  // handlers for user actions
  // ------------------------------------------------------------------------------------------
  //When a labeled event is clicked, opends a Modal to show and edit List/Event    
  handleEventClick = (clickInfo) => {
        console.log(clickInfo)
        this.props.setCurrentEvent(clickInfo.event._def.extendedProps)
        this.setState({ 
          editEventModal: true,
           thisEvent: clickInfo.event._def.extendedProps })}

      
  handleEventChange = (changeInfo) => {
         console.log(changeInfo)
         let start = changeInfo.event._instance.range.start
         let end = changeInfo.event._instance.range.end
         let clickedEvent = changeInfo.event._def.extendedProps
            this.props.updatingEvent({...clickedEvent, start_date: start, end_date: end });
            this.props.editCurrentEvent({...clickedEvent, start_date: start, end_date: end });
        }



  // handlers that initiate reads/writes via the 'action' props
  // ------------------------------------------------------------------------------------------

}
function renderEventContent(eventInfo) {
  return (
    <>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id} className="colors">
      <b>{formatDate(event.start_date, {year: 'numeric', month: 'long', day: 'numeric'})}</b> 
      <i>{event.title}</i>
    </li>
  )
}


const mapStateToProps = (state, ownProps) => {
return {
  user: state.user,
  events: state.events,
  reminders: state.reminders,
  loading: state.loading,
  contacts: state.contacts,
  currentEvent: state.currentEvent
}
}

const mapDispatchToProps = dispatch => {
return {
  deletingEvent: (event) => dispatch(deletingEvent(event)),
  updatingEvent: (event) => dispatch(updatingEvent),
  addingEvent: (event) => dispatch(addingEvent),
  setCurrentEvent: (e) => dispatch(setCurrentEvent(e)),
  editCurrentEvent: (e) => dispatch(editCurrentEvent(e))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);
