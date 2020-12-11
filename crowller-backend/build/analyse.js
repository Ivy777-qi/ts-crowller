"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//ts->.d.ts 翻译文件 -->js
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
var Analyse = /** @class */ (function () {
    //创建单例模式
    function Analyse() {
    }
    Analyse.prototype.generateJson = function (courseData, filepath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filepath)) {
            //判断文件里面是否有内容
            fileContent = JSON.parse(fs_1.default.readFileSync(filepath, "utf-8")); //把字符串转对象
        }
        fileContent[courseData.time] = courseData.data;
        return fileContent;
    };
    Analyse.prototype.getCourse = function (html) {
        var courseInfo = [];
        var $ = cheerio_1.default.load(html);
        var courseItems = $(".course-item");
        courseItems.map(function (index, item) {
            var title = $(item).find(".course-desc").text(); //.eq(0)表示index
            var count = Math.floor(Math.random() * 100) + 1;
            console.log(title);
            courseInfo.push({ title: title, count: count });
        });
        return {
            time: new Date().getTime(),
            data: courseInfo,
        };
    };
    Analyse.prototype.initAnalyse = function (url, filepath) {
        var data = this.getCourse(url);
        var fileContent = this.generateJson(data, filepath);
        return JSON.stringify(fileContent);
    };
    Analyse.getInstance = function () {
        if (!Analyse.instance) {
            Analyse.instance = new Analyse();
        }
        return Analyse.instance;
    };
    return Analyse;
}());
exports.default = Analyse;
//const crowller = new Crowller();
