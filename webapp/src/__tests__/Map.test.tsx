import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen } from '@testing-library/react'
import {render} from "../setupTests";
import LoginForm from "../components/Login";
import MapElement from "../components/Map";

export const handlers = [
    rest.get('http://localhost:8082/location', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    id: 'Test',
                    name: 'Test1',
                    locationType: 'restaurant',
                    latitude: 43.365143614762374,
                    longitude: -5.851593017578125,
                    isShared: false,
                    isOwnLocation: false
                },
                {
                    id: 'Test2',
                    name: 'Test2',
                    locationType: 'restaurant',
                    latitude: 43.365143614762374,
                    longitude: -5.851593017578125,
                    isShared: false,
                    isOwnLocation: false
                }
            ])
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

describe("Map tests", () =>{
    test('Renders the response from restAPI', async () => {
        const { container } = render(<MapElement />)
        const markers = container.querySelectorAll(".leaflet-marker-icon")
        expect(markers.length).toBe(2);
    })

})
