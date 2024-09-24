const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workbookSchema = new Schema(
  {
    data: {
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
    dataId: {
      type: Schema.Types.ObjectId,
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
    },
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
      type: String,
    },
    height: {
      type: String,
    },
    weight: {
      type: String,
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
      default: false,
    },
    status: {
      type: String,
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Workbook', workbookSchema);
