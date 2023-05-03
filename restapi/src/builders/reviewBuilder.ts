import {buildThing, createThing, Thing} from "@inrupt/solid-client";
import { Review} from "../types";
import {RDF, RDFS, SCHEMA_INRUPT} from "@inrupt/vocab-common-rdf";


export function reviewToThing(review:Review, authorWebId:string, imageUrl:string):Thing{
    return buildThing(createThing())
        .addStringNoLocale("https://schema.org/author", authorWebId)
        //TODO: We need to check if this is the only url possible or if we need to check for the provider url
        .addUrl(RDFS.seeAlso, "https://inrupt.com/.well-known/sdk-local-node/" + review.markerId)
        .addStringNoLocale(SCHEMA_INRUPT.text, review.comment? review.comment : "")
        .addUrl(SCHEMA_INRUPT.image, imageUrl)
        .addInteger("https://schema.org/ratingValue", review.score? review.score : 0)
        .addUrl(RDF.type, "https://schema.org/Review")
        .build()
}