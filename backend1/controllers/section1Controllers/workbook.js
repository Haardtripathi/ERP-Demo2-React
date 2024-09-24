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
        // console.log(data); // Add this line
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

exports.getEditWorkbookItem = async (req, res) => {
    console.log("Hello world!");
    const itemId = req.params.id;
    try {
        const data = await Dropdown.find();

        const formattedData = data.map((item) => ({
            name: item.name,
            values: item.values,
        }));
        const WorkbookData = await Workbook.findById(itemId);
        // console.log(formattedData, incomingData);

        res.json({ dropdowns: formattedData, prevData: WorkbookData }); // Send as JSON response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.postEditWorkbookItem = async (req, res, next) => {
    const newdate = () => {
        const options = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        const formatter = new Intl.DateTimeFormat([], options);
        return formatter.format(new Date());
    }
    const staticDropdownData = {
        source: "669258512f5aaf7d9cb3cd56",
        agent_name: "6692586f2f5aaf7d9cb3cd58",
        language: "669258992f5aaf7d9cb3cd5a",
        disease: "669258db2f5aaf7d9cb3cd5c",
        state: "6692594c2f5aaf7d9cb3cd5e",
        remark: "669259862f5aaf7d9cb3cd60",
    };
    const commonFields = {
        date: newdate(),
        source: {
            dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.source),
            value: req.body.formData.source,
        },
        data: req.body.formData.data,
        dataId: new mongoose.Types.ObjectId(req.body.formData.data_id),
        CM_First_Name: req.body.formData.cmFirstName,
        CM_Last_Name: req.body.formData.cmLastName,
        CM_Phone: req.body.formData.cmphone,
        alternate_Phone: req.body.formData.cmPhoneAlternateNumber,
        agent_name: {
            dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.agent_name),
            value: req.body.formData.agent_name,
        },
        language: {
            dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.language),
            value: req.body.formData.language,
        },
        disease: {
            dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.disease),
            value: req.body.formData.disease,
        },
        age: req.body.formData.age,
        height: req.body.formData.height,
        weight: req.body.formData.weight,
        state: {
            dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.state),
            value: req.body.formData.state,
        },
        city: req.body.formData.city,
        remark: {
            dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.remark),
            value: req.body.formData.remark,
        },
        comment: req.body.formData.comment,
    };

    console.log(commonFields)
}