import TodoList from "./TodoList.jsx";
// Step 3: create AddTodoForm.jsx, then import and use it below.
import AddTodoForm from "./AddTodoForm.jsx";
import { useState } from "react";

const INITIAL_TODOS = [
  { id: 1, text: "Read the lab README", done: true },
  { id: 2, text: "Build the to-do list", done: false },
  { id: 3, text: "Add one of your own", done: false },
];

export default function App() {
  // Right now the list is STATIC. Your job is to make it live.
  //
  // Step 1: hold the todos in state instead of a constant:
  const [todos, setTodos] = useState(INITIAL_TODOS)
  const [filter, setFilter] = useState("all");
  const visible = todos.filter((t) =>
    filter === "active" ? !t.done : filter === "completed" ? t.done : true,
  );

  // Step 2: write these handlers. They must NOT mutate state - build a NEW
  // array each time (spread / map / filter) and pass it to setTodos:
  //   addTodo(text)   → append { id, text, done: false }  (give it a fresh id)
  //   toggleTodo(id)  → flip `done` on the matching todo
  //   deleteTodo(id)  → drop the matching todo
  // Then pass them as props to the components below.
  const addTodo = (text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text: text,
      done: false
    };
    setTodos([...todos, newTodo]);
  }

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    }
    );
    setTodos(updatedTodos);
  }

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  }


  return (
    <main className="app">
      <h1>My To-Dos</h1>
      {/* Step 3: <AddTodoForm onAdd={addTodo} /> */}
      <div className="filters">
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          disabled={filter === "active"}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          disabled={filter === "completed"}
        >
          Completed
        </button>
      </div>
   

      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={visible} onToggle={toggleTodo} onDelete={deleteTodo} />
      {/* Step 4: a derived count - "{done} of {total} done" computed from todos */}
      <p>{todos.filter(todo => todo.done).length} of {todos.length} done</p>
    </main>
  );
}
