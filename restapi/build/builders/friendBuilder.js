"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendToThing = exports.thingToFriend = void 0;
const solid_client_1 = require("@inrupt/solid-client");
const vocab_common_rdf_1 = require("@inrupt/vocab-common-rdf");
function thingToFriend(friendThing) {
    return {
        podId: (0, solid_client_1.getStringNoLocale)(friendThing, vocab_common_rdf_1.FOAF.nick),
        username: (0, solid_client_1.getUrl)(friendThing, vocab_common_rdf_1.RDFS.seeAlso),
    };
}
exports.thingToFriend = thingToFriend;
function friendToThing(friend) {
    //Check how to work with knows
    //TODO
    return (0, solid_client_1.buildThing)((0, solid_client_1.createThing)({ name: friend.podId }))
        .addStringNoLocale(vocab_common_rdf_1.FOAF.nick, friend.username)
        .addUrl(vocab_common_rdf_1.RDFS.seeAlso, friend.podId)
        .addUrl(vocab_common_rdf_1.RDF.type, "http://xmlns.com/foaf/0.1/#term_Person")
        .build();
}
exports.friendToThing = friendToThing;
