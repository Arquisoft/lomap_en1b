import React from 'react'
import {render} from "../setupTests";
import MapElement from "../components/Map";
import {rest} from "msw";
import {setupServer} from "msw/node";
import {fireEvent, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom';

const handlers = [
    rest.get('http://localhost:8082/friendship', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    id: '068b0c8a-fac2-4a46-b40c-07d74ccd46f7',
                    name: 'Test',
                    locationType: 'shop',
                    latitude: 43.36136284334129,
                    longitude: -5.851278233874803,
                    isShared: false,
                    isOwnLocation: false
                },
                {
                    id: 'Test',
                    name: 'Test2',
                    locationType: 'restaurant',
                    latitude: 43.365143614762374,
                    longitude: -5.851593017578125,
                    isShared: false,
                    isOwnLocation: false
                }
            ]),
        )
    }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe("Map tests", () =>{
    test('Renders the response from restAPI', async () => {
        const { container } = render(<MapElement />)
        await waitFor(() => {
            const markers = container.querySelectorAll('.leaflet-marker-icon');
            expect(markers.length).toBe(2);
        });
    })

    test('Pressing the filter button, a modal to filter should appear', async () => {
        render(<MapElement />);

        const filterButton = screen.getByText("Filter Locations");
        fireEvent.click(filterButton);

        const modalContent = await screen.findByRole("dialog");
        expect(modalContent).toHaveClass("chakra-modal__content");
    })
})
