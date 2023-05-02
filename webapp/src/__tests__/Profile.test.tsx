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

describe("NavBar", () => {
    test("Test the corrent render of the component", () => {
        render(
            <BrowserRouter>
                <ProfileView />
            </BrowserRouter>
        )
        // taking into account that the user is logged in(?)
        /*
         * - two buttons (friends and map)
         * - one avatar
         * - two text elements 
         */


        const friendsButton = screen.getByText("Friends"); // friends button
        expect(friendsButton).toBeInTheDocument();



        const avatar = screen.getAllByRole("Avatar"); // checking if the avatar is shown on the screen
        expect(avatar.length).toBe(1);
    })
})
