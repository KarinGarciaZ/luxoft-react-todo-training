import React, {useState, useCallback} from 'react';
import './App.css';
import Input from './components/input';
import Item from './components/item';

const App = () => {
  const [todoList, setTodoList] = useState([]);

  const addItem = useCallback( textValue => {
    const newItem = { 
      id: new Date().getUTCMilliseconds(), 
      value: textValue, 
      completed: false 
    };
    setTodoList(currentList => [ ...currentList, newItem ]);
  }, []);

  const removeItem = (id, e) => {
    e.stopPropagation();

    const todoListCopy = [ ...todoList ];
    const indexToComplete = todoListCopy.findIndex( item => item.id === id );
    todoListCopy.splice(indexToComplete, 1);
    setTodoList(todoListCopy);
  };

  const completeItem = id => {
    const todoListCopy = [ ...todoList ];
    const indexToComplete = todoListCopy.findIndex( item => item.id === id );
    todoListCopy[indexToComplete].completed = !todoListCopy[indexToComplete].completed;
    setTodoList(todoListCopy);
  };

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
