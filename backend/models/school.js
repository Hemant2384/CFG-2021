const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const  SchoolSchema= new Schema({
  name: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
},
city: {
    type: String,
    required: true
},
address: {
    type: String,
    required: true
},
  email: {
    type: String,
    required: true
  },
  schoolID: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    validate: [
        function (input) {
          return input.length >= 6;
        },
        'Password should be longer.',
      ],
  },
  role: {
      type: Number,
      default: 0
  },
  verified: {
    type: Number,
    default: 0
},
  status: {
    type: String, 
    enum: ['Pending', 'Active'],
    default: 'Pending'
  },
  confirmationCode: { 
    type: String, 
    unique: true 
  },
  volunteers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Volunteer'
      }
  ],
  requirements: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Requirements'
    }
  ]
});

module.exports = School= mongoose.model("School", SchoolSchema);