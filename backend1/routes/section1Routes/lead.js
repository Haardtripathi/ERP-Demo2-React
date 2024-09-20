const express = require('express');
const { upload } = require("../../config/upload");
const leadController = require('../../controllers/section1Controllers/lead');

const router = express.Router();

router.get('/lead', leadController.getLeadData);
router.post('/deleteLeadItem', leadController.deleteLeadItem);
router.post("/addLeadItem", upload.single('csvFile'), leadController.addLeadItem);
router.get("/editLeadItem/:id", leadController.getEditLeadItem)

module.exports = router;
