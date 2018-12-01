import React, { Component, PropTypes } from 'react';
import CanvasItem from '../CanvasItem';

export default class MultiSelectDragPreview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}
