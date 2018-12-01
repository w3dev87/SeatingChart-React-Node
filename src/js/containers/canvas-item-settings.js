import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import find from 'lodash/find';

import { canvasItemDeselect, canvasItemRemove } from 'actions/canvas-actions';

class CanvasItemSettings extends React.Component {

  constructor(props) {
    super(props);

    this.currentItem = null;
  }

  getObjectData() {
    const { id, floorIndex } = this.props.canvasActiveItem;
    const itemInstance = find(this.props.canvas[floorIndex], { id });
    const itemPrototype = find(this.props.constructorData, { type : itemInstance.type });
    
    this.currentItem = {
      instance : itemInstance,
      prototype : itemPrototype,
    };
  }

  handleClose() {
    const { id, floorIndex } = this.props.canvasActiveItem;
    this.props.canvasItemDeselect(id, floorIndex);
  }

  handleRemove() {
    const { id, floorIndex } = this.props.canvasActiveItem;
    this.props.canvasItemDeselect(id, floorIndex);
    this.props.canvasItemRemove(id, floorIndex);
  }

  render() {


    this.getObjectData();
    if (!this.currentItem) return false;

    const { instance, prototype } = this.currentItem;
    const { floorIndex } = this.props.canvasActiveItem;

    return (
      <div className='sidebar__box'>
        <p>This is the place to edit current item :</p>
        <ul>
          <li><b>Name</b>: {instance.name}</li>
          <li><b>Floor (state location)</b>: {floorIndex + 1}</li>
          <li><b>ID</b>: {instance.id}</li>
          <li><b>Type</b>: {instance.type}</li>
          <li><b>PosX</b>: {instance.posX} px</li>
          <li><b>PosY</b>: {instance.posY} px</li>
        </ul>
        <div>
          <button 
            onClick={this.handleClose.bind(this)}
            className='button primary'>
            Close
          </button> 
          <button 
            onClick={this.handleRemove.bind(this)}
            className='button alert'>
            Delete
          </button>
        </div>
        <p><em>* this section is the main part of the second stage</em></p>
      </div>
    );

  }


}


function mapStateToProps({ canvas, constructorData, canvasActiveItem }) {
  return {
    canvas, constructorData, canvasActiveItem
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    canvasItemDeselect, canvasItemRemove
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasItemSettings);
