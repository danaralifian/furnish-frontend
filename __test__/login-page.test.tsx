import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginForm from '@/features/auth/components/login-form'
import { mockUseAuth, mockUseRouter, mockUseToast } from './utils/mocks/hooks';

describe('LoginForm', () => {
    const mockPush = jest.fn()
    const mockLogin = jest.fn()
    const mockToast = jest.fn()

    beforeEach(() => {
        mockUseRouter(mockPush)
        mockUseAuth(mockLogin)
        mockUseToast(mockToast)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('renders email and password fields', () => {
        render(<LoginForm />)
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    })

    it('shows validation errors on empty submit', async () => {
        render(<LoginForm />)
        fireEvent.click(screen.getByRole('button', { name: /login/i }))
        await waitFor(() => {
            expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
            expect(screen.getByText(/password is required/i)).toBeInTheDocument()
        })
    })

    it('calls login and shows success toast on successful login', async () => {
        mockLogin.mockResolvedValue(true)

        render(<LoginForm />)

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'test@example.com' },
        })
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password123' },
        })

        fireEvent.click(screen.getByRole('button', { name: /login/i }))

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123')
            expect(mockToast).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: 'Login successful',
                })
            )
            expect(mockPush).toHaveBeenCalledWith('/')
        })
    })

    it('shows error toast on failed login', async () => {
        mockLogin.mockResolvedValue(false)

        render(<LoginForm />)

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'wrong@example.com' },
        })
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'wrongpassword' },
        })

        fireEvent.click(screen.getByRole('button', { name: /login/i }))

        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: 'Login failed',
                    description: expect.stringMatching(/invalid email or password/i),
                })
            )
        })
    })

    it('shows error toast on thrown error', async () => {
        mockLogin.mockRejectedValue(new Error('Network error'))

        render(<LoginForm />)

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'test@example.com' },
        })
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password123' },
        })

        fireEvent.click(screen.getByRole('button', { name: /login/i }))

        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: 'Login failed',
                    description: expect.stringMatching(/an error occurred/i),
                })
            )
        })
    })
})
