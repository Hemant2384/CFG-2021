var mongoose = require('mongoose')
const Schema = mongoose.Schema

var postSchema = new Schema({
    date: {
        type: Date, 
        default: Date.now
    },
    author: {
        type: String, 
        default: 'Anon'
    },
    post: {
        type:String,
        required:true
    },
    thread:
        {
          type: Schema.Types.ObjectId,
          ref: 'Thread'
        }
});

module.exports =Post= mongoose.model('Post', postSchema);