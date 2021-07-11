var mongoose = require('mongoose')
const Schema = mongoose.Schema;

var threadSchema = new Schema({
    title: {
        type: String,
        required: true
      },
    postdate: {
        type: Date, 
        default: Date.now
    },
    author: {
        type: String, 
        default: 'Anon'
    },
    post: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Post'
        }
    ],
});

module.exports=Thread = mongoose.model('Thread', threadSchema);