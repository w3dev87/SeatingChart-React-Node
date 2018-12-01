import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as canvasActions from '../actions/canvas-actions';
import * as seatActions from '../actions/seatActions'
import { DroppableCanvas, Canvas } from './../components/canvas/Canvas';
import CustomDragLayer from '../components/canvas/dnd/CustomDragLayer';
import { find } from 'lodash/collection';

const getGuestFromId = (list) => {
  return (id) => {
    return find(list, { userId: id }) || {};
  };
};

const getCanvasItemFromId = (canvas) => {
  return (id, floor) => {
    return find(canvas[floor], { id });
  }
};

export class CanvasContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { guestsList, isDroppable, ...otherProps  } = this.props;
    const { zoomFactor, posY, posX, canvas } = otherProps;

    const canvasWrapperWidth = 1200 * zoomFactor;
    const canvasWrapperHeight = window.innerHeight * zoomFactor;

    const rootWrapperStyle = {
      width: 'calc(100% - 250px)',
      height: '723px',
      display: 'table-cell'
    };
    const innerWrapperStyle = {
      width: '100%',
      height: '100%',
      border: 'solid 2px #eee',
      background: '#fff'
    };

    // console.log("PRINTING ISDROPPABLE-PARENT");
    // console.log(isDroppable);

    return (
      <div className="main-canvas" style={ rootWrapperStyle }>
        <div style={ innerWrapperStyle }>
          { isDroppable
            ? <DroppableCanvas
                { ...otherProps }
                getGuestFromId={ getGuestFromId(guestsList) }
                getCanvasItemFromId={ getCanvasItemFromId(canvas) }
                isDroppable={ isDroppable }
              />
            : <Canvas
                { ...otherProps }
                connectDropTarget={ (i) => i }
                getGuestFromId={ getGuestFromId(guestsList) }
                getCanvasItemFromId={ getCanvasItemFromId(canvas) }
                key = { 3 }
              />
          }
          <CustomDragLayer />
        </div>
      </div>
    );
  }
}

function mapStateToProps({
  canvas,
  floors,
  canvasSettings,
  reservedSeats,
  bookedSeats,
  seats,
  guestsList,
  canvasGroup,
  activeSeat
}) {
  const { posX, posY, zoomFactor } = canvasSettings;
  return {
    canvas,
    floorSelected : floors.current,
    posX,
    posY,
    zoomFactor,
    reservedSeats,
    bookedSeats,
    activeSeat,
    seats,
    guestsList,
    canvasGroup
  };
}

function mapDispatchToProps(dispatch) {
  const {
    canvasMultiSelectSetPosition,
    canvasItemSetPosition,
    canvasItemSelect,
    canvasItemDeselect,
    canvasItemAdd
    } = canvasActions;

  return bindActionCreators({
    canvasMultiSelectSetPosition,
    canvasItemSetPosition,
    canvasItemSelect,
    canvasItemDeselect,
    canvasItemAdd,
    selectSeat: seatActions.selectSeat
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasContainer);
