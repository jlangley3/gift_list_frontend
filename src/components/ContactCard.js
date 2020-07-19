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
        <Card as={Link} to={`/friends/${this.props.contact.id}`}>
          <Card.Content>
            <Image floated='right' size='mini' src={this.props.contact.avatar} />
            <Card.Header>{this.props.contact.name}</Card.Header>
            <Card.Meta>
              <span className='date'>Connected {moment(this.props.contact.created_at).fromNow()}</span>
            </Card.Meta>
            <Card.Description>
              <Label size='tiny'>
                {this.props.contact.kind}
              </Label>
            </Card.Description>
          {/* <Menu fluid text vertical className='scrolled'>
            {this.props.reminders.filter(r => r.contact_id === this.props.contact.id).map(r => {
              return (
                <Dropdown key={r.id} text={r.msg} pointing='left' className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => this.handleOpen('editReminderModal', r)
                      }>Edit Reminder { this.editReminder() }</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.handleOpen('deleteReminderModal', r)}>Delete Reminder { this.deleteReminder() }</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )
            })}
          </Menu> */}
          </Card.Content>
          <Card.Content extra>
            <Icon name='bell' />
           
            <br />
            <Icon name='comments outline' />
           
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