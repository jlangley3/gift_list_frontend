import moment from 'moment'

export const formatReminderToast = (r, contacts, contactName) => {
  const text = r.msg[0].toUpperCase() + r.msg.slice(1, r.msg.length)


  const contact = contacts.find(c => c.id == r.contact_id).first_name
  return text + ' ' + contact
}

export const formatReminder = (r, contacts, contactName) => {
  const date = moment(r.start).format('MMMM Do, YYYY')
  if (contactName) {
    const text = r.msg[0].toUpperCase() + r.msg.slice(1, r.msg.length)

    return text + ' ' + contactName
  }
  
  return date + ' - ' + formatReminderToast(r, contacts)
}