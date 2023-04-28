import {buildThing, createThing, Thing} from "@inrupt/solid-client";
import { Review} from "../types";
import {RDF, RDFS, SCHEMA_INRUPT} from "@inrupt/vocab-common-rdf";


export function reviewToThing(review:Review, authorWebId:string, imageUrl:string):Thing{
    return buildThing(createThing())
        .addStringNoLocale("https://schema.org/author", authorWebId)
        .addUrl(RDFS.seeAlso, review.markerId)
        .addStringNoLocale(SCHEMA_INRUPT.text, review.comment)
        .addUrl(SCHEMA_INRUPT.image, imageUrl)
        .addInteger("https://schema.org/ratingValue", review.score)
        .addUrl(RDF.type, "https://schema.org/Review")
        .build()
}