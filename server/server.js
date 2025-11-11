// create basic server using express
// npm run server
import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";


connectDB() //call connectDB function, 'npm run server' will see Database connected
const app = express()
app.use(cors()) // enable cross-origin resource sharing

app.post( "/api/clerk",  express.raw({ type: "application/json" }),  clerkWebhooks);
//middleware
app.use(express.json())
app.use(clerkMiddleware())

// API to listen to clerk webhooks //wrong order.
// app.use('/api/clerk',clerkWebhooks)

app.get('/', (req, res) => res.send("API is working"))
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));


