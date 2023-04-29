import NavBar from "../components/NavBar";
import { screen  } from "@testing-library/react"
import {BrowserRouter} from "react-router-dom";
import { render } from '../setupTests'


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
                <NavBar />
            </BrowserRouter>
        )
        const homeButton = screen.getByText("Home"); // home button
        expect(homeButton).toBeInTheDocument();

        const LoginButton = screen.getByText("Login"); // login button
        expect(LoginButton).toBeInTheDocument();

        const FriendsButton = screen.getByText("Friends"); // friends button
        expect(FriendsButton).toBeInTheDocument();

        const AboutButton = screen.getByText("About"); // about button
        expect(AboutButton).toBeInTheDocument();



        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(4);
    })
})
