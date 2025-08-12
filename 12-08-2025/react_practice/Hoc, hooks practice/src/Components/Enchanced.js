import React from 'react'
import MyLoggedComponent from './Functional'

const Enchanced = () => {
  return (
    <div>
      <h1>HOC Example with Functional Components</h1>
      <MyLoggedComponent message="Hello from the logged component!" />
    </div>
  )
}

export default Enchanced
