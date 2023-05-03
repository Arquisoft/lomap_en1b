import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node';
import { fireEvent, screen } from '@testing-library/react'
import {render} from "../setupTests";
import LoginForm from "../components/Login";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom';

export const handlers = [
    rest.get('http://api.lomap.mariopdev.com/auth/login', (req, res, ctx) => {
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

        const title = screen.getByText("Login with your SOLID POD!"); 
        expect(title).toBeInTheDocument();

        const formLabel = screen.getByText("Type your POD provider URL"); 
        expect(formLabel).toBeInTheDocument();

        const chooseprovider = screen.getByText("Or choose your provider:"); 
        expect(chooseprovider).toBeInTheDocument();


        expect(screen.getByRole('button', {name: 'Login'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Solid Community'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Solid Web'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Inrupt.net'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'pod.Inrupt.net'})).toBeInTheDocument();

        const inputs = screen.getAllByRole("textbox");
        expect(inputs.length).toBe(1);

        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(5); //4 for providers + 1 for login
    })



    test('Sends the login request', async () => {
        render(<LoginForm />)


    })

})
