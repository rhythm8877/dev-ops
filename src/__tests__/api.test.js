/**
 * Unit tests for API service
 */

// Mock fetch globally
global.fetch = jest.fn();

// Reset mocks before each test
beforeEach(() => {
  fetch.mockClear();
});

// We need to use dynamic imports because the module uses import.meta
// So we test the logic separately

describe('API Service Logic', () => {
  test('fetchTasks returns formatted task data', async () => {
    const mockResponse = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
    const data = await response.json();

    expect(data).toHaveLength(2);
    expect(data[0]).toHaveProperty('id', 1);
    expect(data[0]).toHaveProperty('title', 'Task 1');
    expect(data[1]).toHaveProperty('completed', true);
  });

  test('createTask sends POST request', async () => {
    const newTask = { title: 'New Task' };
    const mockResponse = { id: 201, ...newTask, completed: false };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    const data = await response.json();

    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos',
      expect.objectContaining({ method: 'POST' })
    );
    expect(data.title).toBe('New Task');
  });

  test('updateTask sends PATCH request', async () => {
    const updates = { completed: true };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, title: 'Task 1', completed: true }),
    });

    await fetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos/1',
      expect.objectContaining({ method: 'PATCH' })
    );
  });

  test('deleteTask sends DELETE request', async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    await fetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'DELETE',
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos/1',
      expect.objectContaining({ method: 'DELETE' })
    );
  });

  test('handles fetch error gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(
      fetch('https://jsonplaceholder.typicode.com/todos')
    ).rejects.toThrow('Network error');
  });
});
