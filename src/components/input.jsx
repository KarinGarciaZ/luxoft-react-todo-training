import React, { useState, memo } from 'react';

const Input = memo(({placeholder, addItem}) => {
  const [currentValue, setCurrentValue] = useState('');

  const handleValue = e => {
    setCurrentValue(e.target.value);
  };

  const onAddItem = () => {
    if ( currentValue && currentValue.length <= 28 ) {
      addItem(currentValue);
      setCurrentValue('');
    }
  };

  return (
    <div className="create-item">
        <input 
          type="text" 
          className="create-item-input" 
          placeholder={placeholder} 
          onChange={handleValue} 
          value={currentValue} />
        <button className="create-item-button" onClick={onAddItem}>
            Save
        </button>
    </div>
  )
});

export default Input;