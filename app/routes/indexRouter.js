import express from "express";

const indexRouter = express.Router()

indexRouter.get('/',  async (req, res) => {
    console.log(process.env);
    res.send("Hello World");
})

export default indexRouter