import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Dropdown } from 'semantic-ui-react';
import { addingEventContact } from '../redux/actions';

class AddEventContacts extends React.Component {

      constructor(){
          super();
          this.state = {
            currentContact: null
          }
      }


    contactDropdown = () => {
        return (
        this.props.user.contacts.map(contact => {return {key: contact.id, text: contact.name, value: contact}}) 
        )}
        
    handleContactChange = (e, { value }) => this.setState({currentContact: value})

     
    handleSubmitForm = (event) => {
        this.props.addingEventContact(this.state.currentContact, this.props.event)
        this.props.handleClose('addContactModal')
    }

    render(){
        console.log(this.props)
        return (
        <div>
            <h1>Add Contact to List</h1>
            <Grid.Column>
         
                <Dropdown
                  name='kind'
                  placeholder="Select and option"
                  options={this.contactDropdown()}
                 onChange={this.handleContactChange }
                 value={this.state.currentContact}
                  selection
                /><p />
              <Button onClick={this.handleSubmitForm}>Submit</Button>

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
      addingEventContact: (newContact, thisEvent) => dispatch(addingEventContact(newContact, thisEvent))
      
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddEventContacts)