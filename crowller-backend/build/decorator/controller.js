"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var router_1 = __importDefault(require("../router"));
function controller(root) {
    return function (target) {
        //target是个constructor
        for (var key in target.prototype) {
            var path = Reflect.getMetadata("path", target.prototype, key);
            var method = Reflect.getMetadata("method", target.prototype, key);
            var middleware = Reflect.getMetadata("middleware", target.prototype, key);
            var handler = target.prototype[key];
            if (path && method) {
                var fullpath = root === "/" ? path : "" + root + path;
                console.log(fullpath);
                if (middleware) {
                    router_1.default[method](fullpath, middleware, handler);
                }
                else {
                    router_1.default[method](fullpath, handler);
                }
                console.log(key);
            }
        }
    };
}
exports.controller = controller;
