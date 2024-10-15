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
    // console.log(formattedData["source"].id)

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
                    dropdown_data: formattedData["source"].id,
                    value: item["Source"],
                },
                CM_First_Name: item["CM First Name"],
                CM_Last_Name: item["CM Last Name"],
                CM_Phone: item["CM Phone"],
                alternate_Phone: item["Alternate Number"],
                agent_name: {
                    dropdown_data: formattedData["agent name"].id,
                    value: item["Agent Name"],
                },
                language: {
                    dropdown_data: formattedData["language"].id,
                    value: item["Language"],
                },
                disease: {
                    dropdown_data: formattedData["disease"].id,
                    value: item["Disease"],
                },
                state: {
                    dropdown_data: formattedData["state"].id,
                    value: item["State"],
                },
                remark: {
                    dropdown_data: formattedData["remark"].id,
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
                dataId: savedLead._id
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

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


exports.getEditLeadItem = async (req, res) => {
    // console.log("getEditLeadItem function called");
    const itemId = req.params.id;
    // console.log("Item ID:", itemId);

    try {
        const data = await Dropdown.find();
        // console.log("Dropdown data fetched:", data.length, "items");

        const formattedData = data.reduce((acc, item) => {
            if (item.name && item.values && item._id) {
                acc[item.name.toLowerCase()] = {
                    values: item.values,
                    id: item._id
                };
            }
            return acc;
        }, {});
        // console.log("Formatted dropdown data:", Object.keys(formattedData));

        const leadData = await Lead.findById(itemId);
        // console.log("Lead data:", leadData);

        if (!leadData) {
            console.log("No lead found with ID:", itemId);
            return res.status(404).json({ error: "Lead not found" });
        }

        res.json({ dropdowns: formattedData, prevData: leadData });
    } catch (err) {
        console.error("Error in getEditLeadItem:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
}
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



exports.postEditLeadItem = async (req, res) => {
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
    // console.log(formattedData["source"].id)


    const commonFields = {
        date: newdate(),
        source: {
            dropdown_data: formattedData["source"].id,
            value: req.body.formData.source,
        },
        CM_First_Name: req.body.formData.cmFirstName,
        CM_Last_Name: req.body.formData.cmLastName,
        CM_Phone: req.body.formData.cmphone,
        alternate_Phone: req.body.formData.cmPhoneAlternateNumber,
        agent_name: {
            dropdown_data: formattedData["agent name"].id,
            value: req.body.formData.agent_name,
        },
        language: {
            dropdown_data: formattedData["language"].id,
            value: req.body.formData.language,
        },
        disease: {
            dropdown_data: formattedData["disease"].id,
            value: req.body.formData.disease,
        },
        age: req.body.formData.age,
        height: req.body.formData.height,
        weight: req.body.formData.weight,
        state: {
            dropdown_data: formattedData["state"].id,
            value: req.body.formData.state,
        },
        city: req.body.formData.city,
        remark: {
            dropdown_data: formattedData["remark"].id,
            value: req.body.formData.remark,
        },
        comment: req.body.formData.comment,
    };

    const dataId = req.body.id
    // console.log(req.body);
    // console.log(commonFields)

    try {
        // Find and update the Lead
        const leadItem = await Lead.findById(dataId);
        // console.log(commonFields)

        if (!leadItem) {
            throw new Error('Lead item not found');
        }

        leadItem.source = commonFields.source;
        leadItem.date = commonFields.date;
        leadItem.CM_First_Name = commonFields.CM_First_Name;
        leadItem.CM_Last_Name = commonFields.CM_Last_Name;
        leadItem.CM_Phone = commonFields.CM_Phone;
        leadItem.alternate_Phone = commonFields.alternate_Phone;
        leadItem.agent_name = commonFields.agent_name;
        leadItem.language = commonFields.language;
        leadItem.disease = commonFields.disease;
        leadItem.age = commonFields.age;
        leadItem.height = commonFields.height;
        leadItem.weight = commonFields.weight;
        leadItem.state = commonFields.state;
        leadItem.city = commonFields.city;
        leadItem.remark = commonFields.remark;
        leadItem.comment = commonFields.comment;

        await leadItem.save();
        res.status(200).send("Updated the data.");

    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while updating the data.");
    }
}


// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
