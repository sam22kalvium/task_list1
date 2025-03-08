import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css';

const API_BASE_URL = 'http://localhost:3000';

const TaskForm = ({ onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [status, setStatus] = useState('To Do');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title || !dueDate) {
            setError('Title and Due Date are required');
            return;
        }

        const newTask = { title, dueDate, priority, status };

        try {
            await axios.post(`${API_BASE_URL}/tasks`, newTask);
            setTitle('');
            setDueDate('');
            setPriority('Medium');
            setStatus('To Do');
            onTaskCreated(); // Refresh task list
        } catch (err) {
            console.error('Error adding task:', err);
            setError('Failed to add task.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h2>Add New Task</h2>
            {error && <p className="error">{error}</p>}
            <input 
                type="text" 
                placeholder="Task Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
            </select>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
