import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen } from '@testing-library/react'
import {render} from "../setupTests";
import LoginForm from "../components/Login";

export const handlers = [
    rest.get('http://localhost:8082/auth/login', (req, res, ctx) => {
        return res(
            // Respond with a redirect (3xx) status code.
            ctx.status(301),
            // Provide the redirect target in the "Location" header.
            ctx.set('Location', '/login/confirm')
        )
    })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe("Login tests", () =>{
    test('Displays the login form', async () => {
        render(<LoginForm />)
    })

    test('Sends the login request', async () => {
        render(<LoginForm />)

    })

})
