const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const  VolunteerSchema= new Schema({
  name: {
    type: String,
    required: true
  } ,
  email: {
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
interest: {
    type: String,
    required: true
},
contact: {
    type: String,
    required: true
},
dob: {
    type: String,
    required: true
},
blood: {
    type: String,
    required: true
},
duration: {
    type: String,
    required: true
},
profession: {
    type: String,
    required: true
},
role: {
    type: Number,
    default: 1
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
verified: {
    type: Number,
    default: 0
},
requirement: [{
    type: Schema.Types.ObjectId,
    ref: 'Requirements'
}]
});

module.exports = Volunteer= mongoose.model("Volunteer", VolunteerSchema);