import React from 'react'

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn (props) {
  return (
    <button className='save-btn btn px-3 m-2 btn-outline-danger' {...props} tabIndex='0'>
      Delete
    </button>
  )
}

export default DeleteBtn
