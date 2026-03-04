/**
 * API Service layer for task management
 * Handles all HTTP requests to the backend API
 */

const API_BASE_URL =
  import.meta?.env?.VITE_API_URL || 'https://jsonplaceholder.typicode.com';

/**
 * Fetches all tasks (todos) from the API
 * @returns {Promise<Array>} Array of task objects
 */
export async function fetchTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/todos?_limit=10`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      completed: item.completed,
      createdAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw error;
  }
}

/**
 * Creates a new task via the API
 * @param {Object} task - The task to create
 * @param {string} task.title - Task title
 * @returns {Promise<Object>} Created task object
 */
export async function createTask(task) {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: task.title,
        completed: false,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to create task:', error);
    throw error;
  }
}

/**
 * Updates an existing task via the API
 * @param {number} id - Task ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated task object
 */
export async function updateTask(id, updates) {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to update task:', error);
    throw error;
  }
}

/**
 * Deletes a task via the API
 * @param {number} id - Task ID to delete
 * @returns {Promise<void>}
 */
export async function deleteTask(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw error;
  }
}
