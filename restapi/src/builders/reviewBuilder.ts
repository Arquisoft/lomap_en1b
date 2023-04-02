import {buildThing, createThing, getStringNoLocale, Thing} from "@inrupt/solid-client";
import { Review} from "../types";
import {RDF} from "@inrupt/vocab-common-rdf";

export function thingToReview(reviewThing:Thing) : Review {
    return {
        id: reviewThing.url,
        author: getStringNoLocale(reviewThing, "")!,
        body: getStringNoLocale(reviewThing, "")!,
        media: getStringNoLocale(reviewThing, "")!
    }
}

export function reviewToThing(review:Review):Thing{
    return buildThing(createThing({name: review.id}))
        .addStringNoLocale("", review.author)
        .addStringNoLocale("", review.body)
        .addStringNoLocale("", review.media)
        .addUrl(RDF.type, "https://schema.org/Review")
        .build()
}