import './Modal.css'
import React from 'react'
import classNames from 'classnames'

/**
 * @param {Object} props
 * @param {Function} props.onClose Callback for when the modal should be closed
 * @param {'changelog'} props.specialStyling Applies special styling for certain content
 */
function Modal ({ children, onClose, specialStyling }) {
  const modalContentClasses = classNames('Modal-content', {
    'Modal-content--changelog': specialStyling === 'changelog'
  })
  return (
    <div className='Modal' onClick={() => { onClose() }}>
      <div className={modalContentClasses} onClick={e => { e.stopPropagation() }}>
        {children}
      </div>
    </div>
  )
}

export default Modal
