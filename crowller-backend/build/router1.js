"use strict";
// import { Router, Response, Request, NextFunction } from "express";
// import fs from "fs";
// import path from "path";
// import Crowller from "./utils/crowller";
// import Analyse from "./utils/analyse";
// import { getResponseData } from "./utils/utlis"; //用res.json来返回接口
// const router = Router();
// //判断是否登陆 中间件(middleware)
// function isLogin(req: Request, res: Response, next: NextFunction) {
//   const isLogin = req.session ? req.session.login : false;
//   if (isLogin) {
//     next();
//   } else {
//     res.json(getResponseData(false, "Please login"));
//   }
// }
// //.t.ds文件类型不准确时候 对Request重新定义
// interface RequestWithBody extends Request {
//   body: {
//     [key: string]: string | undefined; //key表示paasword等
//   };
// }
// router.get("/", (req: Request, res: Response) => {
//   const isLogin = req.session ? req.session.login : false;
//   if (isLogin) {
//     res.send(`
//       <html>
//         <body>
//         <a href = '/getdata'>Get data</a>
//         <a href = '/showdata'>Show data</a>
//         <a href = '/loginout'>Sign out</a>
//         </body>
//       </html>`);
//   } else {
//     res.send(`
//     <html>
//       <body>
//         <form method ='post' action ='/login'>
//           <input type="password" name="password"/>
//           <button>提交</button>
//         </form>
//       </body>
//     </html>`);
//   }
// });
// router.post("/login", (req: RequestWithBody, res: Response) => {
//   const isLogin = req.session ? req.session.login : false;
//   const { password } = req.body;
//   if (isLogin) {
//     res.json(getResponseData(false, "You are already logged in."));
//   } else {
//     if (password === "123") {
//       if (req.session) {
//         req.session.login = true;
//         res.json(getResponseData(true));
//       }
//     } else {
//       res.json(getResponseData(false, "data fail"));
//     }
//   }
// });
// router.get("/loginout", (req: RequestWithBody, res: Response) => {
//   if (req.session) {
//     req.session.login = undefined;
//   }
//   res.redirect("./"); //退到登陆界面 res //res.send("Exited success.");不能同时有
// });
// router.get("/getdata", (req: RequestWithBody, res: Response) => {
//   const url = "http://www.dell-lee.com/";
//   const analyser = Analyse.getInstance();
//   new Crowller(url, analyser);
//   res.json(getResponseData(true));
// });
// router.get("/showdata", isLogin, (req: RequestWithBody, res: Response) => {
//   try {
//     const filepath = path.resolve(__dirname, "../data/course.json");
//     let fileContent = {};
//     if (fs.existsSync(filepath)) {
//       //判断文件里面是否有内容
//       fileContent = JSON.parse(fs.readFileSync(filepath, "utf-8")); //把字符串转对象
//     }
//     res.json(getResponseData(fileContent));
//   } catch (e) {
//     console.log(e);
//   }
//   //try,catch处理文件course.json不存在时的bug
// });
// export default router;
