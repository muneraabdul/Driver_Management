const router = require('express').Router()
const testController = require('../controller/testcontroller')

router.get('test',testController.index)