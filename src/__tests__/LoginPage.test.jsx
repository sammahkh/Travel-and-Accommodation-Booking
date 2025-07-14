import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginPage from '../pages/LoginPage';
import * as authService from '../services/authService';
import { vi } from 'vitest';

vi.mock('../services/authService');

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form inputs and submit button', () => {
    renderWithRouter(<LoginPage />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows success alert and navigates on successful login', async () => {
    authService.login.mockResolvedValueOnce({
      data: {
        authentication: 'mockToken',
        userType: 'Admin',
      },
    });

    renderWithRouter(<LoginPage />);

    await userEvent.type(screen.getByLabelText(/username/i), 'admin');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    const alert = await screen.findByRole('alert');
    expect(
      within(alert).getByText(/logged in successfully!/i)
    ).toBeInTheDocument();
  });

  it('shows error alert on failed login', async () => {
    authService.login.mockRejectedValueOnce(new Error('Invalid credentials'));

    renderWithRouter(<LoginPage />);
    await userEvent.type(screen.getByLabelText(/username/i), 'invalid');
    await userEvent.type(screen.getByLabelText(/password/i), 'wrong');
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    const alert = await screen.findByRole('alert');
    expect(
      within(alert).getByText(/invalid username or password/i)
    ).toBeInTheDocument();
  });
});
