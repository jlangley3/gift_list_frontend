import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';
import NoContacts from '../components/NoContacts';
import { Checkbox, Input, Grid, Sticky, Ref, Label, Segment, Icon, Header, Modal, Button, Image} from 'semantic-ui-react';
import { updateSearchTerm } from '../redux/actions';
import { isEmpty } from 'lodash';



class ContactContainer extends Component {
  constructor(){
    super();
    console.log(this.props)
    this.state = {
        addContactModal: false,
        checked: false
    }
  }

  handleOpen = (modal) => this.setState({ [modal]: true })
  handleClose = (modal) => this.setState({ [modal]: false })
  handleToggle = () => this.setState({ checked: !this.state.checked })

  filteredContacts = () => {
    return this.props.contacts.filter(c => c.name.toLowerCase().includes(this.props.searchTerm.toLowerCase()))
  }

  addContactBtn = () => {
    return (
      <Modal trigger={<Button onClick={() => this.handleOpen('addContactModal')}
      basic
      color='green'>Add Contact</Button>} 
        open={this.state.addContactModal}
        onClose={() => this.handleClose('addContactModal')}
        closeIcon
      centered={false}>
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
      <Icon name='add circle' size='massive' color='green' />
        <Modal.Description>
          <Header>Add a New Contact</Header>
        </Modal.Description>
      </Modal.Content>
      <ContactForm 
      title={"Add Contact Form"} 
      handleClose={() => this.handleClose('addContactModal')}/>
    </Modal>
    )
  }

  render() {
    debugger;
    return(
      <div>
        <Grid stackable>
        <Grid.Row>
          <Grid.Column >
          <div>
             <Segment >
                  <Header icon>
                    <Icon name='search' />
                        Find Contact
                        </Header>
                          <br />
                          <Checkbox 
                              toggle
                              color="green"
                              // label='Sort By Name'
                              checked={this.state.checked}
                              onChange={this.handleToggle}/>
                                 <Label color="red" as='p' tag>
                                      Sort By Name
                                </Label>
                                {/* <Label color='red' horizontal>
                                    Sort By name
                                  </Label> */}
                                <Input
                                icon='search'
                                type='text'
                                size='large'
                                value={this.props.searchTerm}
                                onChange={(event) => this.props.updateSearchTerm(event.target.value)}
                                name='filter'
                                placeholder='Search For Contacts'>
                                  </Input>
                                  {this.addContactBtn()}
                                  </Segment>
                                          
                                  
                                  <p />
                                  <div className='ui two stackable cards'>

                                
                                        {this.props.contacts.length === 0 ?
                                        <NoContacts />
                                        :

                                  this.state.checked ?
                                      this.filteredContacts().sort((a, b) => {
                                        const nameA = a.name
                                        const nameB = b.name

                                        if (nameA < nameB) {
                                          return -1
                                        }
                                        if (nameA > nameB) {
                                          return 1
                                        }
                                        return 0
                                      }).map(c => <ContactCard key={c.id} contact={c} />)
                                    :
                                      this.filteredContacts().sort((a, b) => {
                                        const createdA = new Date(a.created_at)
                                        const createdB = new Date(b.created_at)

                                        if (createdB < createdA) {
                                          return -1
                                        }
                                        if (createdB > createdA) {
                                          return 1
                                        }
                                          return 0
                                      }).map(c => <ContactCard key={c.id} contact={c} />)}
                                    {/* {!isEmpty(this.filteredContacts()) ? this.filteredContacts().map(c => <ContactCard key={c.id} contact={c} />) : null} */}
                                    {/* {this.props.contacts.map(c => <ContactCard key={c.id} contact={c} />)} */}
                          </div>
                    </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
    )
    }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    searchTerm: state.searchTerm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSearchTerm: (searchTerm) => dispatch(updateSearchTerm(searchTerm))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactContainer)