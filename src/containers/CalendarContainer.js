import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Checkbox } from 'semantic-ui-react';
import Moment from 'react-moment';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import { INITIAL_EVENTS, createEventId } from '../fullcalender/Cal-Util';
import '../styles/Calendar.css';
// import moment from 'moment';
import EditEventForm from '../components/NewEventForm';
import EventShow from '../components/EventShow';
import { Modal, Button, Segment } from 'semantic-ui-react';
import { addingEvent, updatingEvent, deletingEvent } from '../redux/actions/events';
import { setCurrentEvent } from '../redux/actions';

class CalenderContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      modalOpen: false,
      thisEvent: {},
      editForm: false,
      weekendsVisible: true,
      currentEvents: []
    }
  }

  handleOpen = (event) => this.setState({modalOpen: true, thisEvent: event.extendedProps})
  handleClose = () => this.setState({modalOpen: false, editForm: false, deleteConfirmation: false})

  
  
  
  formatEvents = () => {
    return this.props.events.map(event => {
              const {title, end_date, start_date} = event
  
              let startTime = new Date(start_date)
              let endTime = new Date(end_date)
  
              return {
                title: title, 
                start: startTime,
                end: endTime, 
                extendedProps: {...event}
              }
          })
  }

  

  render() {
    console.log(this.state.thisEvent)
    

    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
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
            weekends={this.state.weekendsVisible}
            initialEvents={this.formatEvents()} // alternatively, use the `events` setting to fetch from a feed
            select={(event, e) => {this.handleOpen(event)}}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            //you can update a remote database when these fire:
            eventAdd={(event) => this.props.addEvent(event)}
            eventChange={(event) => this.props.updateEvent(event)}
            eventRemove={(event) => this.props.deleteEvent(event)}
        
           />
                 <Modal
           open={this.state.modalOpen}
           onClose={() => {this.handleClose()}} 
           size='small'>
                <EditEventForm 
           title={'Update Event!'} 
           event={this.state.thisEvent} 
           handleClose={this.handleClose}
         />
       </Modal>
        </div>
      </div>
    )
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
          <Checkbox toggle 
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}/>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.props.events.length})</h2>
          <ul>
            {this.props.events.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: "2",
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (event, clickInfo) => {
    if (alert(clickInfo)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      {/* <b>{eventInfo.timeText}</b> */}
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      {/* <Moment>{event.start_date}</Moment> */}
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
    setCurrentEvent: (e) => dispatch(setCurrentEvent(e))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CalenderContainer));