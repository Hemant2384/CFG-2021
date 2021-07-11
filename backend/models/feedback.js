var mongoose = require('mongoose')
const Schema = mongoose.Schema

var feedbackSchema = new Schema({
    attendance: {
        type: String, 
        required:true
    },
    description:{
        type:String
    },
    date: {
        type: Date, 
        default: Date.now
    },
    requirement:
        {
          type: Schema.Types.ObjectId,
          ref: 'Requirement'
        },
    volunteer:
        {
          type: Schema.Types.ObjectId,
          ref: 'Volunteer'
        }
});

module.exports =Feedback= mongoose.model('Feedback', feedbackSchema);