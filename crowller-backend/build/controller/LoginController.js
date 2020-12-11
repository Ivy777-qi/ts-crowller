"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
var decorator_1 = require("../decorator");
var utlis_1 = require("../utils/utlis");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController_1 = LoginController;
    LoginController.checklogin = function (req) {
        //由于没有实例化,所以不能用this,需要static,调用时LoginController.checklogin
        return req.session ? req.session.login : false;
    };
    LoginController.prototype.home = function (req, res) {
        var isLogin = LoginController_1.checklogin(req);
        res.json(utlis_1.getResponseData(isLogin));
    };
    LoginController.prototype.loginout = function (req, res) {
        if (req.session) {
            req.session.login = undefined;
        }
        res.redirect("/"); //退到登陆界面 res //res.send("Exited success.");不能同时有
    };
    LoginController.prototype.login = function (req, res) {
        var isLogin = LoginController_1.checklogin(req);
        console.log(req.body);
        var password = req.body.password;
        if (isLogin) {
            res.json(utlis_1.getResponseData(false, "You are already logged in."));
        }
        else {
            if (password === "123") {
                if (req.session) {
                    req.session.login = true;
                    res.json(utlis_1.getResponseData(true));
                }
            }
            else {
                res.json(utlis_1.getResponseData(false, "data fail"));
            }
        }
    };
    var LoginController_1;
    __decorate([
        decorator_1.get("/"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "home", null);
    __decorate([
        decorator_1.get("/loginout"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "loginout", null);
    __decorate([
        decorator_1.post("/login"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "login", null);
    LoginController = LoginController_1 = __decorate([
        decorator_1.controller("/")
    ], LoginController);
    return LoginController;
}());
exports.LoginController = LoginController;
