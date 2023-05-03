import {Location} from "../src/types"
import {validateLocation, validateLocationThing} from "../src/validators/locationValidator";
import {LocationType} from "../src/locationType";
import {buildThing, Thing} from "@inrupt/solid-client";
import {RDF, SCHEMA_INRUPT} from "@inrupt/vocab-common-rdf";

//Location type validator
test("valid location - 0 coordinates", () => {
    let location: Location = {
        id:"test",
        name: "name",
        locationType:LocationType.bar,
        latitude:0,
        longitude:0,
        isShared: false,
        isOwnLocation: true,
        owner: "",
        ownerName:""
    }
    expect(validateLocation(location))
});

test("valid location - max positive coordinates", () => {
    let location: Location = {
        id:"test",
        name: "name",
        locationType:LocationType.restaurant,
        latitude:90,
        longitude:180,
        isShared: false,
        isOwnLocation: true,
        owner: "",
        ownerName:""
    }
    expect(validateLocation(location))
});

test("valid location - max negative coordinates", () => {
    let location: Location = {
        id:"test",
        name: "name",
        locationType:LocationType.shop,
        latitude:-90,
        longitude:-180,
        isShared: false,
        isOwnLocation: true,
        owner: "",
        ownerName:""
    }
    expect(validateLocation(location))
});

test("invalid location - max negative coordinates", () => {
    let location: Location = {
        id:"test",
        name: "name",
        locationType:LocationType.bar,
        latitude:-90.001,
        longitude:-180.001,
        isShared: false,
        isOwnLocation: true,
        owner: "",
        ownerName:""
    }
    expect(!validateLocation(location))
});

test("invalid location - max positive coordinates", () => {
    let location: Location = {
        id:"test",
        name: "name",
        locationType:LocationType.bar,
        latitude:-90.001,
        longitude:-180.001,
        isShared: false,
        isOwnLocation: true,
        owner: "",
        ownerName:""
    }
    expect(!validateLocation(location))
});

test("invalid location - empty name", ()=> {
    let location: Location = {
        id:"test",
        name: "        ",
        locationType:LocationType.bar,
        latitude:-90.001,
        longitude:-180.001,
        isShared: false,
        isOwnLocation: true,
        owner: "",
        ownerName:""
    }
    expect(!validateLocation(location))
})

//Location thing validator

test("valid location thing - 0 coordinates", () => {
    let locationThing:Thing = buildThing()
        .addStringNoLocale(SCHEMA_INRUPT.name, "name")
        .addStringNoLocale(SCHEMA_INRUPT.description, LocationType.bar)
        .addDecimal(SCHEMA_INRUPT.latitude, 0)
        .addDecimal(SCHEMA_INRUPT.longitude, 0)
        .addUrl(RDF.type, "https://schema.org/Place")
        .build();
    expect(validateLocationThing(locationThing)).toBeTruthy();
});

test("valid location thing - max positive coordinates", () => {
    let locationThing:Thing = buildThing()
        .addStringNoLocale(SCHEMA_INRUPT.name, "name")
        .addStringNoLocale(SCHEMA_INRUPT.description, LocationType.bar)
        .addDecimal(SCHEMA_INRUPT.latitude, 90)
        .addDecimal(SCHEMA_INRUPT.longitude, 180)
        .addUrl(RDF.type, "https://schema.org/Place")
        .build();
    expect(validateLocationThing(locationThing)).toBeTruthy();
});

test("valid location thing - max negative coordinates", () => {
    let locationThing:Thing = buildThing()
        .addStringNoLocale(SCHEMA_INRUPT.name, "name")
        .addStringNoLocale(SCHEMA_INRUPT.description, LocationType.bar)
        .addDecimal(SCHEMA_INRUPT.latitude, -90)
        .addDecimal(SCHEMA_INRUPT.longitude, -180)
        .addUrl(RDF.type, "https://schema.org/Place")
        .build();
    expect(validateLocationThing(locationThing)).toBeTruthy();
});

