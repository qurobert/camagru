const express = require('express')
const router = express.Router()
const knex = require('../model/knex')
// const User = require('../model/User')
router.get('/', async (req, res) => {
    console.log("Le contenu est :", await knex('Users').select('*'));
    res.send("Hello World")
})

module.exports = router