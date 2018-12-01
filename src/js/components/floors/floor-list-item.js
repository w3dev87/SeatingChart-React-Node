export default class FloorsListItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleSelect() {
    this.props.select(this.props.index);
  }

  handleRemove() {
    this.props.remove(this.props.index);
  }

  render() {
      let itemClassName = 'floors-item';
      if(this.props.isActive) itemClassName += ' is-active';

      let deleteButton = '';
      if(this.props.canDelete) {
        deleteButton = (
          <button 
            onClick={this.handleRemove}
            className="hollow floors-item__delete">
            <i className="fa fa-close fa-lg"></i>
          </button>
        );
      }

    return (
      <div className={itemClassName}>
        <span 
          onClick={this.handleSelect}
          className="floors-item__title">
          Floor #{this.props.index + 1}
        </span>
        {deleteButton}
      </div>
    );
  }
  
}
