import React from 'react'
import { Modal } from 'semantic-ui-react'
import ReminderForm from './ReminderForm'

const EditReminder = (props) => {
  return(
        <Modal
          open={props.modalOpen}
          onClose={() => {
            props.modalClose()
            // this.toggleEditForm()
            // this.handleClose()
          }} 
          size='tiny'
        >

        <ReminderForm 
          contact={props.contact} 
          title={'Update reminder!'} 
          reminder={props.reminder} 
          handleClose={ props.modalClose }
        />

      </Modal>
  )
}

export default EditReminder