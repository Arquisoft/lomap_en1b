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
const locationBuilder_1 = require("../builders/locationBuilder");
const locationValidator_1 = require("../validators/locationValidator");
exports.default = {
    saveLocation: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield (0, solid_client_authn_node_1.getSessionFromStorage)(req.session.solidSessionId);
            if (session == undefined) {
                return res.send('error');
            }
            let location = req.body.location;
            if (!(0, locationValidator_1.validateLocation)(location)) {
                res.send('error');
            }
            let locationsURL = yield getLocationsURL(session.info.webId);
            if (locationsURL == undefined) {
                return res.send("error");
            }
            let locationsSolidDataset = yield (0, solid_client_1.getSolidDataset)(locationsURL, { fetch: session.fetch } // fetch from authenticated session
            );
            const locationThing = (0, locationBuilder_1.locationToThing)(location);
            locationsSolidDataset = (0, solid_client_1.setThing)(locationsSolidDataset, locationThing);
            let newDataset = yield (0, solid_client_1.saveSolidDatasetAt)(locationsURL, locationsSolidDataset, { fetch: session.fetch } // fetch from authenticated Session
            );
            return res.send((0, solid_client_1.getThingAll)(newDataset).map(locationThing => (0, locationBuilder_1.thingToLocation)(locationThing)));
        });
    },
    getOwnLocations: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield (0, solid_client_authn_node_1.getSessionFromStorage)(req.session.solidSessionId);
            if (session == undefined)
                return res.send('error');
            let locationsURL = yield getLocationsURL(session.info.webId);
            if (locationsURL == undefined)
                return res.send("error");
            let locationsDataset = yield (0, solid_client_1.getSolidDataset)(locationsURL, { fetch: session.fetch } // fetch from authenticated session
            );
            return res.send((0, solid_client_1.getThingAll)(locationsDataset)
                .filter(locationThing => (0, locationValidator_1.validateLocationThing)(locationThing))
                .map(locationThing => (0, locationBuilder_1.thingToLocation)(locationThing)));
        });
    },
};
function getLocationsURL(webId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (webId == undefined)
            return undefined;
        let webID = decodeURIComponent(webId);
        const podURL = yield (0, solid_client_1.getPodUrlAll)(webID);
        console.log(podURL);
        return podURL + "private/";
    });
}
