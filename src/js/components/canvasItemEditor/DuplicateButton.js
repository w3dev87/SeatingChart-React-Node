import React from 'react';

export default ({ onClick }) => {
  return (
    <button
      onClick={ onClick }
      className='button small canvas-item-editor__sidebox-button'
    >
      <i className="fa fa-files-o" style={{ fontSize: '17px' }} aria-hidden="true"/>
    </button>
  );
}
