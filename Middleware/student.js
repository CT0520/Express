import { Router } from 'express';

const route = Router();

// router level middleware
route.use((req, res, next) => {
    console.log("user.js middleware is called");
    next();
})

route.get("/", (req, res) => {
    res.send("client request for Router-middleware")
})

export default route;