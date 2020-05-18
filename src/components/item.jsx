import React, { memo } from 'react';

const Item = memo(({id, text, completed, removeItem, completeItem}) => {
  const classes = ['list-item'];
  
  if ( completed )
    classes.push('list-item-completed');

  return (
    <li className={classes.join(' ')} onClick={completeItem.bind(this, id)}>
      <span className="list-item-text">{text}</span>
      <span className="list-item-close" onClick={removeItem.bind(this, id)}>X</span>
    </li>
  )
});

export default Item;