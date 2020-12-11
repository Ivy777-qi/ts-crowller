import express from "express";
import router from "./router";
import cookieSession from "cookie-session";
import "./controller"; //调用后不需要实例化就可以
var bodyParser = require("body-parser"); //express来支持ts的middleware

const app = express(); //建立

app.use(bodyParser.urlencoded({ extended: false })); //middleware
//中间件(middleware)传统方式
// app.use((req:Request,res:Response,next:NextFunction)=>{
//   req.name ='Ivy';
//   next();
// })

//cookieSession用来记录存储状态的middleware
app.use(
  cookieSession({
    name: "session",
    keys: ["Ivy"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(router); //使用

//监听
app.listen(7001, () => {
  console.log("server is running");
});
