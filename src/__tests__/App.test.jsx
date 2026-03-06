import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mock the API service
jest.mock('../services/api', () => ({
  fetchTasks: jest.fn(() => Promise.resolve([])),
  createTask: jest.fn((task) => Promise.resolve({ ...task, id: Date.now() })),
  deleteTask: jest.fn(() => Promise.resolve()),
  updateTask: jest.fn((id, updates) => Promise.resolve({ id, ...updates })),
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the application header', async () => {
    render(<App />);
    expect(screen.getByText(/Task Manager/i)).toBeInTheDocument();
  });

  test('renders task form', async () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/task title/i)).toBeInTheDocument();
  });

  test('displays empty state when no tasks', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
    });
  });
});
