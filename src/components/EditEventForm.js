import React from 'react'
import { connect } from 'react-redux'
import { editCurrentEvent, updatingEvent } from '../redux/actions/events'
import { Grid, Form, Button, Radio, Input, Select, TextArea } from 'semantic-ui-react'


class EditEventForm extends React.Component {

  constructor(props){
    super(props)
    console.log(props.currentEvent)
        this.state = {
          title: props.currentEvent ? props.currentEvent.title : "",
          start_date: props.currentEvent ? props.currentEvent.start_date : "",
          end_date: props.currentEvent ? props.currentEvent.start_date : "",
          budget: props.currentEvent ? props.currentEvent.budget: "",
          
        }
      }

    
      handleChange = event => this.setState({
        [event.target.name]: event.target.value
      })

      handleStartDateChange = (event) => {
        this.state.end_date === '' ? this.setState({
          start_date: event.target.value, 
          end_date: event.target.value}) : 
          this.setState({start_date: event.target.value
          })
      }
      handleEndDateChange = (event )=> this.setState({
        end_date: event.target.value
      })


      handleSubmit = event => {
        event.preventDefault();
        const newEvent = {
                id: this.props.currentEvent.id,
                title: this.state.title,
                start_date: this.state.start_date,
                end_date: this.state.end_date,
                budget: this.state.budget,
                user_id: this.props.user ? this.props.user.id : "",
                repeating: this.props.currentEvent? this.props.currentEvent.repeating : "",
                gifts: this.props.currentEvent? this.props.currentEvent.gifts : [],
                contacts: this.props.currentEvent? this.props.currentEvent.contacts : [],
                reminders: this.props.currentEvent? this.props.currentEvent.reminders : []
            }
          this.props.updatingEvent(newEvent);
          this.props.editCurrentEvent(newEvent);
          this.props.handleClose('editEventModal')
          this.resetForm()
      }
    
      resetForm = () => {
        this.setState({
            title: '',
            date: '',
            budget: "",
            user_id: this.props.user ? this.props.user.id : ""
          })
      }



      render() {
        return (
          <Form>
        <Form.Group widths='equal'>
          <Form.Field
          control={Input}
              fluid label="Title"
              name='title'
              placeholder='Title'
              onChange={this.handleChange}
              value={this.state.title} />
          <Form.Field
            control={Input}
              fluid label="Budget"
              name='budget'
              placeholder='Budget' 
              onChange={this.handleChange}
              value={this.state.budget}/>

        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
              fluid label="Start Date"
              type='date'
              className='date-picker'
              name='start_date'
              placeholder={this.state.start_date} 
              value={this.state.start_date}
              onChange={this.handleStartDateChange}/>
          <Form.Input
              fluid label="End Date"
              type='date'
              placeholder={this.state.end_date} 
              type='date'
              className='date-picker'
              value={this.state.end_date}
              onChange={this.handleEndDateChange}/>
        </Form.Group>
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
          
        )
      }
    }

const mapStateToProps = state => {
  return {
    events: state.events,
    user: state.user,
    loading: state.loading,
    currentEvent: state.currentEvent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatingEvent: (event) => dispatch(updatingEvent(event)),
    editCurrentEvent: (e) => dispatch(editCurrentEvent(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEventForm)