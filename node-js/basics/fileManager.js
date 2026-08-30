const fs = require("fs")

if (!fs.existsSync("notes")){
  fs.mkdirSync("notes")
}

fs.writeFileSync(
    "hello.txt",
    "basics of node js"
)

const data = fs.readFileSync(
    "hello.txt",
    "utf-8"
)
console.log(data)

fs.appendFileSync(
    "hello.txt",
    "\n Another practice questions"
)

const data2 = fs.readFileSync(
    "hello.txt",
    "utf-8"
)
console.log(data2)


// fs.unlinkSync("hello.txt")