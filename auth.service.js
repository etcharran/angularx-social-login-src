"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var AuthServiceConfig = (function () {
    function AuthServiceConfig(providers) {
        this.providers = new Map();
        for (var i = 0; i < providers.length; i++) {
            var element = providers[i];
            this.providers.set(element.id, element.provider);
        }
    }
    return AuthServiceConfig;
}());
exports.AuthServiceConfig = AuthServiceConfig;
var AuthService = AuthService_1 = (function () {
    function AuthService(config) {
        var _this = this;
        this._user = null;
        this._authState = new rxjs_1.BehaviorSubject(null);
        this.providers = config.providers;
        this.providers.forEach(function (provider, key) {
            provider.initialize().then(function (user) {
                user.provider = key;
                _this._user = user;
                _this._authState.next(user);
            })["catch"](function (err) {
                // this._authState.next(null);
            });
        });
    }
    Object.defineProperty(AuthService.prototype, "authState", {
        get: function () {
            return this._authState.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.signIn = function (providerId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var providerObject = _this.providers.get(providerId);
            if (providerObject) {
                providerObject.signIn().then(function (user) {
                    user.provider = providerId;
                    resolve(user);
                    _this._user = user;
                    _this._authState.next(user);
                });
            }
            else {
                reject(AuthService_1.ERR_LOGIN_PROVIDER_NOT_FOUND);
            }
        });
    };
    AuthService.prototype.signOut = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this._user) {
                reject(AuthService_1.ERR_NOT_LOGGED_IN);
            }
            else {
                var providerId = _this._user.provider;
                var providerObject = _this.providers.get(providerId);
                if (providerObject) {
                    providerObject.signOut().then(function () {
                        resolve();
                        _this._user = null;
                        _this._authState.next(null);
                    });
                }
                else {
                    reject(AuthService_1.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            }
        });
    };
    return AuthService;
}());
AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
AuthService.ERR_NOT_LOGGED_IN = 'Not logged in';
AuthService = AuthService_1 = __decorate([
    core_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
var AuthService_1;
