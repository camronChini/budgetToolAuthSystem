import express from 'express'

//instance of express called 'app'
const app = express();

app.get("/", (req,res) => {
    res.send("Hello World!")
})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})