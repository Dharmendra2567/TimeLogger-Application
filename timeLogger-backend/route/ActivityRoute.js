const express = require('express')
const { addActivity, getAllActivities } = require('../controller/ActivityController')
const router = express.Router()

router.post('/activity',addActivity)
router.get('/allactivities',getAllActivities)

module.exports= router