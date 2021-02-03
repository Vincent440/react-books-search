import React from 'react'

function Jumbotron ({ children }) {
  return (
    <div style={{ height: 100, clear: 'both', paddingTop: 20, paddingBottom: 20, textAlign: 'center',margin: 0 }} className='jumbotron'>
      {children}
    </div>
  )
}
export default Jumbotron
