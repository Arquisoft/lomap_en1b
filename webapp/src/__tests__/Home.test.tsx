import HomePage from "../components/Home";
import { fireEvent , screen  } from "@testing-library/react"
import {BrowserRouter} from "react-router-dom";
import { render } from '../setupTests'
import '@testing-library/jest-dom'
import LoginForm from "../components/Login";
import About from "../components/About";


/**
 * verifies that the "HomePage" component renders correctly and that it contains an element with the text "LoMap📍" and two buttons
 */
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate
}));

describe("HomeScreen tests", () => {
    test("Test the corrent render of the component", () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        )
        const WebpageTitle = screen.getByText("LoMap📍") // takes the component that contains the text "LoMap📍"
        expect(WebpageTitle).toBeInTheDocument()

        const buttons = screen.getAllByRole('button') // takes the component that has the role "button"
        expect(buttons.length).toBe(2);

        expect(screen.getByRole('button', {name: 'Start'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'About...'})).toBeInTheDocument();
    })

    test("Test the corrent behaviour of Start button in Home Page", () => {
        render(
            <BrowserRouter>
                <HomePage />
                <LoginForm />
            </BrowserRouter>
            
        )
        const but = screen.getByRole('button', {name: 'Start'});
        fireEvent.click(but);

        const title = screen.getByText("Login with your SOLID POD!"); 
        expect(title).toBeInTheDocument();
    })

    test("Test the corrent behaviour of About button in Home page", () => {
        render(
            <BrowserRouter>
                <HomePage />
                <About />
            </BrowserRouter>
            
        )
        const but = screen.getByRole('button', {name: 'About...'});
        fireEvent.click(but);
        expect(screen.getByText('LoMap intends to be an easy-to-use tool for people to create, customize, and share personal maps filling them with the places they live.')).toBeInTheDocument();
    })
})
