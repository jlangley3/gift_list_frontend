import React, { PureComponent, createRef } from 'react'
import { connect } from 'react-redux'
import ContactCard from '../components/ContactCard'
import { Checkbox, Input, Grid, Sticky, Ref } from 'semantic-ui-react'
import { updateSearchTerm } from '../redux/actions/contacts'


class ContactCardContainer extends PureComponent {
  contextRef = createRef()
  state = { checked: false }
  toggle = () => this.setState({ checked: !this.state.checked })

  filteredContacts = () => {
    return this.props.contacts.filter(c => c.name.toLowerCase().includes(this.props.searchTerm.toLowerCase()))
  }

  render() {
    
    return(
      <>
      <h2>
        Contact Cards
      </h2>
        <Grid stackable>
        <Grid.Row>
              <Ref innerRef={this.contextRef}>
          <Grid.Column width={8}>

            <Sticky context={this.contextRef}>
            <img class='full-width' src={require('../helper/images/GreenMoon.jpg')} alt='pleasant surprise' />
            </Sticky>
          </Grid.Column>
            </Ref>

        
          <Grid.Column width={8}>

          
      
      <div>
        <Checkbox 
          slider
          label='Sort By Name'
          checked={this.state.checked}
          onChange={this.toggle}
        />
        <Input
          icon='search'
          type='text'
          size='large'
          value={this.props.searchTerm}
          onChange={(e) => this.props.updateSearchTerm(e.target.value)}
          onClick={this.toggleVisibility}
          name='filter'
          placeholder='Search Contacts...'>
        </Input>
        <p />
        <div className='ui two stackable cards'>
          {this.state.checked ?
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
            }).map(c => <ContactCard key={c.id} contact={c} />)

          }
        </div>
      </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </>
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


export default connect(mapStateToProps, mapDispatchToProps)(ContactCardContainer)