import { controller, get, use } from "../decorator";
import { Response, Request, NextFunction } from "express";
import { getResponseData } from "../utils/utlis";
import fs from "fs";
import path from "path";
import Crowller from "../utils/crowller";
import Analyse from "../utils/analyse";

// //判断是否登陆 中间件(middleware)
function isLogin(req: Request, res: Response, next: NextFunction) {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(false, "Please login"));
  }
}
@controller("/")
export class CrowllerController {
  @get("/getdata")
  @use(isLogin) //添加middleware
  getData(req: Request, res: Response) {
    const url = "http://www.dell-lee.com/";
    const analyser = Analyse.getInstance();
    new Crowller(url, analyser);
    res.json(getResponseData(true));
  }
  @get("/showdata")
  @use(isLogin)
  showData(req: Request, res: Response) {
    try {
      const filepath = path.resolve(__dirname, "../../data/course.json");
      let fileContent = {};
      if (fs.existsSync(filepath)) {
        //判断文件里面是否有内容
        fileContent = JSON.parse(fs.readFileSync(filepath, "utf-8")); //把字符串转对象
      }
      res.json(getResponseData(fileContent));
    } catch (e) {
      console.log(e);
    }
    //try,catch处理文件course.json不存在时的bug
  }
}
