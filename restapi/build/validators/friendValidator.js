"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFriend = exports.validateFriendThing = void 0;
const solid_client_1 = require("@inrupt/solid-client");
const vocab_common_rdf_1 = require("@inrupt/vocab-common-rdf");
function validateFriendThing(friendThing) {
    return (0, solid_client_1.getStringNoLocale)(friendThing, vocab_common_rdf_1.FOAF.nick) !== undefined
        && (0, solid_client_1.getStringNoLocale)(friendThing, vocab_common_rdf_1.FOAF.nick) !== null
        && (0, solid_client_1.getUrl)(friendThing, vocab_common_rdf_1.RDFS.seeAlso) !== undefined
        && (0, solid_client_1.getUrl)(friendThing, vocab_common_rdf_1.RDFS.seeAlso) !== null;
}
exports.validateFriendThing = validateFriendThing;
function validateFriend(friend) {
    return friend !== undefined
        && friend !== null
        && friend.username !== undefined
        && friend.username !== null
        && friend.podId !== undefined
        && friend.podId !== null;
}
exports.validateFriend = validateFriend;
