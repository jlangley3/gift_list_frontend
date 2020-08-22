import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Form } from 'semantic-ui-react';
import { addingEventContact } from '../redux/actions';

class AddGifts extends React.Component {

      constructor(props){
          super(props);
          this.state = {
            contact: props.contact ? props.contact : null,
            name: "TBD"
          }
      }


      handleChange = (event) => this.setState({
        [event.target.name]: event.target.value
      })


     
    handleSubmitForm = () => {
        this.props.addingEventContact(this.state, this.props.event)
        this.props.handleClose('addContactModal')
    }

    render(){
        console.log(this.props)
        return (
        <div>
          <Grid.Column>
            <Form onSubmit={this.handleSubmitForm}>
              <Form.Input 
                fluid label='Type Name of Gift' 
                name='name'
                placeholder='Gift Name'
                onChange={this.handleChange}
                value={this.state.name} />
                <Button>Submit</Button>
              </Form>
          </Grid.Column>
            </div>)
    }
}

const mapStateToProps = (state )=> {
    return {
      events: state.events,
      user: state.user,
      loading: state.loading
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      addingEventContact: (state, thisEvent) => dispatch(addingEventContact(state, thisEvent))
      
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddGifts)