import {buildThing, createThing, getUrl, Thing} from "@inrupt/solid-client";
import {RDF} from "@inrupt/vocab-common-rdf";

export function thingToImage(imageThing:Thing) : string {
    return getUrl(imageThing, "https://schema.org/contentUrl")!;
}

export function imageToThing(encodedPhoto:string):Thing{
    return buildThing(createThing())
        .addUrl("https://schema.org/contentUrl", encodedPhoto)
        .addStringNoLocale("https://schema.org/encodingFormat", "base64")
        .addUrl(RDF.type, "https://schema.org/ImageObject")
        .build()
}