import HomePage from "../components/Home";
import { screen  } from "@testing-library/react"
import {BrowserRouter} from "react-router-dom";
import { render } from '../setupTests'
import '@testing-library/jest-dom'


/**
 * verifies that the "HomePage" component renders correctly and that it contains an element with the text "LoMap📍" and two buttons
 */
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate
}));

describe("HomeScreen", () => {
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
    })
})
