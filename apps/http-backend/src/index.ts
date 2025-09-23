import cors from "cors"
import express from "express";
import dotenv from "dotenv"
import userRouter from "./routes/user";


dotenv.config()
const app = express()

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials:true
  })
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/user", userRouter)



app.listen(7002, () => {
  
    console.log("server started at the port 7002")
 
})


