import React, {useCallback, useReducer} from 'react';
import './App.css';
import Input from './components/input';
import Item from './components/item';

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [ ...state, action.payload];
    case 'remove':
      const todoListCopy = [ ...state ];
      const indexToComplete = todoListCopy.findIndex( item => item.id === action.payload );
      todoListCopy.splice(indexToComplete, 1);

      return todoListCopy;
    case 'complete':
      const listCopy = [ ...state ];
      const indexComplete = listCopy.findIndex( item => item.id === action.payload );
      listCopy[indexComplete].completed = true;

      return listCopy;
    default:
      throw new Error();
  }
}

const App = () => {
  const [todoList, dispatch] = useReducer(reducer, initialState);

  const addItem = useCallback( textValue => {
    const newItem = { 
      id: new Date().getUTCMilliseconds(), 
      value: textValue, 
      completed: false 
    };

    dispatch({type: 'add', payload: newItem});
  }, []);

  const removeItem = useCallback( (id, e) => {
    e.stopPropagation();
    dispatch({type: 'remove', payload: id});
  }, []);

  const completeItem = useCallback( id => {
    dispatch({type: 'complete', payload: id});
  }, []);

  const itemsToLoad = todoList.map( item => {
    return <Item 
      key={item.id} 
      id={item.id}
      text={item.value} 
      completed={item.completed}
      removeItem={removeItem} 
      completeItem={completeItem}
    />
  })

  return (
    <div className="container">
      <h2 className="title">work to-dos</h2>
      <div className="instructions">
        <p>Enter text into the input field to add items to your list(max. 28 characters).</p>
        <p>Click the item to mark it as complete.</p>
        <p>Click the "X" to remove the item from your list.</p>
      </div>
      <Input addItem={addItem} />
      <ul className="list">{itemsToLoad}</ul>
    </div>
  );
}

export default App;
