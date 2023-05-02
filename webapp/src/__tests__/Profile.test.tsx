import ProfileView from "../components/ProfileView";
import { screen  } from "@testing-library/react"
import {BrowserRouter} from "react-router-dom";
import { render } from '../setupTests';
import '@testing-library/jest-dom';



/**
 * verifies that the "NavBar" component renders correctly 
 */
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate
}));

describe("Profile tests", () => {
    test("Test the corrent render of the component", () => {
        const {container} = render(
            <BrowserRouter>
                <ProfileView />
            </BrowserRouter>
        )

        /* taking into account that the user is logged-in, there must be:
         *      - two buttons (friends and map)
         *      - one avatar
         *      - two text elements 
         */

        const friendsButton = screen.getByText("Friends"); // friends button
        expect(friendsButton).toBeInTheDocument();

        const mapButton = screen.getByText("Map"); // map button
        expect(mapButton).toBeInTheDocument();


        const avatar = screen.getAllByRole("img"); // there must be an avatar element
        expect(avatar.length).toBe(1);

        const buttons = screen.getAllByRole("button"); // there must be two buttons
        expect(buttons.length).toBe(2);

        const headingElements = container.getElementsByClassName('chakra-heading') // there must be two text elements
        expect(headingElements.length).toBe(1);

        const pElements = container.getElementsByClassName('chakra-text') // there must be two text elements
        expect(pElements.length).toBe(1);
    })
})
