const express = require("express");
require("dotenv").config();
const {userRoute} = require("./routes/user.route");
const {noteRoute} = require("./routes/note.route");
const {connection} = require("./database/db")
const auth = require("./middleware/auth")
const cors = require("cors");



const app = express();
app.use(express.json());
app.use(cors())


app.use("/users",userRoute)

app.use(auth);
app.use("/notes",noteRoute)

// app.get("/",(req,res)=>{
//     res.send("Home page")
// })


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (err) {
        console.log("Cannot Connect to DB")
    }
    console.log(`server is running on port ${process.env.PORT}`)
})

module.exports = app