require("dotenv").config();

console.log(`==================================`);
console.log(`= Next config `);
console.log(`==================================`);
console.log(`process.env.GITHUB_PAGES = ${process.env.GITHUB_PAGES}\n`);

module.exports = {
    assetPrefix: process.env.GITHUB_PAGES ? "/apricot" : "",
};
