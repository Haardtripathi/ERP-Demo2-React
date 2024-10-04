const express = require("express");

const router = express.Router();

const pendingController = require("../../controllers/section2Controllers/pending");

router.get("/pending", pendingController.getPendingData);

module.exports = router;