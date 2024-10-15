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

exports.getEditPendingData = async (req, res, next) => {
    const pendingDataId = req.params.id
    try {
        const data = await Dropdown.find();

        const formattedData = data.reduce((acc, item) => {
            // Ensure the item contains the necessary properties
            if (item.name && item.values && item._id) {
                acc[item.name.toLowerCase()] = {
                    values: item.values,
                    id: item._id // Assuming `_id` is the key you want to use for IDs
                };
            }
            return acc;
        }, {});
        const pendingData = await Pending.findById(pendingDataId)
        console.log(formattedData)
        console.log(pendingData)
        res.json({ dropdowns: formattedData, prevData: pendingData }); // Send as JSON response


    } catch (error) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }


}

module.exports.postEditPendingData = async (req, res, next) => {
    const pendingDataId = req.body.id
    const pendingData = req.body.formData
}