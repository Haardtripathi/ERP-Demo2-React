const express = require("express");

const router = express.Router();

const workbookController = require("../../controllers/section1Controllers/workbook");

// const incomingController = require("../../controllers/workbook/incoming");

router.get("/", workbookController.getIndex);

// router.get("/addWorkbookData", workbookController.getAddWorkbookData);

router.get("/workbook", workbookController.getWorkbook);
// router.post('/shiftToPending', workbookController.shiftToPending); // Adjust as needed
router.post('/deleteWorkbookItem', workbookController.deleteWorkbookItem);

router.get('/editWorkbookItem/:id', workbookController.getEditWorkbookItem);

router.post("/editWorkbookItem", workbookController.postEditWorkbookItem);


module.exports = router;
