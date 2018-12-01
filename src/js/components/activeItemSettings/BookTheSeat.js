import React from 'react';
import * as actions from '../../actions/seatActions';
import * as seatingType from '../../constants/seatingTypes';

export default ({ itemId, dispatch, bookedFor, activeSeat }) => {
  const isOnTable = activeSeat.seatingType === seatingType.ON_TABLE;
  return (
    <div>
      { bookedFor ?
          <div>
            <p>This seat is booked by you. Want to cancel booking?</p>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                onClick={ () => dispatch(
                  isOnTable ?
                    actions.cancelBookSeat(
                      activeSeat.seatNumber,
                      activeSeat.position,
                      activeSeat.itemId
                    )
                  :
                    actions.cancelBookSingleChairSeat(
                      activeSeat.itemId
                    )
                ) }
                className='button warning'
              >
                Cancel This Seat
              </button>
            </p>
          </div>
        :
        <div>
          <p>This seat is empty. You can book it by clicking on the button below.</p>
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              onClick={ () => dispatch(
                isOnTable ?
                  actions.bookSeat(
                    activeSeat.seatNumber,
                    activeSeat.position,
                    activeSeat.itemId
                  )
                :
                  actions.bookSingleChairSeat(activeSeat.itemId)
              ) }
              className='button success'
            >
              Book Now
            </button>
          </p>
        </div>
      }
    </div>
  );
}
