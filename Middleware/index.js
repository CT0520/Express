import express from 'express';
import student from './student.js'

const app = express();

app.use(express.json())

// application level middleware
app.use((req, res, next) => {
    console.log("Application level middleware");
    const data = `${req.method} - ${req.url}`
    console.log(data);
    next();
})

app.get("/", (req, res) => {
    res.send("welcome to A4 express server")
})

app.get("/data", (req, res) => {
    res.send("client requested for /data url")
})

app.get("/error", (req, res, next) => {
    console.log("raise an error");
    next(new Error("User defined error"));
})

app.use("/student", student);

// error handling middleware
app.use((err, req, res, next) => {
    console.log("error handling middleware");
    res.send({ msg: "internal server error" });
})

app.listen(3000, () => {
    console.log("server started at http://localhost:3000");
})