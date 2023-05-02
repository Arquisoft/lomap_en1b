import {buildThing, Thing} from "@inrupt/solid-client";
import {FOAF, RDF, RDFS} from "@inrupt/vocab-common-rdf";
import {Friend} from "../src/types";
import {friendToThing} from "../src/builders/friendBuilder";

// because of accessing data of the friend profile,
// only the FriendToThing function can be tested

test("friend to thing conversion", ()=>{
    let friend:Friend = {
        webId: "https://validWebID.com/ASKDJFHASKFAS3294ASF",
        nickName: "friendNickName",
        name: "name is not relevant here",
        profilePic: "pic is not relevant here",
        loMapOnly: true //not relevant here
    }
    let friendThing:Thing = buildThing()
        .addStringNoLocale(FOAF.nick, "friendNickName")
        .addUrl(RDFS.seeAlso, "https://validWebID.com/ASKDJFHASKFAS3294ASF")
        .addUrl(RDF.type, "http://xmlns.com/foaf/0.1/#term_Person")
        .build()
    expect(friendToThing(friend) == friendThing)
})