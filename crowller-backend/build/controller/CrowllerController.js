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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrowllerController = void 0;
var decorator_1 = require("../decorator");
var utlis_1 = require("../utils/utlis");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var crowller_1 = __importDefault(require("../utils/crowller"));
var analyse_1 = __importDefault(require("../utils/analyse"));
// //判断是否登陆 中间件(middleware)
function isLogin(req, res, next) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        res.json(utlis_1.getResponseData(false, "Please login"));
    }
}
var CrowllerController = /** @class */ (function () {
    function CrowllerController() {
    }
    CrowllerController.prototype.getData = function (req, res) {
        var url = "http://www.dell-lee.com/";
        var analyser = analyse_1.default.getInstance();
        new crowller_1.default(url, analyser);
        res.json(utlis_1.getResponseData(true));
    };
    CrowllerController.prototype.showData = function (req, res) {
        try {
            var filepath = path_1.default.resolve(__dirname, "../../data/course.json");
            var fileContent = {};
            if (fs_1.default.existsSync(filepath)) {
                //判断文件里面是否有内容
                fileContent = JSON.parse(fs_1.default.readFileSync(filepath, "utf-8")); //把字符串转对象
            }
            res.json(utlis_1.getResponseData(fileContent));
        }
        catch (e) {
            console.log(e);
        }
        //try,catch处理文件course.json不存在时的bug
    };
    __decorate([
        decorator_1.get("/getdata"),
        decorator_1.use(isLogin) //添加middleware
        ,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "getData", null);
    __decorate([
        decorator_1.get("/showdata"),
        decorator_1.use(isLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "showData", null);
    CrowllerController = __decorate([
        decorator_1.controller("/")
    ], CrowllerController);
    return CrowllerController;
}());
exports.CrowllerController = CrowllerController;
