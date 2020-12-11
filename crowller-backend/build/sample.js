"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//ts->.d.ts 翻译文件 -->js
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
var Sample = /** @class */ (function () {
    //创建单例模式
    function Sample() {
    }
    Sample.prototype.generateJson = function (courseData, filepath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filepath)) { //判断文件里面是否有内容
            fileContent = JSON.parse(fs_1.default.readFileSync(filepath, 'utf-8')); //把字符串转对象
        }
        fileContent[courseData.time] = courseData.data;
        return fileContent;
    };
    Sample.prototype.getCourse = function (html) {
        var courseInfo = [];
        var $ = cheerio_1.default.load(html);
        var courseItems = $('.course-item');
        courseItems.map(function (index, item) {
            var title = $(item).find('.course-desc').text(); //.eq(0)表示index
            console.log(title);
            courseInfo.push({ title: title });
        });
        return {
            time: (new Date()).getTime(),
            data: courseInfo
        };
    };
    Sample.prototype.initSample = function (url, filepath) {
        var data = this.getCourse(url);
        var fileContent = this.generateJson(data, filepath);
        return JSON.stringify(fileContent);
    };
    Sample.getInstance = function () {
        if (!Sample.instance) {
            Sample.instance = new Sample();
        }
        return Sample.instance;
    };
    return Sample;
}());
exports.default = Sample;
//const crowller = new Crowller();
