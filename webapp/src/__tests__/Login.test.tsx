import Login from "../components/Login";
import { screen  } from "@testing-library/react"
import {BrowserRouter} from "react-router-dom";
import { render } from '../setupTests';
import '@testing-library/jest-dom';
import { NavLink } from 'react-router-dom';
import LoginForm from "../components/Login";
import { text } from "body-parser";


/**
 * verifies that the "Login" component renders correctly 
 */
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate
}));

describe("Login", () => {
    test("Test the corrent render of the component", () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        )
        

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
})
