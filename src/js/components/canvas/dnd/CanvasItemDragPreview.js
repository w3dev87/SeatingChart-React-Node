import React, { Component, PropTypes } from 'react';
import CanvasItem from '../CanvasItem';

export default class CanvasItemDragPreview extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <CanvasItem
          { ...this.props }
        />
      </div>
    );
  }
}
