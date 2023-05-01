import {logout} from "../app/services/Auth";
import {Button} from "@chakra-ui/react";


function Index(){

    return (<Button onClick={() => logout()}>Test logout</Button>)
}


export default Index;