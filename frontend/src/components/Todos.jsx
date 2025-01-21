
import { useState, useEffect } from 'react';
import './styles.css';  

export function Todos() {
    const [todos, setTodos] = useState([]);

    // Fetch todos when the component mounts
    useEffect(() => {
        fetch("http://localhost:3000/todos")
            .then(res => res.json())
            .then(data => setTodos(data.todos));
    }, []);

    return (
        <div className='divv'>
            <hr></hr>
            {todos.map(todo => (
                <div key={todo._id}>
                    <h1 className='todo-title'>{todo.title}</h1>
                    <h2 className='todo-description'>{todo.description}</h2>

                    {/* Mark as Read or Completed button */}
                    <button
                        className="mark-read-button"  // Apply the CSS class
                        onClick={() => {
                            fetch("http://localhost:3000/completed", {
                                method: "PUT",
                                body: JSON.stringify({ id: todo._id }),
                                headers: { "Content-Type": "application/json" }
                            })
                            .then(res => res.json())
                            .then(() => {
                                // Optionally refresh todos after completing or updating
                                fetch("http://localhost:3000/todos")
                                    .then(res => res.json())
                                    .then(data => setTodos(data.todos));
                            });
                        }}
                    >
                        {todo.completed ? "Completed" : "Mark as Completed"}
                    </button>

                    {/* Delete button */}
                    <button
                        className="delete-button"  // Apply the CSS class
                        onClick={() => {
                            // Delete the todo and remove it from the list in state
                            fetch(`http://localhost:3000/todo/${todo._id}`, {
                                method: "DELETE"
                            })
                            .then(res => res.json())
                            .then(() => {
                                // Remove the deleted todo from the state
                                setTodos(prevTodos => prevTodos.filter(t => t._id !== todo._id));
                            });
                        }}
                    >
                        Delete
                    </button>
                    <hr></hr>
                </div>
            ))}
        </div>
    );
}
