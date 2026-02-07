import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; 
import fs from 'fs';

const app = express();

const filename = fileURLToPath(import.meta.url);
const dir = path.dirname(filename);

app.get("/", (req, res) => {
    console.log("request received to " + req.url);
    res.sendFile(path.join(dir, "/welcome.html"))
})

app.get("/image", (req, res) => {
    try {
        const data = fs.readFileSync("../pu.codingclub.space.png");
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send({
            msg: "internal server error",
            err :  error
        })
    }
})

app.get("/pdf", (req, res) => {
    try {
        const data = fs.createReadStream("My Time Table.pdf")
        data.pipe(res);
    } catch (error) {
        console.log(error);
        res.send({
            msg: "internal server error",
            err :  error
        })
    }
})

app.use((req, res) => {
    res.sendFile(path.join(dir, "page.html"))
})


app.listen(3000, () => {
    console.log("Server is started at port no 3000");
})