test("invalid location thing - max negative coordinates", () => {
    let locationThing:Thing = buildThing()
        .addStringNoLocale(SCHEMA_INRUPT.name, "name")
        .addStringNoLocale(SCHEMA_INRUPT.description, LocationType.bar)
        .addDecimal(SCHEMA_INRUPT.latitude, -90.01)
        .addDecimal(SCHEMA_INRUPT.longitude, -180.01)
        .addUrl(RDF.type, "https://schema.org/Place")
        .build();
    expect(validateLocationThing(locationThing)).toBeFalsy();
});

test("invalid location thing - max positive coordinates", () => {
    let locationThing:Thing = buildThing()
        .addStringNoLocale(SCHEMA_INRUPT.name, "name")
        .addStringNoLocale(SCHEMA_INRUPT.description, LocationType.bar)
        .addDecimal(SCHEMA_INRUPT.latitude, 90.001)
        .addDecimal(SCHEMA_INRUPT.longitude, 180.001)
        .addUrl(RDF.type, "https://schema.org/Place")
        .build();
    expect(validateLocationThing(locationThing)).toBeFalsy();
});

test("invalid location thing - empty name", ()=> {
    let locationThing:Thing = buildThing()
        .addStringNoLocale(SCHEMA_INRUPT.name, "      ")
        .addStringNoLocale(SCHEMA_INRUPT.description, LocationType.bar)
        .addDecimal(SCHEMA_INRUPT.latitude, 0)
        .addDecimal(SCHEMA_INRUPT.longitude, 0)
        .addUrl(RDF.type, "https://schema.org/Place")
        .build();
    expect(validateLocationThing(locationThing)).toBeFalsy();
})

test("invalid location thing - missing name", ()=> {
    let locationThing:Thing = buildThing()
        .addStringNoLocale(SCHEMA_INRUPT.description, LocationType.bar)
        .addDecimal(SCHEMA_INRUPT.latitude, 90)
        .addDecimal(SCHEMA_INRUPT.longitude, 180)
        .addUrl(RDF.type, "https://schema.org/Place")
        .build();
    expect(validateLocationThing(locationThing)).toBeFalsy();
})

test("invalid location thing - missing type", ()=> {
    let locationThing:Thing = buildThing()
        .addStringNoLocale(SCHEMA_INRUPT.name, "name")
        .addDecimal(SCHEMA_INRUPT.latitude, 90)
        .addDecimal(SCHEMA_INRUPT.longitude, 180)
        .addUrl(RDF.type, "https://schema.org/Place")
        .build();
    expect(validateLocationThing(locationThing)).toBeFalsy();
})

test("invalid location thing - missing type", ()=> {
    let locationThing:Thing = buildThing()
        .addStringNoLocale(SCHEMA_INRUPT.name, "name")
        .addDecimal(SCHEMA_INRUPT.latitude, 90)
        .addDecimal(SCHEMA_INRUPT.longitude, 180)
        .addUrl(RDF.type, "https://schema.org/Place")
        .build();
    expect(validateLocationThing(locationThing)).toBeFalsy();
})

test("invalid location thing - missing latitude", ()=> {
    let locationThing:Thing = buildThing()
        .addStringNoLocale(SCHEMA_INRUPT.name, "name")
        .addStringNoLocale(SCHEMA_INRUPT.description, LocationType.bar)
        .addDecimal(SCHEMA_INRUPT.longitude, 180)
        .addUrl(RDF.type, "https://schema.org/Place")
        .build();
    expect(validateLocationThing(locationThing)).toBeFalsy();
})

test("invalid location thing - missing longitude", ()=> {
    let locationThing:Thing = buildThing()
        .addStringNoLocale(SCHEMA_INRUPT.name, "name")
        .addStringNoLocale(SCHEMA_INRUPT.description, LocationType.bar)
        .addDecimal(SCHEMA_INRUPT.latitude, 90)
        .addUrl(RDF.type, "https://schema.org/Place")
        .build();
    expect(validateLocationThing(locationThing)).toBeFalsy();
})
