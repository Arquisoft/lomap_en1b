"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const solid_client_1 = require("@inrupt/solid-client");
const solid_client_authn_node_1 = require("@inrupt/solid-client-authn-node");
const friendBuilder_1 = require("../builders/friendBuilder");
const friendValidator_1 = require("../validators/friendValidator");
exports.default = {
    getFriends: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield (0, solid_client_authn_node_1.getSessionFromStorage)(req.session.solidSessionId);
            if (session == undefined)
                return res.send('error');
            let friendsURL = yield getFriendsURL(session.info.webId);
            if (friendsURL == undefined)
                return res.send("error");
            //Get friends from contacts
            let friendsDataset = yield (0, solid_client_1.getSolidDataset)(friendsURL, { fetch: session.fetch } // fetch from authenticated session
            );
            //Get friends from profile
            //TODO
            //Get friends from extended profile
            //TODO
            //const profiles = await getProfileAll(webId,{ fetch:session!.fetch });
            //const webIDProfileSolidDataset = profiles.webIdProfile;
            //const webIdThing = getThing(webIDProfileSolidDataset, webId);
            //const friends = getUrlAll(webIdThing as Thing, FOAF.knows);
            return res.send((0, solid_client_1.getThingAll)(friendsDataset)
                .filter(friendThing => (0, friendValidator_1.validateFriendThing)(friendThing))
                .map(friendThing => (0, friendBuilder_1.thingToFriend)(friendThing)));
        });
    },
    addFriend: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield (0, solid_client_authn_node_1.getSessionFromStorage)(req.session.solidSessionId);
            if (session == undefined)
                return res.send('error');
            let friend = req.body.location;
            if (!(0, friendValidator_1.validateFriend)(friend)) {
                res.send('error');
            }
            let locationsURL = yield getFriendsURL(session.info.webId);
            if (locationsURL == undefined)
                return res.send("error");
            const friendThing = (0, friendBuilder_1.friendToThing)(friend);
            let friendsSolidDataset = yield (0, solid_client_1.getSolidDataset)(locationsURL, { fetch: session.fetch });
            friendsSolidDataset = (0, solid_client_1.setThing)(friendsSolidDataset, friendThing);
            let newDataset = yield (0, solid_client_1.saveSolidDatasetAt)(locationsURL, friendsSolidDataset, { fetch: session.fetch } // fetch from authenticated Session
            );
            return res.send((0, solid_client_1.getThingAll)(newDataset).map(locationThing => (0, friendBuilder_1.thingToFriend)(locationThing)));
        });
    },
    deleteFriend: function (_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
function getFriendsURL(webId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (webId == undefined)
            return undefined;
        let webID = decodeURIComponent(webId);
        const podURL = yield (0, solid_client_1.getPodUrlAll)(webID);
        console.log(podURL);
        return podURL + "contacts/";
    });
}
