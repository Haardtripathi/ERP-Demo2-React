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


// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


exports.getEditIncomingItem = async (req, res) => {
    const itemId = req.params.id;
    try {
        const data = await Dropdown.find();

        const formattedData = data.map((item) => ({
            name: item.name,
            values: item.values,
        }));
        const incomingData = await Incoming.findById(itemId);
        // console.log(formattedData, incomingData);

        res.json({ dropdowns: formattedData, prevData: incomingData }); // Send as JSON response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


exports.postEditIncomingItem = async (req, res) => {
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
        source: {
            dropdown_data: new mongoose.Types.ObjectId(staticDropdownData.source),
            value: req.body.formData.source,
        },
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

    const dataId = req.body.id
    // console.log(req.body);

    try {
        // Find and update the Incoming
        const incomingItem = await Incoming.findById(dataId);
        // console.log(commonFields)

        if (!incomingItem) {
            throw new Error('Incoming item not found');
        }

        incomingItem.source = commonFields.source;
        incomingItem.CM_First_Name = commonFields.CM_First_Name;
        incomingItem.CM_Last_Name = commonFields.CM_Last_Name;
        incomingItem.CM_Phone = commonFields.CM_Phone;
        incomingItem.alternate_Phone = commonFields.alternate_Phone;
        incomingItem.agent_name = commonFields.agent_name;
        incomingItem.language = commonFields.language;
        incomingItem.disease = commonFields.disease;
        incomingItem.age = commonFields.age;
        incomingItem.height = commonFields.height;
        incomingItem.weight = commonFields.weight;
        incomingItem.state = commonFields.state;
        incomingItem.city = commonFields.city;
        incomingItem.remark = commonFields.remark;
        incomingItem.comment = commonFields.comment;

        await incomingItem.save();

        // Find and update the Workbook
        const workbookItem = await Workbook.findOne({ dataId: dataId });

        if (!workbookItem) {
            throw new Error('Workbook item not found');
        }

        workbookItem.source = commonFields.source;
        workbookItem.CM_First_Name = commonFields.CM_First_Name;
        workbookItem.CM_Last_Name = commonFields.CM_Last_Name;
        workbookItem.CM_Phone = commonFields.CM_Phone;
        workbookItem.alternative_Number = commonFields.alternative_Number;
        workbookItem.agent_name = commonFields.agent_name;
        workbookItem.language = commonFields.language;
        workbookItem.disease = commonFields.disease;
        workbookItem.age = commonFields.age;
        workbookItem.height = commonFields.height;
        workbookItem.weight = commonFields.weight;
        workbookItem.state = commonFields.state;
        workbookItem.city = commonFields.city;
        workbookItem.remark = commonFields.remark;
        workbookItem.comment = commonFields.comment;

        await workbookItem.save();
        res.status(200).json({ message: 'Data updated successfully!' });
        console.log("UPDATED PRODUCT!");

    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while updating the data.");
    }
}