import HomePage from "../components/Home";
import { screen  } from "@testing-library/react"
import {BrowserRouter} from "react-router-dom";
import { render } from '../setupTests'

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
        const WebpageTitle = screen.getByText("LoMap📍")
        expect(WebpageTitle).toBeInTheDocument()

        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toBe(2);
    })
})
