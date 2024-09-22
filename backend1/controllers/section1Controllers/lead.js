const mongoose = require("mongoose");

const Dropdown = require("../../models/dropdowns");
const Workbook = require("../../models/workbook");
const Lead = require("../../models/lead");
const csv = require('csvtojson');
const path = require('path')

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


exports.getLeadData = async (req, res) => {
    try {
        const data = await Lead.find({ isDeleted: false });
        // console.log(data); // Add this line
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


exports.deleteLeadItem = async (req, res, next) => {
    const { itemId } = req.body;

    try {
        await Lead.updateOne({ _id: itemId }, { isDeleted: true });
        console.log("Lead item deleted");
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


exports.addLeadItem = async (req, res) => {
    const staticDropdownData = {
        source: "669258512f5aaf7d9cb3cd56",
        agent_name: "6692586f2f5aaf7d9cb3cd58",
        language: "669258992f5aaf7d9cb3cd5a",
        disease: "669258db2f5aaf7d9cb3cd5c",
        state: "6692594c2f5aaf7d9cb3cd5e",
        remark: "669259862f5aaf7d9cb3cd60",
    };

    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const filePath = path.join(__dirname, '../../public/files/', file.filename);

        // Convert the CSV file to JSON
        const jsonArray = await csv().fromFile(filePath);

        // Loop through the CSV data and save it to MongoDB
        const savePromises = jsonArray.map(async (item) => {
            const commonFields = {
                source: {
                    dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.source),
                    value: item["Source"],
                },
                CM_First_Name: item["CM First Name"],
                CM_Last_Name: item["CM Last Name"],
                CM_Phone: item["CM Phone"],
                alternate_Phone: item["Alternate Number"],
                agent_name: {
                    dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.agent_name),
                    value: item["Agent Name"],
                },
                language: {
                    dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.language),
                    value: item["Language"],
                },
                disease: {
                    dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.disease),
                    value: item["Disease"],
                },
                state: {
                    dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.state),
                    value: item["State"],
                },
                remark: {
                    dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.remark),
                    value: item["Remark"],
                },
            };

            // Save lead data to MongoDB
            const leadData = new Lead(commonFields);
            const savedLead = await leadData.save();

            // Save corresponding workbook entry
            const workbookData = new Workbook({
                data: {
                    dropdown_data: new mongoose.Types.ObjectId(req.body.data_dd_id),
                    value: "Lead",
                },
                dataId: savedLead._id,
                date: savedLead.date,
                ...commonFields,
            });

            await workbookData.save();
        });

        // Wait for all promises to completey

        await Promise.all(savePromises);

        res.status(200).send('Data processed and uploaded successfully.');
    } catch (error) {
        console.error('Error processing CSV file:', error);
        res.status(500).send('Error processing data.');
    }
};


exports.getEditLeadItem = async (req, res) => {
    const itemId = req.params.id;
    console.log(itemId);
}