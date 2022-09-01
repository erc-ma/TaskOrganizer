import React, {useState, useRef, useEffect} from "react";
import TodoList from './TodoList'
//import uuidv4 from 'uuid/v4'
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos( prevTodos => [...prevTodos, ...storedTodos] );

    console.log(storedTodos)
  }, [])

  useEffect(() => { //RUNS WHENEVER 'todos' CHANGES
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]) 

  function toggleTodo(id){
    const newTodos = [... todos];//copy of todos
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(){
    const name = todoNameRef.current.value
    if (name==='') return
    setTodos(prevTodos=>{
      return [...prevTodos, {id:Math.random()*10000000, name:name, complete:false

      }]
    }

    )
    todoNameRef.current.value = null

  }
  function handleClearTodos(){
    setTodos(todos.filter(todo => !todo.complete))
  }

  return (
     <div>
      
      <TodoList todos={todos} toggleTodo ={toggleTodo}/>
      <input type="text" ref={todoNameRef}/>
      <button onClick={handleAddTodo}> Add Todo</button>
      <button onClick={handleClearTodos}> Clear Todos</button>
      <div> {todos.filter(todo => !todo.complete).length} left to do</div>
      

     </div>
    
  )
}

export default App;
