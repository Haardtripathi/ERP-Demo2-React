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


const MODEL_MAPPING = {
    'Lead': Lead,
    'Incoming': Incoming
};

async function getPopulatedData() {
    try {
        const workbooks = await Workbook.find().lean();

        const populatedData = await Promise.all(
            workbooks.map(async (workbook) => {
                const Model = MODEL_MAPPING[workbook.data.value];

                if (!Model) {
                    return null;
                }

                const populatedDoc = await Model.findOne({ _id: workbook.dataId, isDeleted: false }).lean();

                if (populatedDoc) {
                    return {
                        _id: workbook._id,
                        data: workbook.data,
                        dataId: workbook.dataId,
                        populatedData: populatedDoc
                    };
                }

                return null;
            })
        );

        return populatedData.filter(item => item !== null);
    } catch (error) {
        console.error('Error populating data:', error);
        throw error;
    }
}

exports.getWorkbook = async (req, res, next) => {
    try {
        const data = await getPopulatedData();
        res.json(data);
    } catch (err) {
        console.error('Error in getWorkbook:', err);
        res.status(500).json({ message: 'An error occurred while fetching workbook data' });
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


// ---------------------------------------------------------------------    -----------------------------------------------------------------------------------------------------------------

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
    const { itemId, dataId, dataValue } = req.body;
    try {
        const data1 = await Dropdown.find();
        const formattedData = data1.reduce((acc, item) => {
            if (item.name && item.values && item._id) {
                acc[item.name.toLowerCase()] = {
                    values: item.values,
                    id: item._id
                };
            }
            return acc;
        }, {});

        let data;
        if (dataValue.toLowerCase() === "incoming") {
            data = await Incoming.findOne({ _id: dataId });
        } else if (dataValue.toLowerCase() === "lead") {
            data = await Lead.findOne({ _id: dataId });
        } else {
            return res.status(400).json({ error: "Invalid dataValue. Must be 'Incoming' or 'Lead'." });
        }

        if (!data) {
            return res.status(404).json({ error: `${dataValue} data not found for the given dataId.` });
        }

        const pendingData = new Pending({
            payment_type: {
                dropdown_data: new mongoose.Types.ObjectId(formattedData["payment type"]?.id),
            },
            sale_type: {
                dropdown_data: new mongoose.Types.ObjectId(formattedData["sale type"]?.id),
            },
            source: {
                dropdown_data: new mongoose.Types.ObjectId(formattedData["source"]?.id),
                value: data.source?.value,
            },
            agent_name: {
                dropdown_data: new mongoose.Types.ObjectId(formattedData["agent name"]?.id),
                value: data.agent_name?.value,
            },
            CM_First_Name: data.CM_First_Name,
            CM_Last_Name: data.CM_Last_Name,
            CM_Phone: data.CM_Phone,
            alternate_Phone: data.alternate_Phone,
            status: {
                dropdown_data: new mongoose.Types.ObjectId(formattedData["status"]?.id),
            },
            comment: data.comment,
            shipment_type: {
                dropdown_data: new mongoose.Types.ObjectId(formattedData["shipment type"]?.id),
            },
            post_type: {
                dropdown_data: new mongoose.Types.ObjectId(formattedData["post type"]?.id),
            },
            City_District: data.city,
            state: {
                dropdown_data: formattedData["state"]?.id,
                value: data.state?.value,
            },
            disease: {
                dropdown_data: new mongoose.Types.ObjectId(formattedData["disease"]?.id),
                value: data.disease?.value,
            },
            amount: {
                dropdown_data: new mongoose.Types.ObjectId(formattedData["amount"]?.id),
            },
            products: {
                dropdown_data: new mongoose.Types.ObjectId(formattedData["products"]?.id),
            },
        });

        await pendingData.save();

        const updateWorkBookData = await Workbook.updateOne({ _id: itemId }, { isSentToPending: true });

        if (dataValue.toLowerCase() === "incoming") {
            await Incoming.updateOne({ _id: dataId }, { isSentToPending: true });
        } else {
            await Lead.updateOne({ _id: dataId }, { isSentToPending: true });
        }

        res.json({ success: true, message: "Data successfully sent to pending." });
    } catch (error) {
        console.error("Error in sendToPending:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};