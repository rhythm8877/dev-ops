import React, { useState } from 'react';

/**
 * TaskForm component - form for adding new tasks
 * @param {Object} props
 * @param {Function} props.onAdd - Callback when a new task is submitted
 * @returns {JSX.Element}
 */
function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} id="task-form">
      <input
        type="text"
        className="task-input"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="New task title"
        id="task-input"
      />
      <button type="submit" className="add-btn" id="add-task-btn">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
