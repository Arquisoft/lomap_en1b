import {createSolidDataset, getSolidDataset} from "@inrupt/solid-client";
import {Session} from "@inrupt/solid-client-authn-node";

export async function getOrCreateDataset (datasetURL:string, session:Session){
    let dataset;
    try{
        dataset=  await getSolidDataset(
            datasetURL,
            {fetch: session.fetch}
        );
    } catch (error:any) {
        if(typeof error.statusCode === "number" && error.statusCode === 404){
            dataset = createSolidDataset();
        } else {
            return undefined
        }
    }
    return dataset;
}