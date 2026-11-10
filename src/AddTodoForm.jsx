import React from "react";
export default function AddTodoForm({ onAdd }) {
    const [value, setValue] = React.useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const text = value.trim();
        if (text) {
            onAdd(text);
        }
        setValue("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add a todo"
                name="todo"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
}  