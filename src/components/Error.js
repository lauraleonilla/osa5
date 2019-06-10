import React from 'react'
import PropTypes from 'prop-types'

const Error = ({ errorMessage }) => {

  Error.propTypes = {
    errorMessage: PropTypes.string
  }

  if (errorMessage === null) {
    return null
  }
  return <div className='error'>{errorMessage}</div>
}

export default Error
