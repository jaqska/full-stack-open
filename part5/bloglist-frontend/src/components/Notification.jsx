import React from "react"

const Notification = ( { message, type } ) => {
  if (!message) return null

  const notificationStyle = {
    color: type === 'success' ? 'green' : 'red',
    backgroundColor: '#f4f4f4',
    padding: '10px',
    border: `2px solid ${type === 'success' ? 'green' : 'red'}`,
    borderRadius: '5px',
    marginBottom: '15px',
  };

  return (
    <div style={notificationStyle} className={`notification ${type}`}>
      {message}
    </div>
  )
}

export default Notification