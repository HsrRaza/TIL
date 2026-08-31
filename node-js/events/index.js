const EventEmitter =require('events')

const emitter = new EventEmitter()





emitter.on('login', (username)=>{
    console.log(`send welcome email to user ${username}`);
    
})

emitter.on('login', ()=>{
    console.log("Create login record");
    
})

emitter.on("login", ()=>{
    console.log("update last login");
    
})
emitter.on("error", (err)=>{
    console.error(err.message);
    
})

emitter.emit('login' , "Hassan")
emitter.emit("error", new Error("Something went wrong"))