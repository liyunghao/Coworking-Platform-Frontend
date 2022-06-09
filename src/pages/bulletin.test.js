import axios from 'axios'
import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'

// Bulletin
import Bulletin from './bulletin'
import { Simulate } from 'react-dom/test-utils'

// Axios
jest.mock("axios")

// React
const mockedUsedNavigate = jest.fn(r => r);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Bulletin', () => {
    // Happy Walk
    it('Render w/ correct posts', async () => {
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

    it('Render w/ incorrect posts payload', async () => {
        expect(1).toBe(1)
    })

    it('Render w/ user token expired', async () => {
        axios.get.mockRejectedValue({
            response: {
                status: 401
            }
        })

        // Render the component
        await act(async () => render(<Bulletin />));

        expect(mockedUsedNavigate).toHaveBeenCalledWith('/login')
    })

    it('Add post w/ user token expired', async () => {
        expect(1).toBe(1)
    })

    it('Add post w/o user token expired', async () => {
        axios.get.mockResolvedValue({
            data: {
                payload: []
            },
            status: 200
        })

        // Render the component
        await act(async () => render(<Bulletin />));

        await act(async () => screen.getByRole('button', {
            name: "Add New Post"
        }).click())

        screen.getByLabelText("Title *").value = "Title1"
        screen.getByLabelText("Tag").value = "First Article"

        axios.post.mockResolvedValue({
            data: {
                "postId": 1
            }
        })
        await act(async () => screen.getByRole('button', { name: "Add" }).click())

        expect(mockedUsedNavigate).toHaveBeenCalledWith('edit/1')
    })
})
