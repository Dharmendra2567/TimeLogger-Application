const express = require('express')
const { addUser, emailVerify, signIn, signOut } = require('../controller/UserController')
const router =express.Router()

router.post('/register',addUser)
router.get('/confirm/:token',emailVerify)
router.post('/signin',signIn)
router.get('/signout',signOut)

module.exports= router;