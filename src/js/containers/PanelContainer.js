import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dataActions from '../actions/data-api-actions';
import Constructor from '../components/constructor/Constructor';
import CanvasContainer from './CanvasContainer';
import CanvasItemEditor from '../components/canvasItemEditor/CanvasItemEditor';
import { find } from 'lodash/collection';
import CanvasSettings from '../components/canvas/CanvasSettings';
import * as panelTypes from '../constants/panelTypes';
import ActiveItemSettings from '../components/activeItemSettings/ActiveItemSettings';
import FloorsBar from '../components/floors/Floors';
import AttendeesList from '../components/attendees/AttendeesList';
import * as seatingTypes from '../constants/seatingTypes';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';
// import Collapsible from 'react-collapsible/dist/Collapsible.js';

// react-dnd 
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import constructorObjects from '../../../assets/fixtures/constructorObjects.json';
import constructorItemsHelper from '../helpers/constructorItemsHelper';


const constructorItems = new constructorItemsHelper(constructorObjects);

// Should load it based on authentication system, right now it's not connected to that
const loggedUserId = 'MyUserId';

const sidebarWidth = 240;

@DragDropContext(HTML5Backend)
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch( dataActions.fetchInitialData() );
    this.props.dispatch( dataActions.loadGuestsFromAPI(loggedUserId) );
  }

  getActiveItem() {
    const { state, state: { canvasActiveItem: { id, floorIndex } } } = this.props;
    return find(state.canvas[floorIndex], { id }) || {};
  }

  getReservedSeat(activeItem) {
    const { state } = this.props;
    const { activeSeat } = state;

    const isActiveItemReserved = state.reservedSeats[activeItem.id] && activeSeat.itemId === activeItem.id;

    if(isActiveItemReserved) {
      if(activeSeat.seatingType === seatingTypes.ON_TABLE) {
        return state.reservedSeats[activeItem.id][activeSeat.position][activeSeat.seatNumber]
      }
      else if( activeSeat.seatingType === seatingTypes.SINGLE_CHAIR) {
        return state.reservedSeats[activeItem.id];
      }
    }
  }

  getBookedSeat(activeItem) {
    const { state } = this.props;
    const { activeSeat } = state;

    const isActiveItemBooked = state.bookedSeats[activeItem.id] && activeSeat.itemId === activeItem.id;

    if(isActiveItemBooked) {
      if(activeSeat.seatingType === seatingTypes.ON_TABLE) {
        return state.bookedSeats[activeItem.id][activeSeat.position][activeSeat.seatNumber]
      }
      else if( activeSeat.seatingType === seatingTypes.SINGLE_CHAIR) {
        return state.bookedSeats[activeItem.id];
      }
    }
  }

  render() {
    const { state, dispatch, route } = this.props;
    const { panelType } = route;

    const activeItem = state.canvasActiveItem
      ? this.getActiveItem()
      : {};

    const isMultiSelect = state.canvasGroup.currentSelection.length > 1;

    const isAdminPanel = panelType === panelTypes.ADMIN_PANEL;
    const isWeddingPanel = panelType === panelTypes.WEDDING_PANEL;
    const isBookingPanel = panelType === panelTypes.BOOKING_PANEL;

    return (
      <div className='layout-seating-canvas'>
        {
          ( isAdminPanel || isWeddingPanel ) && state.canvasActiveItem &&
            <CanvasItemEditor
              activeFloor={ state.canvasActiveItem.floorIndex }
              activeItem={ activeItem }
              isMultiSelect={ isMultiSelect }
              dispatch={ dispatch }
              seats={ state.seats }
            />
        }

        <div className='canvas-block'>
          <div
            className='sidebar'
            style={{ width: sidebarWidth }}
          >

            { ( isWeddingPanel || isBookingPanel ) && state.canvasActiveItem &&
              <div className='sidebar__box'>
                <ActiveItemSettings
                  itemType={ activeItem.type }
                  categoryId={ activeItem.categoryId }
                  itemName={ activeItem.name }
                  itemId={ activeItem.id }
                  reservedFor={ this.getReservedSeat(activeItem) }
                  bookedFor={ this.getBookedSeat(activeItem) }
                  panelType={ panelType }
                  dispatch={ dispatch }
                  guestsList={ state.guestsList }
                  loggedUserId={ loggedUserId }
                  activeSeat={ state.activeSeat }
                />
              </div>
            }

            { ( isAdminPanel || isWeddingPanel ) &&
                      
              <Tabs justified={true}>
                <Tab value="pane-1">
                  <Constructor
                    items={ constructorItems.getItems() }
                    getSvgBasedOnType={ constructorItems.getSVGBasedOnType }
                  />
                </Tab>
                <Tab value="pane-2">
                  <AttendeesList
                    guestsList={ state.guestsList }
                    reservedFor={ this.getReservedSeat(activeItem) }
                    bookedFor={ this.getBookedSeat(activeItem) }
                    dispatch={ dispatch }
                    activeItem={ activeItem }
                    activeSeat={ state.activeSeat }
                  />
                </Tab>
              </Tabs>
            }

            { ( isAdminPanel || isWeddingPanel ) &&
              <div className='sidebar__box'>
                <button
                  onClick={ () => dispatch( dataActions.saveAppData(state) ) }
                  className='button success'>Save
                </button>
              </div>
            }
          </div>

          <CanvasContainer
            constructorObjects={ constructorItems.getFlattenItems() }
            getSvgBasedOnType={ constructorItems.getSVGBasedOnType }
            guestsList={ state.guestsList }
            isDroppable={ isAdminPanel || isWeddingPanel }
            panelType={ panelType }
          />
        </div>

        <div className='canvas-controller'>
          <CanvasSettings dispatch={ dispatch } />
        </div>

        <div
          className='floors-bar-container'
        >
          <FloorsBar
            floorsCount={ state.floors.floors }
            currentFloor={ state.floors.current }
            editable={ isAdminPanel || isWeddingPanel }
            dispatch={ dispatch } />
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {state};
}

export default connect(
  mapStateToProps
)(App);
