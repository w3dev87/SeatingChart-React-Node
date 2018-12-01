import { DragSource } from 'react-dnd';
import * as dndTypes from '../../constants/dnd-types';
import Icon from './../Icon';

const boxSource = {
  beginDrag(props, monitor) {
    return {
      ...props
    };
  }
};

@DragSource(dndTypes.CONSTRUCTOR_ITEM, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class ConstructorItem extends React.Component {
  static propTypes = {
    connectDragSource : React.PropTypes.func.isRequired,
    type              : React.PropTypes.string.isRequired,
    image             : React.PropTypes.string.isRequired,
    isDragging        : React.PropTypes.bool.isRequired,
    name              : React.PropTypes.string.isRequired
  };

  render() {
    const {
      isDragging,
      connectDragSource,
      image,
      name
    } = this.props;

    const opacity = isDragging ? 0.4 : 1;

    return (
      connectDragSource(
        <div
          className="constructor-item"
          style={{ opacity }} >

          <div className="constructor-item__image">
            <Icon glyph={ image } />
          </div>
          <span className="constructor-item__title">
            { name }
          </span>

        </div>
      )
    );
  }
}
