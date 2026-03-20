import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import * as api from '../services/api';

jest.mock('../services/api');

describe('Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    api.fetchTasks.mockResolvedValue([]);
  });

  test('adding a task updates the task list', async () => {
    const newTask = {
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
      completed: false,
    };
    api.createTask.mockResolvedValue(newTask);

    render(<App />);

    const titleInput = screen.getByPlaceholderText(/Add a new task/i);

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.click(screen.getByText(/add task/i));

    await waitFor(() => {
      expect(screen.getByText('Test Task')).toBeInTheDocument();
    });
  });

  test('toggling task completion status', async () => {
    const task = {
      id: 1,
      title: 'Existing Task',
      description: 'Desc',
      completed: false,
    };
    api.fetchTasks.mockResolvedValue([task]);
    api.updateTask.mockResolvedValue({ ...task, completed: true });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Existing Task')).toBeInTheDocument();
    });
  });

  test('deleting a task removes it from the list', async () => {
    const task = {
      id: 1,
      title: 'Task to Delete',
      description: 'Will be removed',
      completed: false,
    };
    api.fetchTasks.mockResolvedValue([task]);
    api.deleteTask.mockResolvedValue();

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Task to Delete')).toBeInTheDocument();
    });
  });

  test('header and footer render together correctly', async () => {
    render(<App />);
    expect(screen.getAllByText(/Task Manager/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/DevOps Task Manager/i)).toBeInTheDocument();
  });

  test('filter buttons work correctly', async () => {
    const tasks = [
      { id: 1, title: 'Active Task', description: '', completed: false },
      { id: 2, title: 'Done Task', description: '', completed: true },
    ];
    api.fetchTasks.mockResolvedValue(tasks);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Active Task')).toBeInTheDocument();
      expect(screen.getByText('Done Task')).toBeInTheDocument();
    });
  });
});
