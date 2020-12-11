"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = exports.use = exports.controller = exports.router = void 0;
require("reflect-metadata");
var express_1 = require("express");
exports.router = express_1.Router();
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
})(Method || (Method = {}));
function controller(target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata("path", target.prototype, key);
        var method = Reflect.getMetadata("method", target.prototype, key);
        var middleware = Reflect.getMetadata("middleware", target.prototype, key);
        var handler = target.prototype[key];
        if (path && method) {
            if (middleware) {
                exports.router[method](path, middleware, handler);
            }
            else {
                exports.router[method](path, handler);
            }
            console.log(key);
        }
    }
}
exports.controller = controller;
function use(middleware) {
    return function (target, key) {
        Reflect.defineMetadata("middleware", middleware, target, key);
    };
}
exports.use = use;
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata("path", path, target, key);
            Reflect.defineMetadata("method", type, target, key);
        };
    };
}
exports.get = getRequestDecorator(Method.get);
exports.post = getRequestDecorator(Method.post);
