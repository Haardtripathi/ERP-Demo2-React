const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const incomingSchema = new Schema(
  {
    source: {
      type: Object,
      dropdown_data: {
        type: Schema.Types.ObjectId,
        ref: 'Dropdown',
      },
      value: {
        type: String,
      },
      required: true,
    },
    date: {
      type: String,
      default: () => {
        // Get the current date and time in Indian timezone
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
      },
      immutable: true, // This will prevent the date from being modified
    },
    CM_First_Name: {
      type: String,
      required: true,
    },
    CM_Last_Name: {
      type: String,
      required: true,
    },
    CM_Phone: {
      type: String,
      required: true,
    },
    alternate_Phone: {
      type: Number,
    },
    agent_name: {
      type: Object,
      dropdown_data: {
        type: Schema.Types.ObjectId,
        ref: 'Dropdown',
      },
      value: {
        type: String,
      },
      required: true,
    },
    language: {
      type: Object,
      dropdown_data: {
        type: Schema.Types.ObjectId,
        ref: 'Dropdown',
      },
      value: {
        type: String,
      },
      required: true,
    },
    disease: {
      type: Object,
      dropdown_data: {
        type: Schema.Types.ObjectId,
        ref: 'Dropdown',
      },
      value: {
        type: String,
      },
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    state: {
      type: Object,
      dropdown_data: {
        type: Schema.Types.ObjectId,
        ref: 'Dropdown',
      },
      value: {
        type: String,
      },
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    remark: {
      type: Object,
      dropdown_data: {
        type: Schema.Types.ObjectId,
        ref: 'Dropdown',
      },
      value: {
        type: String,
      },
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false, // Set default to false (not deleted)
    },
    status: {
      type: String,
      default: 'active', // Set default to 'active'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Incoming', incomingSchema);
