import React from 'react'
import {render} from "../setupTests";
import MapElement, {LocationMarkerWithStore} from "../components/Map";
import {rest} from "msw";
import {setupServer} from "msw/node";
import {fireEvent, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom';
import {MapContainer} from "react-leaflet";

const postResolver = jest.fn()
const handlers = [
    rest.get('http://api.lomap.mariopdev.com/location', (req, res, ctx) => {
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
    rest.post('http://api.lomap.mariopdev.com/location', (req, res, ctx) => {
        return res(postResolver);
    })
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

    test('Unchecking a filter, the markers of that category disappear', async () => {
        const { getByLabelText, container } = render(<MapElement />);

        const filterButton = screen.getByText("Filter Locations");
        fireEvent.click(filterButton);

        const modalContent = await screen.findByRole("dialog");
        expect(modalContent).toHaveClass("chakra-modal__content");

        const checkBox = getByLabelText("Restaurants");
        fireEvent.click(checkBox);
        // Check that the checkbox is now unchecked
        expect(checkBox).not.toBeChecked();

        await waitFor(() => {
            const markers = container.querySelectorAll('.leaflet-marker-icon');
            expect(markers.length).toBe(1);
        });
    })

    test('Clicking on the map, a dialog appears', async () => {
        const { container } = render(<MapElement  />);

        const map = await screen.findByTestId('map-element');

        // Calculate the coordinates of the center of the map
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Click on the center of the map
        fireEvent.click(map, { clientX: centerX, clientY: centerY });

        const modalContent = await screen.findByRole("dialog");
        expect(modalContent).toBeInTheDocument()

    })

    /*test('Add a new location', async () => {
        render(<MapContainer><LocationMarkerWithStore  /></MapContainer>);


        const input = await screen.findByTestId('form-add-location-input')
        expect(input).toBeInTheDocument()
        fireEvent.change(input, { target: { value: 'Test' } });


        const filterButton = screen.getByText("Place Marker");
        fireEvent.click(filterButton);

        expect(postResolver).toHaveBeenCalledTimes(1)
    })*/
})
