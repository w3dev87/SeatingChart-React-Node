import React from 'react';
import { SketchPicker } from 'react-color';

const getCssRgbaFromColor = (color) => {
  if (color && color.r && color.g && color.b && color.a) {
    return `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`;
  } else {
    return null;
  }
};

export default class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1'
    }
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };

  componentDidUpdate(prevProps, prevState) {
    if(prevState.color != this.state.color && prevProps.itemId === this.props.itemId) {
      this.props.onChange(this.state.color);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value != this.state.color) {
      this.setState({ color: nextProps.value });
    }
  }

  render() {
    const styles = {
      color: {
        width: '36px',
        height: '23px',
        borderRadius: '2px',
        lineheight: '1',
        background: getCssRgbaFromColor(this.state.color),
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '5px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer'
      },
      popover: {
        position: 'absolute',
        zIndex: '2'
      },
      cover: {
        position: 'fixed',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      },
      span: {
        marginTop: '9px',
        verticalAlign: 'top'
      }
    };

    return (
      <div className="control-wrapper">
        <span style={ styles.span }>Color:</span>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        {
          this.state.displayColorPicker ?
            <div style={ styles.popover }>
              <div style={ styles.cover } onClick={ this.handleClose }/>
              <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
            </div>
          :
            null
        }

      </div>
    )
  }
}
