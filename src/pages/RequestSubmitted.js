import React from 'react'
import { Button } from 'react-materialize'
import { useHistory } from 'react-router-dom'

const Orders = () => {
  const history = useHistory()
  const returnHome = () => {
    history.push('/')
  }

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h4> Request Submitted, we will contact you via email shortly! </h4>
      <div>
        <Button onClick={returnHome}>Continue Shopping! </Button>
      </div>
    </div>
  )
}

export default Orders
