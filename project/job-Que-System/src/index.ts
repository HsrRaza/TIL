console.log("hello");
// this is a simple job queue system using bullmq and redis
// we will create a queue and a worker to process the jobs in the queue

import { emailQueue } from "./queues/email.queues.js";

emailQueue.add("sendEmail", {
    to:"user@example.com",
    subject:"Hello",
    body:"This is a test email."
});