import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Header } from 'semantic-ui-react'
import { deletingReminder } from '../redux/actions'

class DeleteConfirmation extends React.PureComponent {
  state={
    deleteConfirmation: false
  }

  openDeleteConfirmation = () => this.setState({deleteConfirmation: true})
  closeDeleteConfirmation = () => this.setState({deleteConfirmation: false})

  render() {
    return(
    <Modal
      trigger={<Button content='Delete Reminder' onClick={this.openDeleteConfirmation} /> }
      size='mini'
      open={this.state.deleteConfirmation}
      onClose={this.closeDeleteConfirmation}
      >
      <Header icon='trash' content='Delete this reminder?'/>
      <Modal.Content>
        <p>This will delete all recurrances and is an irreversible action. Are you sure you want to proceed?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative content='No' onClick={
          (e) => {
            // e.stopPropagation()
            this.closeDeleteConfirmation()
          }
        }/>
        <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={(e) => {
          // e.stopPropagation()
          this.props.deletingReminder(this.props.reminder)
          this.props.handleClose()
          }
        }/>
      </Modal.Actions>
    </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deletingReminder: (reminder) => dispatch(deletingReminder(reminder))
  }
}

export default connect(null, mapDispatchToProps)(DeleteConfirmation)