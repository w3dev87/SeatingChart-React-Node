import React, { Component, PropTypes } from 'react';
import * as ItemTypes from '../../../constants/dnd-types';
import CanvasItemDragPreview from './CanvasItemDragPreview';
import MultiSelectDragPreview from './MultiSelectDragPreview';
import { DragLayer } from 'react-dnd';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  const transform = `translate(${ currentOffset.x }px, ${ currentOffset.y }px)`;
  return {
    transform: transform,
    WebkitTransform: transform
  };
}

@DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))
export default class CustomDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired
  };

  renderItem(type, item) {
    switch (type) {
      case ItemTypes.CANVAS_ITEM:
        return (
          <CanvasItemDragPreview { ...item } />
        );
      case ItemTypes.CANVAS_ITEM_MULTI_SELECT:
        return (
          <MultiSelectDragPreview { ...item }/>
        );
      default:
        return null;
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div style={ layerStyles }>
        <div style={ getItemStyles(this.props) }>
          { this.renderItem(itemType, item) }
        </div>
      </div>
    );
  }
}
