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
const solid_client_authn_node_1 = require("@inrupt/solid-client-authn-node");
exports.default = {
    initLogin: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // create a new Session
            const session = new solid_client_authn_node_1.Session();
            req.session.solidSessionId = session.info.sessionId;
            //Redirect user to POD provider login
            const redirectToSolidIdentityProvider = (providerURL) => {
                res.redirect(providerURL);
            };
            yield session.login({
                // If login successfully, redirect here
                redirectUrl: 'http://localhost:8082/auth/loginconfirm',
                // Set user SOLID identity provider
                oidcIssuer: req.query.providerURL,
                //oidcIssuer: "https://login.inrupt.com",
                // Application name to show when requesting data
                clientName: "LoMap",
                //handler to redirect to the provider login
                handleRedirect: redirectToSolidIdentityProvider
            });
        });
    },
    confirmLogin: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // If we get here, the user has logged in successfully
            // Recover session information
            const session = yield (0, solid_client_authn_node_1.getSessionFromStorage)(req.session.solidSessionId);
            // Complete login process using the data appended by the Solid Identity Provider
            try {
                yield session.handleIncomingRedirect(`http://localhost:8082/auth${req.url}`);
            }
            catch (e) {
                return res.sendStatus(500);
            }
            // Session now contains an authenticated Session instance.
            if (session.info.isLoggedIn) {
                return res.redirect("http://localhost:3000/login/confirm");
            }
            return res.sendStatus(401);
        });
    },
    logout: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield (0, solid_client_authn_node_1.getSessionFromStorage)(req.session.solidSessionId);
            yield session.logout();
            res.redirect("http://localhost:3000");
        });
    },
    initTestLogin: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = new solid_client_authn_node_1.Session();
            req.session.solidSessionId = session.info.sessionId;
            const redirectToSolidIdentityProvider = (providerURL) => {
                res.redirect(providerURL);
            };
            yield session.login({
                redirectUrl: 'http://localhost:8082/auth/testloginconfirm',
                oidcIssuer: "https://login.inrupt.com",
                clientName: "LoMap",
                handleRedirect: redirectToSolidIdentityProvider
            });
        });
    },
    confirmTestLogin: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield (0, solid_client_authn_node_1.getSessionFromStorage)(req.session.solidSessionId);
            yield session.handleIncomingRedirect(`http://localhost:8082/auth${req.url}`);
            if (session.info.isLoggedIn) {
                return res.redirect("http://localhost:3000");
            }
            return res.send("Not able to log in");
        });
    },
};
