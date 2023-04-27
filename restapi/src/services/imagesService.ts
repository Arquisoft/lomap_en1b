import {
    getPodUrlAll,
    saveSolidDatasetAt, setThing,
    Thing
} from "@inrupt/solid-client";
import {Session} from "@inrupt/solid-client-authn-node";
import {imageToThing} from "../builders/imageBuilder";
import {getOrCreateDataset} from "./util/podAccessUtil";

export default {
    saveImage: async function (encodedImage:string, session:Session){
        let imagesURL = await getImagesURL(session.info.webId);
        if(imagesURL == undefined) return "error"

        // Get or create images dataset
        let imagesDataset = await getOrCreateDataset(imagesURL, session)
        if(imagesDataset == undefined) return "error"
        imagesDataset = imagesDataset!

        let imageThing:Thing =  imageToThing(encodedImage)

        imagesDataset = setThing(imagesDataset, imageThing)

        await saveSolidDatasetAt(
            imagesURL,
            imagesDataset,
            {fetch:session.fetch}
        )

        return imageThing.url;
    }
}

async function getImagesURL(webId: string | undefined){
    if(webId == undefined) return undefined
    let webID = decodeURIComponent(webId)
    const podURL = await getPodUrlAll(webID);
    return  podURL + "private/lomap/images";
}