import React from 'react';

/**
 * TaskList component - renders the list of tasks with toggle and delete actions
 * @param {Object} props
 * @param {Array} props.tasks - Array of task objects
 * @param {Function} props.onToggle - Callback when task completion is toggled
 * @param {Function} props.onDelete - Callback when task is deleted
 * @returns {JSX.Element}
 */
function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list" id="task-list">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-item ${task.completed ? 'completed' : ''}`}
          data-testid={`task-${task.id}`}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="task-checkbox"
            aria-label={`Toggle ${task.title}`}
          />
          <span className="task-title">{task.title}</span>
          <button
            className="delete-btn"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
