import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class RemoveButton extends React.Component {
  state = {
    warningModal: false
  };

  handleOpen = () => {
    this.setState({ warningModal: true });
  };

  handleClose = () => {
    this.setState({ warningModal: false });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={ this.handleClose }
      />,
      <FlatButton
        label="Remove Item"
        primary
        onTouchTap={ () => {
          this.props.removeAction();
          this.handleClose();
        } }
      />
    ];

    return (
      <div>
        <button
          onClick={ this.handleOpen }
          className='alert button small canvas-item-editor__sidebox-button'
        >
          <i className="fa fa-trash" style={{ fontSize: '17px' }} aria-hidden="true"/>
        </button>

        <Dialog
          actions={ actions }
          modal={ false }
          open={ this.state.warningModal }
          onRequestClose={ this.handleClose }
          contentStyle={{ width: '400px' }}
        >
          Are you sure you want to remove
          { this.props.isMultiSelect? ' these items': ' this item' }
          ?
        </Dialog>
      </div>
    );
  }
}
