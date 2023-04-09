import {buildThing, createThing, getStringNoLocale, Thing} from "@inrupt/solid-client";
import { Review} from "../types";
import {RDF, SCHEMA_INRUPT} from "@inrupt/vocab-common-rdf";

export function thingToReview(reviewThing:Thing) : Review {
    return {
        id: reviewThing.url,
        author: getStringNoLocale(reviewThing, "author")!,
        body: getStringNoLocale(reviewThing, SCHEMA_INRUPT.text)!,
        media: getStringNoLocale(reviewThing, SCHEMA_INRUPT.image)!
    }
}

export function reviewToThing(review:Review):Thing{
    return buildThing(createThing({name: review.id}))
        .addStringNoLocale("author", review.author)
        .addStringNoLocale(SCHEMA_INRUPT.text, review.body)
        .addStringNoLocale(SCHEMA_INRUPT.image, review.media)
        .addUrl(RDF.type, "https://schema.org/Review")
        .build()
}