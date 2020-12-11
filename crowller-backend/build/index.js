"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var cookie_session_1 = __importDefault(require("cookie-session"));
require("./controller"); //调用后不需要实例化就可以
var bodyParser = require("body-parser"); //express来支持ts的middleware
var app = express_1.default(); //建立
app.use(bodyParser.urlencoded({ extended: false })); //middleware
//中间件(middleware)传统方式
// app.use((req:Request,res:Response,next:NextFunction)=>{
//   req.name ='Ivy';
//   next();
// })
//cookieSession用来记录存储状态的middleware
app.use(cookie_session_1.default({
    name: "session",
    keys: ["Ivy"],
    maxAge: 24 * 60 * 60 * 1000,
}));
app.use(router_1.default); //使用
//监听
app.listen(7001, function () {
    console.log("server is running");
});
