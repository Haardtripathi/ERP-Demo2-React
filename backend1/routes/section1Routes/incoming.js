const express = require('express')

const router = express.Router()


const incomingController = require('../../controllers/section1Controllers/incoming')

router.get('/addIncomingData', incomingController.getAddIncomingData)

router.post('/addIncomingData', incomingController.postAddIncomingData)

router.get('/incoming', incomingController.getIncomingData)

router.post('/deleteIncomingItem', incomingController.deleteIncomingItem)

router.get('/editIncomingItem/:id', incomingController.getEditIncomingItem)

module.exports = router;
