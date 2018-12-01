import React from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { avatar } from '../../config/defaults';
import * as actions from '../../actions/seatActions';
import * as seatingType from '../../constants/seatingTypes';


const filterNotSeatedGuests = (guestsList) => {
  return guestsList.filter(guest => guest.isNotSeated);
};

const filterSeatedGuests = (guestsList) => {
  return guestsList.filter(guest => !guest.isNotSeated);
};


export default ({ guestsList, dispatch, activeSeat }) => {
  const isOnTable = activeSeat.seatingType === seatingType.ON_TABLE;
  const isChairSelected = Boolean(activeSeat.itemId);

  return (
    <div>
      <List>
        <Subheader>Unseated Attendees</Subheader>
        {
          filterNotSeatedGuests(guestsList).map((guest, idx) =>
            <ListItem
              primaryText={ guest.userName }
              leftAvatar={<Avatar src={ avatar } />}
              key={ idx }
              onTouchTap={
                () =>  isChairSelected && dispatch(
                  isOnTable ?
                    actions.reserveSeat(
                      activeSeat.seatNumber,
                      activeSeat.position,
                      activeSeat.itemId,
                      guest.userId
                    )
                  :
                    actions.reserveSingleChairSeat(
                      activeSeat.itemId,
                      guest.userId
                    )
                )
              }
            />
          )
        }

      </List>
      <Divider />
      <List>
        <Subheader>Seated Attendees</Subheader>
        {
          filterSeatedGuests(guestsList).map((guest, idx) =>
            <ListItem
              primaryText={ guest.userName }
              leftAvatar={<Avatar src={ avatar } />}
              key={ idx }
              onTouchTap={
                () => dispatch(
                  // Finding if it's a table or single chair by duck typing!
                  Boolean(guest.seat.position) ?
                    actions.reserveUnseat(
                      guest.seat.seatNumber,
                      guest.seat.position,
                      guest.seat.itemId,
                      guest.userId
                    )
                  :
                    actions.reserveSingleChairUnseat(
                      guest.seat.itemId,
                      guest.userId
                    )
                )
              }
            />
          )
        }
      </List>
    </div>
  );
}
