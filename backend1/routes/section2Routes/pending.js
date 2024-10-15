const express = require("express");

const router = express.Router();

const pendingController = require("../../controllers/section2Controllers/pending");

router.get("/pending", pendingController.getPendingData);

router.get("/editPendingData/:id", pendingController.getEditPendingData)

router.post("/editPendingData", pendingController.postEditPendingData)
module.exports = router;