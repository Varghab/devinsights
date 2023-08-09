const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    cover:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: new Date(),
    },
    tag:{
        type: String,
        required: true
    },
    createdBy:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        name:{
            type: String,
            required:true
        }

    },     
    isPublished:{
        type:Boolean,
        required: true
    }
})


const blogModel = mongoose.model('blogs', blogSchema);

module.exports = { blogModel };