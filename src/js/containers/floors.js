import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { floorAdd, floorRemove, floorChange } from 'actions/floors-actions';

import FloorListItem from 'components/floor-list-item';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleItemAdd = this.handleItemAdd.bind(this);
    this.handleItemRemove = this.handleItemRemove.bind(this);
    this.handleItemSelect = this.handleItemSelect.bind(this);
  }

  handleItemAdd() {
    this.props.floorAdd();
  }

  handleItemRemove(index) {
    this.props.floorRemove(index);
  }

  handleItemSelect(index) {
    this.props.floorChange(index);
  }

  renderListItems() {
    let result = [];
    for(let i = 0; i < this.props.floorsCount; i++) {
      let listItem = (
        <FloorListItem 
          isActive={i == this.props.currentFloor}
          canDelete={this.props.floorsCount != 1}
          key={i}
          select={this.handleItemSelect}
          remove={this.handleItemRemove}
          index={i} />
      );

      result.push(listItem);
    }
    return result;
  }

  render() {

    let submitButton = (
      <button 
        onClick={this.handleItemAdd}
        className="floors__add button small">
        Add new floor
      </button>
    );

    return (
      <div className='floors'>

        <h4 className="floors__title">Floors</h4>

        <div className="floors__list">

          {this.renderListItems()}

        </div>
        

        {this.props.floorsCount < 3 ? submitButton : ''}

      </div>
    );
  }
}


function mapStateToProps({ floors }) {
  return {
    floorsCount : floors.floors,
    currentFloor : floors.current
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    floorAdd, 
    floorRemove, 
    floorChange,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);