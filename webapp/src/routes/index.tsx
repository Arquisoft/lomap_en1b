import {login} from "../app/services/Auth";
import {Button} from "@chakra-ui/react";


function Index(){

    return (<Button onClick={() => login("https://login.inrupt.com")}>Test login</Button>)
}


export default Index;