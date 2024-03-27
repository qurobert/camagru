import express from "express";

const indexRouter = express.Router()
indexRouter.get('/', (req, res) => {
    res.send(process.env)
})

export default indexRouter