import express from "express"
import mongoose from 'mongoose';
import { student } from './student.js';

const app = express();
app.use(express.json());

// replace mongourl here
mongoose.connect("mongodb url").then(() => {
    console.log("databse connected successfully");
}).catch(err => console.log("error" + err));

app.get("/", (req, res) => {
    res.send("Welcome to the Express js")
})

app.get("/student", async (req, res) => {
    try {
        const data = await student.find();
        res.send({ data: data });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

app.post("/student", async (req, res) => {
    const { name, age, enrollmentId } = req.body;
    try {
        const result = await student.insertOne({
            name: name,
            age: age,
            enrollmentId : enrollmentId
        })

        if (result) {
            return res.status(201).send("Data inserted successfully");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})


app.listen(3000, () => {
    console.log("server is started at port no 3000");
})