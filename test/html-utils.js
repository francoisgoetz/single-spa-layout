import { inBrowser } from "../src/utils/environment-helpers";
import Parser from "../src/server/CustomParser.js";
import fs from "fs";
import path from "path";

export function parseHTML(str) {
  if (inBrowser) {
    return new DOMParser().parseFromString(str, "text/html").documentElement;
  } else {
    return new Parser().parse(str);
  }
}

export function findRouterElement(document) {
  return inBrowser
    ? document.querySelector("single-spa-router")
    : document.childNodes[1].childNodes[2].childNodes[1];
}

export function parseFixture(filename) {
  const str = fs.readFileSync(
    path.resolve(__dirname, `./fixtures/${filename}`),
    "utf-8"
  );
  const document = parseHTML(str);
  const routerElement = findRouterElement(document);
  return { document, routerElement };
}
