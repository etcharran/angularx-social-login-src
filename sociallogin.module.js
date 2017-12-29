"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var auth_service_1 = require("./auth.service");
function configFactory(config) {
    return config;
}
exports.configFactory = configFactory;
var SocialLoginModule = SocialLoginModule_1 = (function () {
    function SocialLoginModule() {
    }
    SocialLoginModule.initialize = function (config) {
        return {
            ngModule: SocialLoginModule_1,
            providers: [
                auth_service_1.AuthService,
                {
                    provide: auth_service_1.AuthServiceConfig,
                    useValue: config
                }
            ]
        };
    };
    return SocialLoginModule;
}());
SocialLoginModule = SocialLoginModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule
        ],
        providers: [
            auth_service_1.AuthService
        ]
    })
], SocialLoginModule);
exports.SocialLoginModule = SocialLoginModule;
var SocialLoginModule_1;
