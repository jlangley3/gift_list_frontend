import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Dropdown, Form } from 'semantic-ui-react';
import { addingEventContact } from '../redux/actions';

class AddEventContacts extends React.Component {

      constructor(){
          super();
          this.state = {
            contact: "",
            name: "No name"
          }
      }

    contactDropdown = () => {
        return (
          this.props.user.contacts.map(contact => {return {key: contact.id, text: contact.name, value: contact.id, image: {avatar: true, src: contact.avatar}}}) 
        )}
        

  handleContactChange = (e, { value }) => {
         console.log(value)
      let id =  value
      let con = this.props.user.contacts.find(contact => contact.id === id)
    this.setState({contact: con})}
    

    handleSubmitForm = (event) => {
        this.props.addingEventContact(this.state, this.props.event)
        this.props.handleClose('addContactModal')
    }

    render(){
        console.log(this.props)
        console.log(this.state)
        return (
        <div>
            <Fragment>
              <div className='ui form' >

                <Dropdown
                    name='contact'
                    placeholder="Select contact"
                    options={this.contactDropdown()}
                    onChange={this.handleContactChange}
                    // value={this.state.contact}
                    selection
                /><p />
              <Button onClick={this.handleSubmitForm}>Submit</Button>
            </div>
          </Fragment>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddEventContacts)