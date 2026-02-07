import express from "express"
import { data } from './data.js';

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("welcome to 6A6 file")
})

app.get("/data", (req, res) => {
    if (data == null) {
        return res.status(200).send({msg : "data contains null value"})
    }
    res.status(200).send({
        msg: "data fetched successfully",
        data :  data
    })
})


app.post("/data", (req, res) => {
    const { name, age, gender } = req.body;
    if (typeof (name) != "string" || typeof (age) != "number" || typeof (gender) != "string") {
        return res.status(400).send({
            msg: "Invailid data format",
            detils: {
                name: "must be a string",
                age: "must be a number",
                gender : "must be a string"
            }
        })
    }

    try {
        data.push({ name: name, age: age, gender: gender })
        res.status(201).send({msg : "data create successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: "Internal server error",
            err :  error.message
        })
    }
})

app.listen(3000, () => {
    console.log("server started");
})