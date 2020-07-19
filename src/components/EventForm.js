import React from 'react'
import { connect } from 'react-redux'
import { addingEvent, updatingEvent } from '../redux/actions/events'
import { Header, Segment, Grid, Icon, Transition, Dropdown, Checkbox, Input, Button, Modal, Form } from 'semantic-ui-react'
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'


const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]
class EventForm extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
        this.state = {
          title: props.event ? props.event.title : null,
          start_date: props.event ? props.event.start_date : null,
          end_date: props.event ? props.event.start_date : null,
          budget: props.event ? props.event.budget: null,
          
        }
      }
    
      handleChange = (event, { name, value }) => {
        this.setState({ [name]: value });
      };

      handleStartDateChange = e => {
        this.state.end_date === '' ? this.setState({start_date: e.target.value, end_date: e.target.value}) : this.setState({start_date: e.target.value})
      }
      handleEndDateChange = e => this.setState({end_date: e.target.value})


      handleSubmit = event => {
        event.preventDefault();
        const newEvent = {
            event: {
                title: this.state.title,
                start_date: this.state.start_date,
                end_date: this.state.end_date,
                budget: this.state.budget,
                user_id: this.props.user ? this.props.user.id : null
              }
            }
          this.props.addingEvent(newEvent)
          this.resetForm()
      }
    
      resetForm = () => {
        this.setState({
            title: '',
            date: '',
            budget: null,
            user_id: this.props.user ? this.props.user.id : null
          })
      }



      render() {
        const { value } = this.state
        return (
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Input 
              fluid label='Title' 
              name='title'
              placeholder='Title'
              onChange={this.handleChange}
              value={this.state.title} />
              <Form.Input 
              fluid label='Budget'
              name='budget'
              placeholder='Budget' 
              onChange={this.handleChange}
              value={this.state.budget}/>
              <Form.Input 
              fluid label='start_date'
              name='start_date' 
              placeholder='start_date' 
              onChange={this.handleChange}
              value={this.state.start_date}/>
              <Form.Input 
              fluid label='end_date'
              name='end_date' 
              placeholder='end_date' 
              onChange={this.handleChange}
              value={this.state.end_date}/>
              <input
                   type='date'
                  className='date-picker'
                  name='start_date'
                  value={this.state.start_date}
                  onChange={this.handleStartDateChange}/>
                  <input
                      type='date'
                      className='date-picker'
                      name='end_date'
                      value={this.state.end_date}
                      onChange={this.handleEndDateChange}/>
            </Form.Group>

            <Form.Button>Submit</Form.Button>
          </Form>
        )
      }
    }

const mapStateToProps = state => {
  return {
    events: state.events,
    user: state.user,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addingEvent: (event) => dispatch(addingEvent(event)),
    updatingEvent: (event) => dispatch(updatingEvent(event))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm)