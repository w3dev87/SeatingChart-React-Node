import React from 'react';
import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import { Link } from 'react-router';

export default () => {
  return (
    <List>
      <ListItem primaryText='Main Page' leftIcon={<ActionGrade />} />
      <Link to='admin-panel'>
        <ListItem primaryText='Admin Panel' leftIcon={<ActionGrade />} />
      </Link>
      <Link to='wedding-panel'>
        <ListItem primaryText='Wedding Panel' leftIcon={<ActionGrade />} />
      </Link>
      <Link to='booking-panel'>
        <ListItem primaryText='Booking Panel' leftIcon={<ActionGrade />} />
      </Link>
    </List>
  );
}
