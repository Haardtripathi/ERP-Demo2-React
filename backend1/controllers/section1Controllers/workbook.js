const mongoose = require("mongoose");

const Dropdown = require("../../models/dropdowns");
const Workbook = require("../../models/workbook");
const Incoming = require("../../models/incoming");
const Lead = require("../../models/lead");
const Pending = require("../../models/pending");

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

// exports.getEditWorkbookItem = async (req, res) => {
//     console.log("Hello world!");
//     const itemId = req.params.id;
//     try {
//         const data = await Dropdown.find();

//         const formattedData = data.map((item) => ({
//             name: item.name,
//             values: item.values,
//         }));
//         const WorkbookData = await Workbook.findById(itemId);
//         // console.log(formattedData, incomingData);

//         res.json({ dropdowns: formattedData, prevData: WorkbookData }); // Send as JSON response
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }


exports.sendToPending = async (req, res, next) => {
    const itemId = req.body.itemId;
    const dataId = req.body.dataId;
    const dataValue = req.body.dataValue;
    try {
        const staticDropdownData = {
            source: "669258512f5aaf7d9cb3cd56",
            agent_name: "6692586f2f5aaf7d9cb3cd58",
            language: "669258992f5aaf7d9cb3cd5a",
            disease: "669258db2f5aaf7d9cb3cd5c",
            state: "6692594c2f5aaf7d9cb3cd5e",
            remark: "669259862f5aaf7d9cb3cd60",
            payment_type: "66ca09f9efcae9d04adb3610",
            sale_type: "66ca09c6efcae9d04adb360e",
            status: "66cd80b921c654779763c616",
            shipment_type: "66ca0a39efcae9d04adb3612",
            post_type: "66ca0abfefcae9d04adb3616",
            disease: "669258db2f5aaf7d9cb3cd5c",
            amount: "66cb7b392d2b09775bd57dfa",
            products: "66cb7b9c2d2b09775bd57dfc"
        };

        const data = await Workbook.findOne({ _id: itemId })
        // console.log(data)

        const pendingData = new Pending({
            payment_type: {
                dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.payment_type),
            },
            sale_type: {
                dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.sale_type),
            },
            source: {
                dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.source),
                value: data.source.value,
            },
            agent_name: {
                dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.agent_name),
                value: data.agent_name.value,
            },
            CM_First_Name: data.CM_First_Name,
            CM_Last_Name: data.CM_Last_Name,
            CM_Phone: data.CM_Phone,
            alternate_Phone: data.alternate_Phone,
            status: {
                dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.status),
            },
            comment: data.comment,
            shipment_type: {
                dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.shipment_type),
            },
            post_type: {
                dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.post_type),
            },
            City_District: data.city,
            state: {
                dropdown_data: data.state.dropdown_data,
                value: data.state.value,
            },
            disease: {
                dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.disease),
                value: data.disease.value,
            },
            amount: {
                dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.amount),
            },
            products: {
                dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.products),
            },
        })

        await pendingData.save()
        // console.log(dataId)
        const deleteWorkBookData = await Workbook.deleteOne({ _id: itemId });
        if (dataValue === "Incoming") {
            await Incoming.deleteOne({ _id: dataId })
        }
        else {
            await Lead.deleteOne({ _id: dataId })
        }
        res.json({ success: true, message: "Data successfully sent to pending." });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
    }

}