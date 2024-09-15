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

exports.getWorkbook = async (req, res, next) => {
    try {
        
      const data = await Workbook.find({ isDeleted: false });
      console.log(data); // Add this line
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};