import NavBar from "../components/NavBar";
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

describe("NavBar tests", () => {
    test("Test the corrent render of the component", () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        )
        //only tanking into account when the user is not registered

        const homeButton = screen.getByText("Home"); // home button
        expect(homeButton).toBeInTheDocument();

        const LoginButton = screen.getByText("Login"); // login button
        expect(LoginButton).toBeInTheDocument();

        const AboutButton = screen.getByText("About"); // about button
        expect(AboutButton).toBeInTheDocument();



        const buttons = screen.getAllByRole("link");
        expect(buttons.length).toBe(3);
    })
})
