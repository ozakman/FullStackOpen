import React from 'react'


const Notification = ({ message, errorMessage }) => {
  if (message === null) {
    return null
  }
  else if(message){
    console.log('confirmationMessage is: ', message) 
    return (
      <div className="confirmationMessage">
        {message}
      </div>
    )
  }else{
    console.log('error message is: ', errorMessage)
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  }
}

export default Notification