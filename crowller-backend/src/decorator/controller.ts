import "reflect-metadata";
import { Method } from "./request";
import router from "../router";
import { RequestHandler } from "express";

export function controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    //target是个constructor

    for (let key in target.prototype) {
      const path: string = Reflect.getMetadata("path", target.prototype, key);
      const method: Method = Reflect.getMetadata(
        "method",
        target.prototype,
        key
      );
      const middleware: RequestHandler = Reflect.getMetadata(
        "middleware",
        target.prototype,
        key
      );
      const handler = target.prototype[key];
      if (path && method) {
        const fullpath = root === "/" ? path : `${root}${path}`;
        console.log(fullpath);

        if (middleware) {
          router[method](fullpath, middleware, handler);
        } else {
          router[method](fullpath, handler);
        }
        console.log(key);
      }
    }
  };
}
