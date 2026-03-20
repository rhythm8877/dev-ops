import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the API module
jest.mock('../services/api', () => ({
  fetchTasks: jest.fn(),
  createTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
}));

const api = require('../services/api');

describe('Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    api.fetchTasks.mockResolvedValue([]);
  });

  test('adding a task updates the task list', async () => {
    await act(async () => {
      render(<App />);
    });

    const input = screen.getByPlaceholderText('Add a new task...');
    const addButton = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'Integration Test Task' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Integration Test Task')).toBeInTheDocument();
  });

  test('toggling task completion status', async () => {
    api.fetchTasks.mockResolvedValue([
      { id: 1, title: 'Existing Task', completed: false, createdAt: '2026-03-01' },
    ]);

    await act(async () => {
      render(<App />);
    });

    await waitFor(() => {
      expect(screen.getByText('Existing Task')).toBeInTheDocument();
    });

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const taskItem = checkbox.closest('.task-item');
    expect(taskItem).toHaveClass('completed');
  });

  test('deleting a task removes it from the list', async () => {
    api.fetchTasks.mockResolvedValue([
      { id: 1, title: 'Task to Delete', completed: false, createdAt: '2026-03-01' },
    ]);

    await act(async () => {
      render(<App />);
    });

    await waitFor(() => {
      expect(screen.getByText('Task to Delete')).toBeInTheDocument();
    });

    const deleteBtn = screen.getByLabelText('Delete Task to Delete');
    fireEvent.click(deleteBtn);

    expect(screen.queryByText('Task to Delete')).not.toBeInTheDocument();
  });

  test('header and footer render together correctly', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText('Task Manager')).toBeInTheDocument();
    expect(screen.getByText(/DevOps Task Manager/i)).toBeInTheDocument();
  });

  test('filter buttons work correctly', async () => {
    api.fetchTasks.mockResolvedValue([
      { id: 1, title: 'Active Task', completed: false, createdAt: '2026-03-01' },
      { id: 2, title: 'Done Task', completed: true, createdAt: '2026-03-02' },
    ]);

    await act(async () => {
      render(<App />);
    });

    await waitFor(() => {
      expect(screen.getByText('Active Task')).toBeInTheDocument();
      expect(screen.getByText('Done Task')).toBeInTheDocument();
    });

    // Filter to active only
    const activeFilter = screen.getAllByRole('button').find(btn =>
      btn.textContent.includes('Active')
    );
    fireEvent.click(activeFilter);

    expect(screen.getByText('Active Task')).toBeInTheDocument();
    expect(screen.queryByText('Done Task')).not.toBeInTheDocument();

    // Filter to all
    const allFilter = screen.getAllByRole('button').find(btn =>
      btn.textContent.includes('All')
    );
    fireEvent.click(allFilter);

    expect(screen.getByText('Active Task')).toBeInTheDocument();
    expect(screen.getByText('Done Task')).toBeInTheDocument();
  });
});
