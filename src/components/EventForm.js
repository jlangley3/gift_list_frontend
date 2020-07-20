import React from 'react'
import { connect } from 'react-redux'
import { addingEvent, updatingEvent } from '../redux/actions/events'
import { Grid, Form } from 'semantic-ui-react'




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
    
      handleChange = event => this.setState({
        [event.target.name]: event.target.value
      })

      handleStartDateChange = e => {
        this.state.end_date === '' ? this.setState({
          start_date: e.target.value, end_date: e.target.value}) : this.setState({start_date: e.target.value
          })
      }
      handleEndDateChange = e => this.setState({
        end_date: e.target.value
      })


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
          <Grid padded columns={1} stackable centered>
          <Grid.Row>
            {this.props.event ? <h3>Edit {this.props.event.name}</h3> : <h3>ADD NEW GIFT LIST</h3> }
          </Grid.Row>
          <Grid.Row>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Form.Group >
            <Grid.Column>
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
              type='date'
              className='date-picker'
              name='start_date'
              placeholder={this.state.start_date} 
              value={this.state.start_date}
              onChange={this.handleStartDateChange}/>
              
              <Form.Input 
               max={5}
              fluid label='end_date'
              name='end_date' 
              placeholder={this.state.end_date} 
              type='date'
              className='date-picker'
              value={this.state.end_date}
              onChange={this.handleEndDateChange}/>
              
 

              </Grid.Column>
            </Form.Group>

            <Form.Button>Submit</Form.Button>
          </Form>
          </Grid.Row>
          </Grid>
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