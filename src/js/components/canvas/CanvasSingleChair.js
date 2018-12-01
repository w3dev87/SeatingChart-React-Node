import React from 'react';
import Icon from '../Icon';
import GuestTagName from './GuestTagName';

export default ({ onClick, showGuest, guestName, color, isSelected, size, image, zoomFactor }) => {
  return (
    <div
      className='canvas-item__object'
      onClick={ onClick }
    >
      { showGuest &&
        <div>
          <GuestTagName
            name={ guestName }
            zoomFactor={ zoomFactor }
          />
          <div
            style={{
              fontSize: `${ size * 1.3 }px`,
              position: 'relative',
              width: `${ size }px`
            }}>
            <i
              style={{
                position: 'absolute',
                top: `-5px`,
                left: '0',
                right: '0',
                zIndex: '1'
              }}
              className='fa fa-user'
              aria-hidden
            />
          </div>
        </div>
      }

      <Icon
        glyph={ image }
        width={ size }
        height={ size }
        isSelected={ isSelected }
        strokeSize={ 3 }
        color={ color }
        itemType={ 'itemChair' }
      />

    </div>
  );
}
