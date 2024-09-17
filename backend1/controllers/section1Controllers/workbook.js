const mongoose = require("mongoose");

const Dropdown = require("../../models/dropdowns");
const Workbook = require("../../models/workbook");
const Incoming = require("../../models/incoming");
const Lead = require("../../models/lead");

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Serve the workbook index data as JSON
exports.getIndex = (req, res, next) => {
    // Send a JSON response instead of rendering a view
    res.json({ message: "Welcome to the workbook index page" });
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


exports.getWorkbook = async (req, res, next) => {
    try {
        const data = await Workbook.find({ isDeleted: false });
        console.log(data); // Add this line
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
exports.deleteWorkbookItem = async (req, res, next) => {
    const { dataId, itemId, dataValue } = req.body;

    try {
        // Handle deletion based on dataValue
        if (dataValue === "Incoming") {
            await Incoming.updateOne({ _id: dataId }, { isDeleted: true });
            console.log("Incoming item deleted");
        } else if (dataValue === "Lead") {
            await Lead.updateOne({ _id: dataId }, { isDeleted: true });
            console.log("Lead item deleted");
        }

        // Handle workbook item deletion
        await Workbook.updateOne({ _id: itemId }, { isDeleted: true });
        console.log("Workbook item deleted");

        // Send a JSON response indicating success
        res.json({ success: true, message: "Item successfully deleted." });
    } catch (error) {
        console.error("Error deleting items:", error);
        // Send a JSON response indicating failure
        res.status(500).json({ success: false, message: "An error occurred while deleting the item." });
    }
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
