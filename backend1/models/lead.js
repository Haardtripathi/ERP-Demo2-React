const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leadSchema = new Schema(
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
      }
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
      type: Number,
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
    },
    age: {
      type: Number,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
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
    },
    city: {
      type: String,
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
    },
    comment: {
      type: String,
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

module.exports = mongoose.model('Lead', leadSchema);
