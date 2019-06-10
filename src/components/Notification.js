import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {

  Notification.propTypes = {
    Notification: PropTypes.string
  }

  if (message === null) {
    return null
  }
  return <div className='message'>{message}</div>
}

export default Notification
