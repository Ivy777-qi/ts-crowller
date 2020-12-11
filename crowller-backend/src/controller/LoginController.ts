import { controller, get, post } from "../decorator";
import { Response, Request } from "express";
import { getResponseData } from "../utils/utlis";

//.t.ds文件类型不准确时候 对Request重新定义
interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined; //key表示paasword等
  };
}
@controller("/")
export class LoginController {
  static checklogin(req: Request) {
    //由于没有实例化,所以不能用this,需要static,调用时LoginController.checklogin
    return req.session ? req.session.login : false;
  }
  @get("/")
  home(req: Request, res: Response) {
    const isLogin = LoginController.checklogin(req);
    res.json(getResponseData(isLogin));
  }
  @get("/loginout")
  loginout(req: Request, res: Response) {
    if (req.session) {
      req.session.login = undefined;
    }
    res.redirect("/"); //退到登陆界面 res //res.send("Exited success.");不能同时有
  }

  @post("/login")
  login(req: RequestWithBody, res: Response) {
    const isLogin = LoginController.checklogin(req);
    console.log(req.body);

    const { password } = req.body;
    if (isLogin) {
      res.json(getResponseData(false, "You are already logged in."));
    } else {
      if (password === "123") {
        if (req.session) {
          req.session.login = true;
          res.json(getResponseData(true));
        }
      } else {
        res.json(getResponseData(false, "data fail"));
      }
    }
  }
}
