import About from "../components/About";
import { screen  } from "@testing-library/react"
import {BrowserRouter} from "react-router-dom";
import { render } from '../setupTests'


/**
 * verifies that the "AboutPage" component renders correctly 
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
                <About />
            </BrowserRouter>
        )

        const titleText = screen.getByText("LoMap project"); 
        expect(titleText).toBeInTheDocument();

        const subtitleText = screen.getByText("Team members");
        expect(subtitleText).toBeInTheDocument();
    })
})
