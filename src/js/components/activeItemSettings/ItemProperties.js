import React from 'react';

export default ({ itemName, itemType }) => {
  return (
    <div>
      <h3>Item Properties</h3>
      <p>
        <span>Active Item:</span>
        { ' ' }
        <span>{ itemName }</span>
      </p>
    </div>
  );
}
