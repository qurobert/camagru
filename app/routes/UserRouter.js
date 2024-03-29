import express from "express";
import User from "../model/User.js";

const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
  const users = await User.findAll()
  res.send(users)
})

export default userRouter
