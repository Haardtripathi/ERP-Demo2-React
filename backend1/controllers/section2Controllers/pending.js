const mongoose = require("mongoose");

const Dropdown = require("../../models/dropdowns");
const Workbook = require("../../models/workbook");
const Incoming = require("../../models/incoming");
const Lead = require("../../models/lead");
const Pending = require("../../models/pending");

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

exports.getPendingData = async (req, res, next) => {
    try {
        const data = await Pending.find({ isDeleted: false });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}