// create basic server using express
// npm run server
import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'


connectDB() //call connectDB function, 'npm run server' will see Database connected
const app = express()
app.use(cors()) // enable cross-origin resource sharing

//middleware
app.use(express.json())
app.use(clerkMiddleware())

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})


app.get('/', (req, res) => res.send("API is working"))
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));


