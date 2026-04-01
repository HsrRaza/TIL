import { Worker } from "bullmq";

new Worker(
    "emailQueue",
    async (job )=>{
        console.log("Processing :", job.data);
        
    },
    {
        connection:{
            host:"127.0.0.1",
            port:6379,
        }
    }
)

