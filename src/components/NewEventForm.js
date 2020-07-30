import React from 'react'
import { connect } from 'react-redux'
import { addingEvent, updatingEvent } from '../redux/actions/events'
import { Grid, Form, Input, Button } from 'semantic-ui-react'


class NewEventForm extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      title: props.event ? props.event.title : "",
      start_date: props.start_date ? props.start_date : "",
      end_date: props.end_date ? props.end_date : "",
      budget: props.event ? props.event.budget: "",
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


      handleSubmit = e => {
        e.preventDefault();
        const newEvent = {
            event: {
                
                title: this.state.title,
                start_date: this.state.start_date,
                end_date: this.state.end_date,
                budget: this.state.budget,
                user_id: this.props.user ? this.props.user.id : ""
              }
            }
          this.props.addingEvent(newEvent);
          this.props.handleClose('addEventModal');
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
            <div>
          <Form onSubmit={this.handleSubmit}>
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
        <Button  >Submit</Button>
      </Form>
      </div>
          
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
    addingEvent: (newEvent) => dispatch(addingEvent(newEvent)),
    updatingEvent: (editedEvent) => dispatch(updatingEvent(editedEvent))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEventForm)