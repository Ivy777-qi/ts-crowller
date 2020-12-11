//ts->.d.ts 翻译文件 -->js
import fs from "fs";
import path from "path";
import superagent from "superagent";
//import Sample1 from './sample1';
export interface CrollerAnalyse {
  initAnalyse: (text: string, filepath: string) => string;
}
class Crowller {
  private filepath = path.resolve(__dirname, "../../data/course.json"); //得到course.json路径
  private async getRawUrl() {
    const result = await superagent.get(this.url);
    return result.text;
  }
  private writeFile(fileContent: string) {
    fs.writeFileSync(this.filepath, fileContent);
  }
  private async initCrowller() {
    const text = await this.getRawUrl();
    const fileContent = this.analyser.initAnalyse(text, this.filepath);
    this.writeFile(fileContent);
  }
  constructor(private url: string, private analyser: CrollerAnalyse) {
    this.initCrowller();
  }
}

//const sample = new Sample1();
//const sample = new Sample();//不适用于单例模式
// const sample = Sample.getInstance();//单利模式

export default Crowller;
