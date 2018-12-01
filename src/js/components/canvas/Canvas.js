import CanvasItem from './CanvasItem';
import DraggableCanvasItem from './dnd/DraggableCanvasItem';
import DraggableMultiSelect from './dnd/DraggableMultiSelect';
import { DropTarget } from 'react-dnd';
import * as dndTypes from '../../constants/dnd-types';
import * as defaults from '../../config/defaults';

const dropTarget = {
  drop(props, monitor, component) {
    const canvasCoords = component.getCanvasCoords();
    const sourceOffset = monitor.getSourceClientOffset();
    const droppedItem = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();

    // There is a difference between items dragged from constructor panel and existing items
    // in canvas moving around
    const dndType = monitor.getItemType();
    const { zoomFactor } = props;

    switch(dndType) {
      case dndTypes.CANVAS_ITEM:
        props.canvasItemSetPosition(
          droppedItem.item.id,
          // Remove zoomFactor from raw data by division -- So we can have un-zoomed data in the state
          // We would affect zoomFactor later while showing canvas items to user in view
          Math.floor( delta.x / zoomFactor ),
          Math.floor( delta.y / zoomFactor ),
          props.floorSelected
        );
        break;
      case dndTypes.CANVAS_ITEM_MULTI_SELECT:
        props.canvasMultiSelectSetPosition(
          Math.floor( delta.x / zoomFactor ),
          Math.floor( delta.y / zoomFactor ),
          props.floorSelected
        );
        break;
      case dndTypes.CONSTRUCTOR_ITEM:
        const timestamp = new Date().getTime();
        const { seats, ...otherItemProps } = droppedItem;

        props.canvasItemAdd(
          {
            ...otherItemProps,
            id : `id-${ timestamp }`,
            isLastSelected : false,
            rotation: 0,
            posX : Math.floor(sourceOffset.x - canvasCoords.left),
            posY : Math.floor(sourceOffset.y - canvasCoords.top)
          },
          droppedItem.seats,
          props.floorSelected
        );
      break;
    }
  }
};

const renderMultiSelectedItems = (props) => {
  const {
    floorSelected,
    zoomFactor,
    getSvgBasedOnType,
    reservedSeats,
    bookedSeats,
    getCanvasItemFromId,
    canvasGroup
  } = props;

  const isMultiSelected = (canvasGroup.currentSelection.length > 1);

  if(!isMultiSelected) {
    return null;
  }

  const selectedItems = canvasGroup.currentSelection.map(itemId => getCanvasItemFromId(itemId, floorSelected));

  if(selectedItems) {
    const elements = selectedItems.map((item, idx) => {
      const canvasItemProps = {
        ...props,
        item,
        image: getSvgBasedOnType(item.type),
        isSelected: canvasGroup.currentSelection.indexOf(item.id) > -1,
        forbidDrag: true,
        zoomFactor: zoomFactor,
        reservedFor: reservedSeats[item.id] || undefined,
        bookedFor: bookedSeats[item.id] || undefined,
        itemDisplayName: item.displayName,
        key: idx
      };

      return( <DraggableCanvasItem { ...canvasItemProps } /> );

    });

    return (
      <DraggableMultiSelect>
        { elements }
      </DraggableMultiSelect>
    );
  }
};

export class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    canDrop           : React.PropTypes.bool.isRequired,
    canvasItemUpdate  : React.PropTypes.func,
    canvasItemSelect  : React.PropTypes.func,
    // canvasItemUpdate  : React.PropTypes.func.isRequired,
    // canvasItemSelect  : React.PropTypes.func.isRequired,
    canvas            : React.PropTypes.array.isRequired,
    connectDropTarget : React.PropTypes.func.isRequired,
    isOver            : React.PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.forceUpdate();
  }

  getCanvasCoords() {
    return this.canvas.getBoundingClientRect();
  }

  renderCanvasItems() {
    if(!this.canvas) {
      return (
        <h2>Canvas is not yet rendered (no canvas ref)!</h2>
      );
    }

    const canvasItems = this.props.canvas[this.props.floorSelected];

    if(canvasItems) {
      return canvasItems.map((item, idx) => {
        const {
          canvasItemSelect,
          canvasItemDeselect,
          canvasItemUpdate,
          selectSeat,
          floorSelected,
          zoomFactor,
          getSvgBasedOnType,
          reservedSeats,
          bookedSeats,
          getGuestFromId,
          isDroppable,
          seats,
          panelType,
          canvasGroup,
          activeSeat
        } = this.props;

        const isItemInMultiSelect =
          (canvasGroup.currentSelection.length > 1 &&
          canvasGroup.currentSelection.indexOf(item.id) > -1);

        // We render multi selected items separately
        // This helps us to move them easier together in canvas
        if(isItemInMultiSelect){
          return null;
        }

        const canvasItemProps = {
          canvasItemSelect,
          canvasItemDeselect,
          canvasItemUpdate,
          selectSeat,
          floorSelected,
          item,
          seats,
          dndScope: this.canvas,
          image: getSvgBasedOnType(item.type),
          isSelected: canvasGroup.currentSelection.indexOf(item.id) > -1,
          zoomFactor: zoomFactor,
          reservedFor: reservedSeats[item.id] || undefined,
          bookedFor: bookedSeats[item.id] || undefined,
          itemDisplayName: item.displayName,
          getGuestFromId,
          panelType,
          activeSeat,
          key: idx
        };

        const top = item.posY * zoomFactor;
        const left = item.posX * zoomFactor;

        // console.log("PRINTING ISDROPPABLE")
        // console.log(isDroppable);

        return (
          <div
            key={ idx }
          >
            {
              isDroppable
                ? <DraggableCanvasItem { ...canvasItemProps } />
                : <div
                    style={{
                      transform: `translate3d(${ left }px, ${ top }px, 0)`,
                      WebkitTransform: `translate3d(${ left }px, ${ top }px, 0)`
                    }}
                  >
                    <CanvasItem { ...canvasItemProps } />
                  </div>
            }
          </div>
        );
      });
    }
    
  }

  render() {
    const { canDrop, isOver, connectDropTarget, canvasItemDeselect } = this.props;

    return (
      connectDropTarget(
        <div
          className='canvas'
          onMouseUp={ (e) => canvasItemDeselect(null) }
          ref={c => this.canvas = c}>
          <div
            className="canvas__layer"
          >

            { this.renderCanvasItems() }
            { renderMultiSelectedItems(this.props) }

          </div>
        </div>
      )
    );
  }
}

export const DroppableCanvas = DropTarget(
  [dndTypes.CONSTRUCTOR_ITEM, dndTypes.CANVAS_ITEM, dndTypes.CANVAS_ITEM_MULTI_SELECT ],
  dropTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)(Canvas);
