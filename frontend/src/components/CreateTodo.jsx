import { useState } from 'react';
import './styles.css';  

export function CreateTodo({ fetchTodos }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div className="cont">
            <h2 id='top-h2'>"Complete Your Goals, One Todo at a Time"</h2>
            <input 
                id="title" 
                type="text" 
                placeholder="title" 
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <input 
                id="description" 
                type="text" 
                placeholder="description" 
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <button 
                id='addTodo' 
                onClick={() => {
                    fetch("http://localhost:3000/todo", {
                        method: "POST",
                        body: JSON.stringify({ title, description }),
                        headers: {
                            "Content-type": "application/json"
                        }
                    })
                    .then(async (res) => {
                        await res.json();
                        alert("Todo Added");
                        fetchTodos(); // Fetch updated todos in the Todos component
                    })
                }}
            >
                Add a Todo
            </button>
        </div>
    );
}
