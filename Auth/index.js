import express from 'express';
import passport from 'passport';
import JWT from 'jsonwebtoken';
import { users } from './data.js';
import { jwtStrategy } from './strategy.js';


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// application middleware
app.use((req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
})

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.get("/", (req, res) => {
    res.send("welcome to Auth demo server")
})

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (typeof (username) != "string" || typeof (password) != "string") {
        return res.status(400).send({
            msg: "data is invalid",
            detais : "username and password must be a string"
        })
    }

    try {
        if (username == users.name && password == users.password) {
            const token = JWT.sign({ name: users.name }, "This is my secret key", { expiresIn: '1h' })
            return res.status(200).send({
                msg: "user login successfully",
                token : `Bearer ${token}`
            })
        }

        res.status(400).send({ msg: "invalid username & password"})
    } catch (error) {
        console.log(error);
        res.status(500).send({msg : "Internal server error", err :  error})
    }
})

app.get("/auth",passport.authenticate("jwt", {session : false} ), (req, res) => {
    res.send("user is authenticated")
})

app.listen(3000, () => {
    console.log("Server started http://localhost:3000");
})