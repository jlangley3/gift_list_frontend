import React from 'react';
import { connect } from 'react-redux';
import { deletingContact } from '../redux/actions/contacts';
import { deletingEvent } from '../redux/actions/events';
import { Card, Icon, Image, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class ContactCard extends React.Component {


  render() {
    return (
      <React.Fragment>
        <Card as={Link} to={`/contacts/${this.props.contact.id}`}>
          <Card.Content>
            <Image floated='right' size='mini' src={this.props.contact.avatar} />
            <Card.Header>{this.props.contact.name}</Card.Header>
            <Card.Description>
              <Label size='tiny'>
                {this.props.contact.kind}
              </Label>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          Birthday: { moment(this.props.contact.birthday).format('ll') }
          </Card.Content>
        </Card>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user_id: state.user.id,
    events: state.events,
    contacts: state.contacts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deletingContact: (contact) => dispatch(deletingContact(contact)),
    deletingEvent: (event) => dispatch(deletingEvent(event))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactCard)