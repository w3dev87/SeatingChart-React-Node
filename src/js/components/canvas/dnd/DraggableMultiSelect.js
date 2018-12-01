import React from 'react';
import * as dndTypes from '../../../constants/dnd-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import CanvasItem from '../CanvasItem.js';

const canvasItemSource = {
  beginDrag(props) {
    return props;
  }
};

@DragSource(
  dndTypes.CANVAS_ITEM_MULTI_SELECT,
  canvasItemSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)
export default class DraggableMultiSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      connectDragSource
    } = this.props;

    return connectDragSource(
      <div>
        { this.props.children }
      </div>
    );
  }
}
