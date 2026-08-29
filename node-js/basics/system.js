const os = require("os")
console.log("Platform", os.platform())
console.log("Architecture", os.arch());
console.log("CPU cores, ", os.cpus().length);
console.log("Total memory", os.totalmem());
console.log("free memory ", os.freemem());
console.log("Hostname", os.hostname());
console.log("Home directory", os.homedir());





