import React from 'react';
import * as actions from '../../actions/canvasSettingsActions';

export default ({ dispatch }) => {
  return (
    <div>
      <div className="button-group">
        <button onClick={ () => dispatch( actions.canvasZoomIn() ) } className='button small'>
          Zoom In
        </button>
        <button onClick={ () => dispatch( actions.canvasResetZoom() ) } className='button small'>
          Fit In
        </button>
        <button onClick={ () => dispatch( actions.canvasZoomOut() ) } className='button small'>
          Zoom Out
        </button>
      </div>

      <div className="button-group">
        <button onClick={ () => dispatch( actions.canvasMoveRight() ) } className='button small'>
          Move Right
        </button>
        <button onClick={ () => dispatch( actions.canvasMoveLeft() ) } className='button small'>
          Move Left
        </button>
      </div>

      <div className="button-group">
        <button onClick={ () => dispatch( actions.canvasMoveUp() ) } className='button small'>
          Move Up
        </button>
        <button onClick={ () => dispatch( actions.canvasMoveDown() ) } className='button small'>
          Move Down
        </button>
      </div>
    </div>
  );
};
