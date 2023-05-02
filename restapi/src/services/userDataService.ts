import {Session} from "@inrupt/solid-client-authn-node";
import { urlToUserData } from "../builders/userBuilder";
//import {getOrCreateDataset} from "./util/podAccessUtil";
//import {PodProviderError} from "./util/customErrors";
//import {FOAF} from "@inrupt/vocab-common-rdf";

export default {

    getProfileInfo : async function (session:Session){
        let webId = session.info.webId
        if( webId == 'undefined' || null) throw new Error("Cannot access the session")

        return await urlToUserData(webId!)
    },

}