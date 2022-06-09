import axios from 'axios'
import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'

// Bulletin
import Bulletin from './bulletin'

// Axios
jest.mock("axios")

// React
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Bulletin', () => {
    // Happy Walk
    it('renders without crashing', async () => {
        axios.get.mockResolvedValue({
            data: {
                payload: [
                    {
                        postId: 1,
                        title: "Title1",
                        author: "John",
                        tag: "First Article",
                        date: "2022-01-01",
                        content: "Content1"
                    }
                ]
            },
            status: 200
        })

        // Render the component
        await act(async () => render(<Bulletin />));

        // Check each column in row
        expect(screen.getByText('Title1')).toBeInTheDocument()
        expect(screen.getByText('John')).toBeInTheDocument()
        expect(screen.getByText('First Article')).toBeInTheDocument()
        expect(screen.getByText('2022-01-01')).toBeInTheDocument()
    })
})
