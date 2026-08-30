const fs = require('fs')

// fs.writeFileSync(
//     "hello.txt",
//     "hello NodejS"
// )

// const data = fs.readFileSync(
//     "hello.txt",
//     "utf-8"
// )
// // console.log(data)

// fs.writeFileSync(
//     "hello.txt",
//     "this is updated content"
// )
// const datas = fs.readFileSync(
//     "hello.txt",
//     "utf-8"
// )
// // console.log(datas)

// fs.appendFileSync(
//     "hello.txt",
//     "\n New line added"
    
// )

// const datass = fs.readFileSync(
//     "hello.txt",
//     "utf-8"
// )
// // console.log(datass)

// fs.unlinkSync("hello.txt")



// directorys

// fs.mkdirSync("uploads")

const files = fs.readdirSync(".")

// console.log(files);

if (fs.existsSync("hello.txt")){
    console.log("File Existed")
} else {
    console.log("file does not exists")
}

