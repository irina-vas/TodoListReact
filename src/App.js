import TodoList from './Todo/TodoList';
import React, { useEffect } from 'react';
import Context from './context';
import AddTodo from './Todo/AddTodoComponent/AddTodo';
import Loader from './LoaderComponent/Loader';

const styles = {
  headLine: {
    textAlign: 'center',
    color: '#437a76',
  },
  wrapper: {
    backgroundColor: '#d0dedc',
  }
}


function App() {
  const[todos, setTodos] = React.useState([]);

  const[loading, setLoading] = React.useState(true);

  useEffect(()=> {
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(response => response.json())
    .then(todos =>
      setTimeout(() => {
        setTodos(todos);
        setLoading(false);
      },2000)
  )    
}, [])

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false,
    }]))
  }

  return (
    <Context.Provider value={ {removeTodo} }>
      <div className="wrapper" style={styles.wrapper}>
        <h1 style={styles.headLine}>Todo list</h1>
        <AddTodo onCreate={addTodo} />
        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo}/> 
        ) : (
          loading ? null : <p className="noTodo">nothing scheduled for today</p>
        )}
        
      </div>
    </Context.Provider>
  )
}

export default App;
