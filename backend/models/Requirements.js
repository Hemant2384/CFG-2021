const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequirementSchema = new Schema({
  requirement: {
    type:  String,
    required: true
  },
  interest:{
    type: String,
    required: true
  },
  date: {
      type: String,
      required: true
  },
  city: {
    type: String
  },
  status: {
    type: Number,
    default: 0
  },
  public: {
    type:Number,
    default: 0
  },
  school: {
      type: Schema.Types.ObjectId,
      ref: 'School'
  },
  volunteer: [{
    type: Schema.Types.ObjectId,
    ref: 'Volunteer'
  }]
});

module.exports = Requirements = mongoose.model("Requirements", RequirementSchema );