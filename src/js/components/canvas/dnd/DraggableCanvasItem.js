import React from 'react';
import * as dndTypes from '../../../constants/dnd-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import CanvasItem from '../CanvasItem.js';

const canvasItemSource = {
  canDrag(props) {
    return !props.forbidDrag;
  },
  beginDrag(props) {
    props.canvasItemSelect(props.item.id, props.floorSelected);
    return props;
  }
};

function getStyles(props) {
  const { item, zoomFactor, isDragging } = props;
  const left = item.posX * zoomFactor;
  const top = item.posY * zoomFactor;

  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    transform: transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : ''
  };
}

@DragSource(
  dndTypes.CANVAS_ITEM,
  canvasItemSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
)
export default class DraggableCanvasItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    });
  }

  render() {
    const {
      connectDragSource
    } = this.props;

    return connectDragSource(
      <div style={ getStyles(this.props) }>
        <CanvasItem
          { ...this.props }
        />
      </div>
    );
  }
}
