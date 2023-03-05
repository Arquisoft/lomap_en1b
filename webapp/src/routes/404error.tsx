import styled from "@emotion/styled";
import {Button} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

function Error404() {
    const navigate = useNavigate()
    return(
        <ScreenContainer>
            <div>
                <h1>404 Not found</h1>
                <p>Got lost? No worries...</p>
                <Button colorScheme='teal' onClick={() => navigate("/")}>Go home</Button>
            </div>
        </ScreenContainer>
    );

}


export default Error404;


const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  
  & > div {
    width: 100vw;
    max-width: 400px;
    padding: 2rem;
    border-radius: 1em;
    border: 1px solid gray;
    
    & > h1 {
      font-size: xxx-large;
    }
  }
`