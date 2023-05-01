import About from "../components/About";
import { screen  } from "@testing-library/react"
import {BrowserRouter} from "react-router-dom";
import { render } from '../setupTests'
import '@testing-library/jest-dom'


/**
 * verifies that the "AboutPage" component renders correctly 
 */
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate
}));

describe("About", () => {
    test("Test the corrent render of the component", () => {
        render(
            <BrowserRouter>
                <About />
            </BrowserRouter>
        )

        const titleText = screen.getByText("LoMap project"); 
        expect(titleText).toBeInTheDocument();

        expect(screen.getByText('About LoMap')).toBeInTheDocument();
        expect(screen.getByText('LoMap intends to be an easy-to-use tool for people to create, customize, and share personal maps filling them with the places they live.')).toBeInTheDocument();
        expect(screen.getByText(/UO276188/i)).toBeInTheDocument();
        expect(screen.getByText(/UO276670/i)).toBeInTheDocument();
        expect(screen.getByText(/UO283720/i)).toBeInTheDocument();
        expect(screen.getByText(/UO271407/i)).toBeInTheDocument();
        expect(screen.getByText(/UO277412/i)).toBeInTheDocument();
        expect(screen.getByText(/UO278249/i)).toBeInTheDocument();

        const subtitleText = screen.getByText("Team members");
        expect(subtitleText).toBeInTheDocument();
    })
})
