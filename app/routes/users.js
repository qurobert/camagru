const express = require('express')
const router = express.Router()
const knex = require('../model/db')
// const User = require('../model/User')
router.get('/', async (req, res) => {
    // const users = User.findAll()
    // res.json(users)
    try {
        console.log("test")
        const users = await knex('users').select('*');
        console.log("test 3", users)
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error")
    }
    res.send("Hello World")
})

module.exports = router