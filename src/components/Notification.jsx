import PropTypes from 'prop-types'

const Notification = ({ data }) => {
  if (!data) {
    return null
  }

  const { message, type } = data

  if (type === 'error') {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

Notification.propTypes = {
  data: PropTypes.object
}

export default Notification