const fs = require('fs').promises


// using  async call back

// fs.readFile("hello.txt", "utf-8", (err, data)=>{
//     if(err){
//         console.log(err);
//         return
//     }
//         console.log(data);
        
// })

// usng promised based functions

async function readFile() {
    const data = await fs.readFile(
        "hello.txt",
        "utf-8"
    )
console.log(data);

}
// readFile()



// ex logging system


async function logging(msg) {
    
    const timeStamps = new Date().toISOString();

    fs.appendFile(
        "logs.txt",
        `${timeStamps} - ${msg} \n`,
        (err) => {
            if(err){
                console.error(err)
            }
        }

    )
}

logging("this is a log message")