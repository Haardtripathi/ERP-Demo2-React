const mongoose = require("mongoose");

const Dropdown = require("../../models/dropdowns");
const Workbook = require("../../models/workbook");
const Incoming = require("../../models/incoming");

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


exports.getIncomingData = async (req, res) => {
    try {
        const data = await Incoming.find({ isDeleted: false });
        // console.log(data); // Add this line
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


exports.deleteIncomingItem = async (req, res, next) => {
    const { itemId } = req.body;

    try {
        await Incoming.updateOne({ _id: itemId }, { isDeleted: true });
        console.log("Incoming item deleted");
        // Handle workbook item deletion
        await Workbook.updateOne({ dataId: itemId }, { isDeleted: true });
        console.log("Workbook item deleted");
        res.json({ success: true, message: "Item successfully deleted." });
    } catch (error) {
        console.error("Error deleting items:", error);
        // Send a JSON response indicating failure
        res.status(500).json({ success: false, message: "An error occurred while deleting the item." });
    }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


exports.getAddIncomingData = async (req, res, next) => {
    try {
        const data = await Dropdown.find();

        const formattedData = data.map((item) => ({
            name: item.name,
            values: item.values,
        }));

        res.json({ dropdowns: formattedData }); // Send as JSON response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


exports.postAddIncomingData = async (req, res, next) => {
    try {
        const staticDropdownData = {
            source: "669258512f5aaf7d9cb3cd56",
            agent_name: "6692586f2f5aaf7d9cb3cd58",
            language: "669258992f5aaf7d9cb3cd5a",
            disease: "669258db2f5aaf7d9cb3cd5c",
            state: "6692594c2f5aaf7d9cb3cd5e",
            remark: "669259862f5aaf7d9cb3cd60",
        };
        const commonFields = {
            source: {
                dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.source),
                value: req.body.source,
            },
            CM_First_Name: req.body.cmFirstName,
            CM_Last_Name: req.body.cmLastName,
            CM_Phone: req.body.cmphone,
            alternate_Phone: req.body.cmPhoneAlternateNumber,
            agent_name: {
                dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.agent_name),
                value: req.body.agent_name,
            },
            language: {
                dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.language),
                value: req.body.language,
            },
            disease: {
                dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.disease),
                value: req.body.disease,
            },
            age: req.body.age,
            height: req.body.height,
            weight: req.body.weight,
            state: {
                dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.state),
                value: req.body.state,
            },
            city: req.body.city,
            remark: {
                dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.remark),
                value: req.body.remark,
            },
            comment: req.body.comment,
        };

        // Save incoming data
        const incomingData = new Incoming(commonFields);
        const savedIncomingData = await incomingData.save();
        console.log('Saved in incoming');

        // Create workbook data
        const workbookData = new Workbook({
            data: {
                dropdown_data: new mongoose.Types.ObjectId(req.body.data_dd_id),
                value: "Incoming",
            },
            dataId: savedIncomingData._id,
            ...commonFields,
        });

        // Save workbook data
        await workbookData.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Error saving data', error });
    }
};