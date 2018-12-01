import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from './components/Menu';

//import 'react-flexr/styles.css';

export class App extends Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state
  };
};

export default connect(
  mapStateToProps
)(App);
