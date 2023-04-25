import {buildThing, createThing, getFile, getStringNoLocale, getUrl, Thing} from "@inrupt/solid-client";
import { Review} from "../types";
import {RDF, RDFS, SCHEMA_INRUPT} from "@inrupt/vocab-common-rdf";

export async function thingToReview(reviewThing: Thing): Promise<Review> {
    console.log("thingToReview before image:Blob");
    const image:Blob = await getFile(getUrl(reviewThing, SCHEMA_INRUPT.image)!)
    console.log("thingToReview after image:Blob");
    return {
        comment: getStringNoLocale(reviewThing, SCHEMA_INRUPT.text)!,
        markerId: getUrl(reviewThing, RDFS.seeAlso)!,
        photo: blobToFile(image, "file"),
        score: 0
    }
}

export function reviewToThing(review:Review, authorWebId:string, imageUrl:string):Thing{
    return buildThing(createThing())
        .addStringNoLocale("schema.org/author", authorWebId)
        .addUrl(RDFS.seeAlso, review.markerId)
        .addStringNoLocale(SCHEMA_INRUPT.text, review.comment)
        .addUrl(SCHEMA_INRUPT.image, imageUrl)
        .addInteger("schema.org/ratingValue", review.score)
        .addUrl(RDF.type, "https://schema.org/Review")
        .build()
}

function blobToFile(theBlob: Blob, fileName:string): File {
    const b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
}