import './Modal.css'
import React from 'react'

/**
 * @param {Object} props
 * @param {Function} props.onClose Callback for when the modal should be closed
 */
function Modal ({ children, onClose }) {
  return (
    <div className='Modal' onClick={() => { onClose() }}>
      <div className='Modal-content' onClick={e => { e.stopPropagation() }}>
        {children}
      </div>
    </div>
  )
}

export default Modal
