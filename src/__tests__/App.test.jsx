import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the API module
jest.mock('../services/api', () => ({
  fetchTasks: jest.fn().mockResolvedValue([
    { id: 1, title: 'Test Task 1', completed: false, createdAt: '2025-03-01' },
    { id: 2, title: 'Test Task 2', completed: true, createdAt: '2025-03-02' },
  ]),
}));

describe('App Component', () => {
  test('renders the app header', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText('Task Manager')).toBeInTheDocument();
  });

  test('renders the task form', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(
      screen.getByPlaceholderText('Add a new task...')
    ).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  test('renders filter buttons', async () => {
    await act(async () => {
      render(<App />);
    });
    const filterButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.classList.contains('filter-btn'));
    expect(filterButtons.length).toBe(3);
  });

  test('adds a new task', async () => {
    await act(async () => {
      render(<App />);
    });
    const input = screen.getByPlaceholderText('Add a new task...');
    const addButton = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'New Test Task' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Test Task')).toBeInTheDocument();
  });

  test('does not add empty task', async () => {
    await act(async () => {
      render(<App />);
    });
    const addButton = screen.getByText('Add Task');
    fireEvent.click(addButton);
    // No error should occur
    const filterButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.classList.contains('filter-btn'));
    expect(filterButtons.length).toBe(3);
  });

  test('renders footer', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText(/DevOps Task Manager/)).toBeInTheDocument();
    expect(screen.getByText(/Rhythm Jain/)).toBeInTheDocument();
  });
});
