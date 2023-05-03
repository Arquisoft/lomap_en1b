//Location thing validator
import {Review} from "../src/types";
import {validateReview} from "../src/validators/reviewValidator";

test("valid review - only score", () => {
    let review:Review = {
        markerId: "markerID-1234654fgh",
        comment:undefined,
        score: 4,
        encodedPhoto: undefined,
    }
    expect(validateReview(review)).toBeTruthy();
});

test("valid review - only image", () => {
    let review:Review = {
        markerId: "markerID-1234654fgh",
        comment:undefined,
        score: undefined,
        encodedPhoto: "encodedPhoto-5293084750924theiruh"
    }
    expect(validateReview(review)).toBeTruthy();
});

test("valid review - only comment", () => {
    let review:Review = {
        markerId: "markerID-1234654fgh",
        comment:"comment",
        score: undefined,
        encodedPhoto: undefined
    }
    expect(validateReview(review)).toBeTruthy();
});

test("valid review - two elements", () => {
    let review:Review = {
        markerId: "markerID-1234654fgh",
        comment:"comment",
        score: 3,
        encodedPhoto: undefined
    }
    expect(validateReview(review)).toBeTruthy();
});

test("valid review - all elements", () => {
    let review:Review = {
        markerId: "markerID-1234654fgh",
        comment:"comment",
        score: 3,
        encodedPhoto: "encodedPhoto-2093485iughsidg"
    }
    expect(validateReview(review)).toBeTruthy();
});

test("invalid review - no elements", () => {
    let review:Review = {
        markerId: "markerID-1234654fgh",
        comment:undefined,
        score: undefined,
        encodedPhoto: undefined
    }
    expect(validateReview(review)).toBeFalsy();
});

test("invalid review - no marker id", () => {
    let review:Review = {
        markerId: "    ",
        comment:"comment",
        score: 3,
        encodedPhoto: "encodedPhoto-2093485iughsidg"
    }
    expect(validateReview(review)).toBeFalsy();
});