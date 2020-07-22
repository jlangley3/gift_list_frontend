import React from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'

const NoContacts = () => (
  <Segment placeholder>
    <Header icon>
      <Icon name='user plus' />
      You do not have any Lists or Contacts.
    </Header>
    <Button primary>Add New Contact</Button>
  </Segment>
)

export default NoContacts