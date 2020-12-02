/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */

require("dotenv").config();

console.log("==================================");
console.log("= Next config ");
console.log("==================================");
console.log(`process.env.CI = ${process.env.CI} [${typeof process.env.CI}]`);
console.log(`process.env.GITHUB_PAGES = ${process.env.GITHUB_PAGES} [${typeof process.env.GITHUB_PAGES}]`);
console.log("\n");

const isCi = process.env.CI === "true";
const isGithubPages = process.env.GITHUB_PAGES === "true";

module.exports = {
  assetPrefix: isGithubPages ? "/apricot" : "",
  env: {
    CLIENT_ID: isGithubPages ? process.env.CLIENT_ID_PROD : isCi ? process.env.CLIENT_ID_STG : "57f202d4c1f07138cd6a",
    CLIENT_SECRET: isGithubPages ? process.env.CLIENT_SECRET_PROD : isCi ? process.env.CLIENT_SECRET_STG : "abef994f0f63495819116190ca6fdd05a4499226",
  },
};
