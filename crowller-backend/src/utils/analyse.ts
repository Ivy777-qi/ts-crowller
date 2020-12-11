//ts->.d.ts 翻译文件 -->js
import fs from "fs";
import cheerio from "cheerio";
import { CrollerAnalyse } from "./crowller";

interface Course {
  title: string;
  count: number;
}
interface Content {
  time: number;
  data: Course[];
}
interface fileJson {
  [propName: number]: Course[];
}
export default class Analyse implements CrollerAnalyse {
  private generateJson(courseData: Content, filepath: string) {
    let fileContent: fileJson = {};
    if (fs.existsSync(filepath)) {
      //判断文件里面是否有内容
      fileContent = JSON.parse(fs.readFileSync(filepath, "utf-8")); //把字符串转对象
    }
    fileContent[courseData.time] = courseData.data;
    return fileContent;
  }

  private getCourse(html: string) {
    const courseInfo: Course[] = [];
    const $ = cheerio.load(html);
    const courseItems = $(".course-item");
    courseItems.map((index, item) => {
      const title = $(item).find(".course-desc").text(); //.eq(0)表示index
      const count = Math.floor(Math.random() * 100) + 1;
      console.log(title);
      courseInfo.push({ title, count });
    });
    return {
      time: new Date().getTime(), //得到当前的日期
      data: courseInfo,
    };
  }
  public initAnalyse(url: string, filepath: string) {
    const data = this.getCourse(url);
    const fileContent = this.generateJson(data, filepath);
    return JSON.stringify(fileContent);
  }

  //创建单例模式
  private constructor() {}
  private static instance: Analyse;
  static getInstance() {
    if (!Analyse.instance) {
      Analyse.instance = new Analyse();
    }
    return Analyse.instance;
  }
}
//const crowller = new Crowller();
