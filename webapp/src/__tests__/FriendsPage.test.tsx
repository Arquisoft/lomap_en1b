import React from "react";
import {rest} from "msw";
import {setupServer} from "msw/node";
import {render} from "../setupTests";
import FriendsView from "../components/FriendsPage/FriendsView";
import MapElement from "../components/Map";
import {fireEvent, waitFor} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom';


const postResolver = jest.fn()
const handlers = [
    rest.get('http://localhost:8082/friendship', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    nickName: 'TestNick',
                    name: 'TestFriend',
                    webId: 'https://id.inrupt.com/mariopdev',
                    profilePic: "",
                    loMapOnly: false
                },
                {
                    nickName: 'TestNick2',
                    name: 'TestFriend2',
                    webId: 'https://id.inrupt.com/mariopdev2',
                    profilePic: "",
                    loMapOnly: false
                },
            ]),
        )
    }),
    rest.post('*/friendship', (req, res, ctx) => {
        console.log("INTERCEPTADA")
        return res(postResolver());
    })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe("Friends tests", () =>{
        test('Renders the response from restAPI', async () => {
            const { container } = render(<FriendsView />)
            await waitFor(() => {
                const markers = container.querySelectorAll('.table-friend');
                expect(markers.length).toBe(2);
            });
        })

    test('Add a new friend', async () => {
        const { getByRole , container } = render(<FriendsView />)
        await waitFor(() => container.querySelectorAll('.table-friend'))

        const webIDInput = container.querySelector('#friendWbId')
        const nickInput = container.querySelector('#nickname')
        expect(webIDInput).toBeInTheDocument()
        expect(nickInput).toBeInTheDocument()

        fireEvent.change(webIDInput!, { target: { value: 'newfriend.webid.com' } })
        fireEvent.change(nickInput!, { target: { value: 'New Friend' } })

        const addButton = getByRole('button', { name: 'Add' })
        expect(addButton).toBeInTheDocument()

        fireEvent.click(addButton)

        expect(postResolver).toHaveBeenCalledTimes(1)
    })
})






















