import express from "express";

const indexRouter = express.Router()

indexRouter.get('/',  async (req, res) => {
    // res.send("Hello World");
    throw new Error("Error from Index Router");
    // return res.send("Index Router");
})

export default indexRouter