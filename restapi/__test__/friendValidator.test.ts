import {Friend} from "../src/types";
import {validateFriend, validateFriendThing} from "../src/validators/friendValidator";
import {buildThing, Thing} from "@inrupt/solid-client";
import {FOAF, RDF, RDFS} from "@inrupt/vocab-common-rdf";

//validate friend type
test("valid friend", () => {
    let friend: Friend = {
        webId: "https://validWebID.com/ASKDJFHASKFAS3294ASF",
        nickName: "friendNickName",
        name: "name is not validated here",
        profilePic: "pic is not validated here",
        loMapOnly: false
    }
    expect(validateFriend(friend)).toBeTruthy()
});

test("invalid friend - empty nick", ()=>{
    let friend: Friend = {
        webId: "https://validWebID.com/ASKDJFHASKFAS3294ASF",
        nickName: "               ",
        name: "name is not validated here",
        profilePic: "pic is not validated here",
        loMapOnly: false
    }
    expect(validateFriend(friend)).toBeFalsy()
});

test("invalid friend - empty webID", ()=>{
    let friend: Friend = {
        webId: "            ",
        nickName: "friendNickName",
        name: "name is not validated here",
        profilePic: "pic is not validated here",
        loMapOnly: false
    }
    expect(validateFriend(friend)).toBeFalsy()
});

//validate friend thing
test("valid friend thing", ()=>{
   let friendThing:Thing = buildThing()
       .addStringNoLocale(FOAF.nick, "nickName")
       .addUrl(RDFS.seeAlso, "https://validWebID.com/ASKDJFHASKFAS3294ASF")
       .addUrl(RDF.type, "http://xmlns.com/foaf/0.1/#term_Person")
       .build()
    expect(validateFriendThing(friendThing)).toBeTruthy()
});

test("invalid friend thing empty nickname", ()=>{
    let friendThing:Thing = buildThing()
        .addStringNoLocale(FOAF.nick, "       ")
        .addUrl(RDFS.seeAlso, "https://validWebID.com/ASKDJFHASKFAS3294ASF")
        .addUrl(RDF.type, "http://xmlns.com/foaf/0.1/#term_Person")
        .build()
    expect(validateFriendThing(friendThing)).toBeFalsy()
});

test("invalid friend thing - missing webID", ()=>{
    let friendThing:Thing = buildThing()
        .addStringNoLocale(FOAF.nick, "nickName")
        .addUrl(RDF.type, "http://xmlns.com/foaf/0.1/#term_Person")
        .build()
    expect(validateFriendThing(friendThing)).toBeFalsy()
});

test("invalid friend thing - missing nickName", ()=>{
    let friendThing:Thing = buildThing()
        .addUrl(RDFS.seeAlso, "https://validWebID.com/ASKDJFHASKFAS3294ASF")
        .addUrl(RDF.type, "http://xmlns.com/foaf/0.1/#term_Person")
        .build()
    expect(validateFriendThing(friendThing)).toBeFalsy()
});