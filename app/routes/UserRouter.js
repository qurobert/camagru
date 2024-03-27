import express from "express";

const userRouter = express.Router()
const knex = require('../model/knex')
// const User = require('../model/User')


// Get authentified user
userRouter.get('/', async (req, res) => {
    console.log("Le contenu est :", await knex('Users').select('*'));
    res.send("Hello World")
})

// Register
userRouter.post('/', async (req, res) => {
})

// Update
userRouter.patch('/', async (req, res) => {

})

// Login
userRouter.put('/', async (req, res) => {

})

// Get user by id
userRouter.get('/:id', async (req, res) => {

})


export default userRouter
