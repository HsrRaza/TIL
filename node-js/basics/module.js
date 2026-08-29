const os = require("os")
console.log(os.platform())
console.log(os.arch());
// console.log(os.cpus());
console.log(os.cpus().length);

console.log(os.totalmem()); //total memory


console.log(os.freemem())
console.log(os.hostname());

console.log(os.homedir());

console.log(os.tmpdir())